import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

import { getWeather } from '../utils';
import { B, GithubLink, H1, Hr, InputMessage, P, Section } from '../components';

import logo from '../images/logo.svg';

const Nav = styled.nav`
  position: absolute;
  top: 0;
  left: 0;
  margin: 10px;
  a,
  img {
    width: 10vw;
    min-width: 70px;
  }
`;

const Header = styled.header`
  margin-top: 20px;
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

const roundNumber = (value, decimals = 0) =>
  Math.round(parseFloat(value, 10) * 10 ** decimals) / 10 ** decimals;

const RaspberryPi = () => {
  const [sensorData, setSensorData] = useState({});

  useEffect(() => {
    document.title = 'Raspberry Pi - eSantini';
    getWeather(setSensorData);
  }, []);

  return (
    <>
      <Nav>
        <Link to="/">
          <img alt="Logo link to home" src={logo} />
        </Link>
      </Nav>
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
          <img
            src="https://www.raspberrypi.org/homepage-9df4b/static/raspberry-pi-4-labelled-2857741801afdf1cabeaa58325e07b58.png"
            alt="Raspberry Pi 4 Specifications"
          />
        </RaspImgLink>
        <P_NoWrap>
          Checkout the code in
          <Span>
            <GithubLink compact={true} />
          </Span>
        </P_NoWrap>
      </Section>

      <Section>
        <h2>Sense HAT</h2>

        <P>
          The Raspberry PI is currently wearing a Sense HAT. A device with
          sensors and a 8x8 pixel display
        </P>
        <Hr />
        <Div_Sensors>
          <div>
            <h3>Send me a message:</h3>
            <InputMessage />
          </div>
          <div>
            <h3>Sensors Data:</h3>
            <P>
              Temperature:
              <B> {roundNumber(sensorData.temperature, 1) || '--'}°F </B>|
              <B>
                {' '}
                {roundNumber(
                  ((parseFloat(sensorData.temperature, 10) - 32) * 5) / 9,
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
