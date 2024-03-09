import { useState, useEffect, useContext } from 'react';
import styled from '@emotion/styled';
import { getLight, setLight } from 'utils';

const Sandbox = () => {

  const [currentLight, setCurrentLight] = useState(false);

  useEffect(
    () => getLight(({ light }) => setCurrentLight(light)),
    []
  );
  const setLightClick = () => {
    setCurrentLight(!currentLight);
    setLight(!currentLight);
  }
  return (
    <>
      <Camarita>
        <img src="/api/stream.mp4" style={{ width: '100%' }} />
      </Camarita>
      {/* {user.email ?
        <Camarita>
          <img src="/api/stream.mp4" style={{ width: '100%' }} />
        </Camarita>
        :
        <GoogleButton />
      } */}

      {currentLight ? 'Light is on' : 'Light is off'}

      <button onClick={setLightClick} >Toggle light</button>
    </>
  );
};

export default Sandbox;

const Camarita = styled.div`
  max-width: 50vw;
`;
