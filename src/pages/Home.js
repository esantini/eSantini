import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { GithubLink, P } from '../components';

import logo from '../images/logo.svg';
import linkedIn from '../images/LI-Logo.png';

const Home = ({ user }) => (
  <>
    <header className="App-header">
      <Logo src={logo} alt="logo" />
    </header>
    <br />
    <p>Hello {user?.name ? user.name : 'World'}!</p>
    <Desc>
      This website is hosted on a <Link to="/raspberrypi">Raspberry Pi</Link> in
      my home.
    </Desc>
    <br />
    <GithubLink showOctocat={true} />
    <br />
    <LinkedInLink
      className="App-link"
      href="https://www.linkedin.com/in/estebansantini/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src={linkedIn} alt="linkedIn logo" />
    </LinkedInLink>
  </>
);

Home.propTypes = {
  user: PropTypes.object,
};

export default Home;

const Logo = styled.img`
  height: 30vmin;
`;

const LinkedInLink = styled.a`
  width: 20%;
  max-width: 130px;
  img {
    width: 100%;
  }
`;

const Desc = styled(P)`
  max-width: 70vm;
  a {
    white-space: nowrap;
  }
`;