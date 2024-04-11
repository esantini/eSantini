import { Fragment, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import WorldMap from 'components/analytics/WorldMap';
import ConfirmationModal from 'components/modals/ConfirmationModal';
import styled from '@emotion/styled';
import { fetchSessions, deleteSession, getFormattedDate } from 'utils';

const Analytics = ({ user }) => {
  const [points, setPoints] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState({});
  const [toDeleteId, setToDeleteId] = useState(-1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = 'Analytics - eSantini';
    fetchSessions(({ data }) => {
      const { sessions } = data;
      sessions.reverse(); // Show most recent first
      setSessions(sessions);
      setPoints(sessions.map(s => s.geo?.ll || []));
      setIsLoading(false);
    });
  }, []);

  const handleDeleteSession = useCallback(() => {
    deleteSession(toDeleteId, ({ data }) => {
      if (data.deleteSession) {
        setSessions(sessions.filter(s => s.id !== toDeleteId));
      }
      else {
        throw new Error('Failed to delete session');
      }
    })
      .catch(console.error)
      .finally(() => {
        setToDeleteId(-1);
      });
  }, [toDeleteId]);

  return (
    <div>
      <h1>Analytics</h1>
      <p>Explore the world of visitors in the past 7 days.</p>
      <WorldMap points={points} selectedPoint={selectedSession?.geo?.ll} isLoading={isLoading} />
      <p>
        Each dot represents a visitor&apos;s session over the last 7 days. Rest assured, I prioritize
        your privacy - only general locations are stored and displayed, with no specific IPs saved.
      </p>
      <div>
        <h2>Recent Sessions</h2>
        <Table className='sessionsTable'>
          <tbody>
            {sessions.map(s => (<Fragment key={s.id}>
              <tr
                onClick={() => setSelectedSession(({ id }) => s.id === id ? {} : s)}
                className={`sessionRow${selectedSession.id === s.id ? ' isSelected' : ''}`}
              >
                <td>{s.geo?.city}, {s.geo?.region}, {s.geo?.country}</td>
                <td>{s.geo?.ll[0]}, {s.geo?.ll[1]}</td>
                <td>{getFormattedDate(s.timestamp)}</td>
              </tr>
              {s.id === selectedSession.id && (<tr>
                <td colSpan={3} className='sessionDetails'>
                  <h3>Events</h3>
                  {user?.isAdmin &&
                    <button
                      className="btnDeleteSession"
                      onClick={() => setToDeleteId(s.id)}
                    >&#128465;</button>
                  }
                  <Table>
                    <tbody>
                      {s.events?.map((e, i) => (
                        <tr key={i}>
                          <td>{e.type}</td>
                          {e.type === 'page_view' ? <td colSpan={3}>{e.details.page_path}</td> : (
                            <>
                              <td>{e.details.event_category}</td>
                              <td>{e.details.event_label}</td>
                              <td>{e.details.value}</td>
                            </>
                          )}
                          <td>{getFormattedDate(e.timestamp)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </td>
              </tr>)}
            </Fragment>))}
          </tbody>
        </Table>
      </div>
      <ConfirmationModal
        isOpen={toDeleteId > -1}
        onCancel={() => setToDeleteId(-1)}
        onConfirm={handleDeleteSession}
      />
    </div>
  );
}

Analytics.propTypes = {
  user: PropTypes.object,
};

export default Analytics;

const Table = styled.table`
  border-spacing: 0;
  td {
    border: 1px solid #ddd;
    padding: .2em;
  }
  .sessionRow {
    cursor: pointer;
    &.isSelected {
      font-weight: bold;
    }
  }
  .sessionDetails {
    position: relative;
    padding: 1em;
    background: #ffffff44;
  }
  .btnDeleteSession {
    border: 0;
    background: 0;
    font-size: 1.3em;
    color: red;
    text-shadow: 0px 0px 1px black;
    position: absolute;
    top: 0;
    right: .5em;
    cursor: pointer;
  }
`;
