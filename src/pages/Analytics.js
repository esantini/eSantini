import { Fragment, useState, useEffect } from 'react';
import WorldMap from 'components/analytics/WorldMap';
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

const Analytics = () => {
  const [points, setPoints] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedSession, setSelectedSession] = useState({});
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
                className={selectedSession.$loki === s.$loki ? 'isSelected' : ''}
              >
                <td>{s.geo?.city}, {s.geo?.region}, {s.geo?.country}</td>
                <td>{s.geo?.ll[0]}, {s.geo?.ll[1]}</td>
                <td>{getFormattedDate(s.timestamp)}</td>
              </tr>
              {s.$loki === selectedSession.$loki && (<tr>
                <td colSpan={3} className='sessionDetails'>
                  <h3>Events</h3>
                  <Table>
                    <tbody>
                      {console.log({ events })}
                      {events?.filter(e => e.sessionId === selectedSession.$loki).map(e => (
                        <tr key={e.$loki}>
                          {console.log({ e })}
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
    </div>
  );
}

export default Analytics;

const Table = styled.table`
  border-spacing: 0;
  &.sessionsTable tr {
    cursor: pointer;
  }
  tr.isSelected {
    font-weight: bold;
  }
  td {
    border: 1px solid #ddd;
    padding: .2em;
  }
  .sessionDetails {
    padding: 1em;
    background: #ffffff44;
  }
`;