import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { GithubLink, P } from '../components';

import logo from '../images/logo.svg';
import linkedIn from '../images/LI-Logo.png';

const Home = ({ user }) => (
  <>
    <header className='App-header'>
      <Logo src={logo} alt='logo' />
    </header>
    <br />
    <Desc>Hello {user?.name ? user.name : 'World'}!</Desc>

    <Desc style={{ marginTop: '1rem' }}>
      Welcome to my digital playground, where{' '}
      <strong className='highlight'>JavaScript</strong>, <strong className='highlight'>React.js</strong>,
      and <strong className='highlight'>Node.js</strong> are the main attractions.
    </Desc>
    <br />
    <Desc>
      I&apos;m Esteban, a <strong className='highlight'>front-end</strong> expert and{' '}
      <strong className='highlight'>back-end</strong> enthusiast who loves turning complex problems
      into simple, elegant solutions. This site is my <strong className='highlight'>sandbox</strong>,
      where I experiment, innovate, and occasionally break things (for science, of course!).
    </Desc>
    <br />
    <Desc>
      Dive into my world by exploring my latest projects below, or take a closer look under the hood on
      my <a to='https://github.com/esantini' target='_blank' className='highlight'>GitHub</a> profile.
      Feel free to connect with me
      on <a to='https://www.linkedin.com/in/estebansantini' target='_blank' className='highlight'>LinkedIn</a> too.
    </Desc>
    <br />
    <Desc>
      Let&apos;s explore what happens when creativity meets code!
    </Desc>

    <br />
    <GithubLink showOctocat={true} />
    <br />
    <LinkedInLink
      className='App-link'
      href='https://www.linkedin.com/in/estebansantini/'
      target='_blank'
      rel='noopener noreferrer'
    >
      <img src={linkedIn} alt='linkedIn logo' />
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