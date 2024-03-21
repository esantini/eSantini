import { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import WorldMap from 'components/analytics/WorldMap';
import ConfirmationModal from 'components/ConfirmationModal';
import styled from '@emotion/styled';

const dateOptions = {
  year: 'numeric', month: 'short', day: 'numeric',
  hour: '2-digit', minute: '2-digit', second: '2-digit',
  hour12: true
};
const getFormattedDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', dateOptions).format(date);
}

const Analytics = ({ user }) => {
  const [points, setPoints] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedSession, setSelectedSession] = useState({});
  const [toDeleteId, setToDeleteId] = useState(-1);

  useEffect(() => {
    document.title = 'Analytics - eSantini';
    fetch('api/worldpoints')
      .then(res => res.json())
      .then(setPoints);
    fetch('api/sessions')
      .then(res => res.json())
      .then((data) => {
        data.reverse(); // Show most recent first
        setSessions(data);
      });
    fetch('api/event')
      .then(res => res.json())
      .then(setEvents);
  }, []);
  return (
    <div>
      <h1>Analytics</h1>
      <p>Explore the world of visitors in the past 7 days.</p>
      <WorldMap points={points} selectedPoint={selectedSession?.geo?.ll} />
      <p>
        Each dot represents a visitor&apos;s session over the last 7 days. Rest assured, I prioritize
        your privacy - only general locations are stored and displayed, with no specific IPs saved.
      </p>
      <div>
        <h2>Recent Sessions</h2>
        <Table className='sessionsTable'>
          <tbody>
            {sessions.map(s => (<Fragment key={s.sessionId}>
              <tr
                onClick={() => setSelectedSession(({ $loki }) => s.$loki === $loki ? {} : s)}
                className={`sessionRow${selectedSession.$loki === s.$loki ? ' isSelected' : ''}`}
              >
                <td>{s.geo?.city}, {s.geo?.region}, {s.geo?.country}</td>
                <td>{s.geo?.ll[0]}, {s.geo?.ll[1]}</td>
                <td>{getFormattedDate(s.timestamp)}</td>
              </tr>
              {s.$loki === selectedSession.$loki && (<tr>
                <td colSpan={3} className='sessionDetails'>
                  <h3>Events</h3>
                  {user?.isAdmin &&
                    <button
                      className="btnDeleteSession"
                      onClick={() => setToDeleteId(s.$loki)}
                    >&#128465;</button>
                  }
                  <Table>
                    <tbody>
                      {events?.filter(e => e.sessionId === selectedSession.$loki).map(e => (
                        <tr key={e.$loki}>
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
        onConfirm={() => setToDeleteId(-1)}
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

const SessionRow = styled.tr`
`;