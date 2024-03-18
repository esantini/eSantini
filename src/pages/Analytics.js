import { useState, useEffect } from 'react';
import WorldMap from 'components/analytics/WorldMap';

const parsePoints = s => s.map(({ geo }) => geo.ll);

const Analytics = () => {
  const [points, setPoints] = useState([]);
  useEffect(() => {
    document.title = 'Analytics - eSantini';
    fetch('api/sessions')
      .then(res => res.json())
      .then(d => setPoints(parsePoints(d)));
  }, []);
  return (
    <div>
      <h1>Analytics</h1>
      <WorldMap points={points} />
    </div>
  );
}

export default Analytics;
