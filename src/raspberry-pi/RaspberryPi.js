import { useState, useEffect } from 'react';
import { getWeather } from '../utils';

const RaspberryPi = () => {
  const [sensorData, setSensorData] = useState({});
  useEffect(() => {
    getWeather(aver => {
      console.log({aver});
      setSensorData(aver);
    });
  }, []);

  return <>
    <div>Temperature: {sensorData.temperature}</div>
    <div>Humidity: {sensorData.humidity}</div>
    <div>Pressure: {sensorData.pressure}</div>
  </>;
};

export default RaspberryPi;
