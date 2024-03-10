import { useState, useEffect } from 'react';
import styled from '@emotion/styled';

import { B, GithubLink, H1, Hr, InputMessage, P, Section } from 'components';
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
        <H1>Raspberry Pi</H1>
      </Header>
      <Section>
        <P_NoWrap>This Website is Hosted on a Raspberry Pi 4</P_NoWrap>
        <RaspImgLink
          href="https://www.raspberrypi.org/products/raspberry-pi-4-model-b/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={rasPiImg} alt="Raspberry Pi 4 Specifications" />
        </RaspImgLink>
        <P_NoWrap>
          Checkout the code in
          <Span>
            <GithubLink compact={true} />
          </Span>
        </P_NoWrap>
      </Section>

      <Section>
        <Div_Sensors>
          <div>
            <h3>Send me a message:</h3>
            <InputMessage />
          </div>
          <div>
            <h3>Light switch:</h3>
            {currentLight ? 'Light is on' : 'Light is off'}
            <br />
            <ToggleButtonWrapper isOn={currentLight} onClick={setLightClick} >
              <button />
            </ToggleButtonWrapper>
          </div>
          {/* this div is hidden because sensors aren't setup at the moment */}
          <div style={{ display: 'none' }}>
            <h3>Sensors Data:</h3>
            <P>
              Temperature:
              <B> {roundNumber(sensorData.temperature + 10, 1) || '--'}°F </B>|
              <B>
                {' '}
                {roundNumber(
                  ((parseFloat(sensorData.temperature + 10, 10) - 32) * 5) / 9,
                  1
                ) || '--'}
                °C
              </B>
            </P>
            <P>
              Humidity: <B>{roundNumber(sensorData.humidity) || '--'} %</B>
            </P>
            <P>
              Pressure:{' '}
              <B>{roundNumber(sensorData.pressure) || '--'} millibars</B>
            </P>
          </div>
        </Div_Sensors>
      </Section>

      <br />
    </>
  );
};

export default RaspberryPi;

const Header = styled.header`
  margin-top: 20px;
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

const RaspImgLink = styled.a`
  padding: 20px;
  img {
    width: 80vmin;
    max-width: 40vw;
    filter: drop-shadow(0px 5px 15px #3bb);
  }
  @media (max-width: 1000px) {
    img {
      max-width: 50vw;
    }
  }
`;

const Div_Sensors = styled.div`
  @media (min-width: 600px) {
    display: flex;
    > div {
      width: 50%;
      max-width: 50%;
      h3 {
        margin: 5px 0px;
        font-size: 1em;
      }
    }
  }
  > div {
    align-items: center;
  }
  p {
    max-width: 100%;
    padding: 0 10px;
  }
`;

const P_NoWrap = styled(P)`
  max-width: 100%;
  white-space: nowrap;
`;

const Span = styled.span`
  img {
    top: 11px;
    position: relative;
  }
`;
