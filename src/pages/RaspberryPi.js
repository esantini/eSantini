import { useState, useEffect } from 'react';
import styled from '@emotion/styled';

import { GithubLink, InputMessage } from 'components';
import { getLight, setLight } from 'utils';
import rasPiImg from 'images/raspberry-pi-4-labelled.png'

const roundNumber = (value, decimals = 0) =>
  Math.round(parseFloat(value, 10) * 10 ** decimals) / 10 ** decimals;

const RaspberryPi = () => {
  // const [sensorData, setSensorData] = useState({});
  const sensorData = {};
  const [currentLight, setCurrentLight] = useState(false);

  const setLightClick = () => {
    setCurrentLight(!currentLight);
    setLight(!currentLight);
  }

  useEffect(() => {
    getLight(({ light }) => setCurrentLight(light));
    document.title = 'Raspberry Pi - eSantini';
    // getWeather(setSensorData);
  }, []);

  return (
    <>
      <Header>
        <h1>Raspberry Pi</h1>
      </Header>
      <RpiInfo>
        <p>This Website is Hosted on a Raspberry Pi 4</p>
        <RaspImg src={rasPiImg} alt="Raspberry Pi 4 Specifications" />
        <p>
          Checkout the code in
          <Span>
            <GithubLink compact={true} />
          </Span>
        </p>
      </RpiInfo>

      <Hr />
      <RpiControls>
        <div>
          <h3>Send me a message:</h3>
          <InputMessage />
        </div>
        <hr />
        <div>
          <h3>Light switch:</h3>
          Light is {currentLight ? 'on' : 'off'}
          <br />
          <ToggleButtonWrapper isOn={currentLight} onClick={setLightClick} >
            <button />
          </ToggleButtonWrapper>
        </div>
        {/* this div is hidden because sensors aren't setup at the moment */}
        <div style={{ display: 'none' }}>
          <h3>Sensors Data:</h3>
          <p>
            Temperature:
            <b> {roundNumber(sensorData.temperature + 10, 1) || '--'}°F </b>|
            <b>
              {' '}
              {roundNumber(
                ((parseFloat(sensorData.temperature + 10, 10) - 32) * 5) / 9,
                1
              ) || '--'}
              °C
            </b>
          </p>
          <p>
            Humidity: <b>{roundNumber(sensorData.humidity) || '--'} %</b>
          </p>
          <p>
            Pressure:{' '}
            <b>{roundNumber(sensorData.pressure) || '--'} millibars</b>
          </p>
        </div>
      </RpiControls>

      <br />
    </>
  );
};

export default RaspberryPi;

const Header = styled.header`
  margin-top: 20px;
`;

const Hr = styled.hr`
  width: 70%;
  margin-bottom: 1em;
`;

const RpiInfo = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    max-width: 100vw;
    text-align: center;
    margin: 1em;
  }
`;

const RpiControls = styled.section`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  > div {
    width: 40%;
    text-align: center;
  }
  hr {
    display: none;
  }
  @media (max-width: 400px) {
    flex-direction: column;
    align-items: center;
    hr {
      display: block;
      width: 60%;
      margin: 1em 0;
    }
    > div {
      width: 80%;
    }
  }
`;

const ToggleButtonWrapper = styled.div`
  position: relative;
  margin: auto;
  width: 2.4em;
  height: 1.2em;
  background-color: ${({ isOn }) => isOn ? '#3b973b' : '#ccc'};
  border-radius: 1.5em;
  cursor: pointer;

  /* Toggle button */
  button {
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    background-color: #fff;
    border-radius: 1.5em;
    transition: 0.3s;
    cursor: pointer;
    ${({ isOn }) => isOn ? 'left: 50%' : ''}
  }
`;

const RaspImg = styled.img`
  padding: 20px;
  width: 22em;
  max-width: 100vw;
  filter: drop-shadow(0px 5px 15px #3C7);
`;

const Span = styled.span`
  img {
    width: 3.4em !important;
    top: 0.3em;
    position: relative;
    padding-left: 0.2em;
  }
`;
