import { useState, useEffect } from 'react';
import WorldMap from 'components/analytics/WorldMap';

const parsePoints = s => s.map(({ geo }) => geo.ll);

const Analytics = () => {
  const [points, setPoints] = useState([]);
  useEffect(() => {
    document.title = 'Analytics - eSantini';
    fetch('api/sessions?hasGeo=true')
      .then(res => res.json())
      .then(d => setPoints(parsePoints(d)));
  }, []);
  return (
    <div>
      <h1>Analytics</h1>
      <p>Explore the world of visitors in the past 7 days.</p>
      <WorldMap points={points} />
      <p>
        Each dot represents a visitor&apos;s session over the last 7 days. Rest assured, I prioritize
        your privacy - only general locations are stored and displayed, with no specific IPs saved.
      </p>
    </div>
  );
}

export default Analytics;
