import { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { GithubLink, LatestProjects, ExternalLink } from 'components';

import logo from 'assets/svg/logo.svg';
import linkedIn from 'assets/images/LI-Logo.png';

const Home = ({ user }) => {
  useEffect(() => {
    document.title = 'eSantini - Web Development';
  }, []);
  return (
    <>
      <header className='App-header'>
        <Logo src={logo} alt='logo' />
      </header>

      <HelloW className="helloWorld">Hello {user?.name ? user.name : 'World'}!</HelloW>

      <IntroWrapper>
        <Desc style={{ marginTop: '1rem' }}>
          Welcome to my digital playground, where{' '}
          <strong className='highlight'>JavaScript</strong>, <strong className='highlight'>React.js</strong>,
          and <strong className='highlight'>Node.js</strong> are the main attractions. This website is
          hosted on a <strong className='highlight' style={{ whiteSpace: 'nowrap' }}>Raspberry Pi</strong> in my apartment.
        </Desc>
        <Desc>
          I&apos;m Esteban, a <strong className='highlight'>front-end</strong> expert and{' '}
          <strong className='highlight'>back-end</strong> enthusiast who loves turning complex problems
          into simple, elegant solutions. This site is my <strong className='highlight'>sandbox</strong>,
          where I experiment, innovate, and occasionally break things (for science, of course!).
        </Desc>
        <Desc>
          Dive into my world by exploring my latest projects below, or take a closer look under the hood on
          my <ExternalLink href='https://github.com/esantini' className='highlight'>GitHub</ExternalLink> profile.
          Feel free to connect with me
          on <ExternalLink href='https://www.linkedin.com/in/estebansantini' className='highlight'>LinkedIn</ExternalLink> too.
        </Desc>
        <Desc>
          Let&apos;s explore what happens when creativity meets code!
        </Desc>
      </IntroWrapper>

      <ProfileLinks>
        <GithubLink showOctocat={true} />
        <ExternalLink
          className='linkedInLink'
          href='https://www.linkedin.com/in/estebansantini/'
        >
          <img src={linkedIn} alt='linkedIn logo' />
        </ExternalLink>
      </ProfileLinks>

      <LatestProjects />

      <h1 style={{ marginTop: '1.5em' }}>Thank you for your visit!</h1>
    </>
  );
}

Home.propTypes = {
  user: PropTypes.object,
};

export default Home;

const Logo = styled.img`
  width: 300px;
  height: 185px;
`;
const HelloW = styled.h1`
  margin-top: .7em;
`;

const IntroWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  p {
    text-align: justify;
    width: 80%;
    margin: auto;
  }
`;

const ProfileLinks = styled.div`
  display: flex;
  width: 80%;
  margin-top: 1em;
  justify-content: space-evenly;
  .linkedInLink {
    width: 7.5em;
    padding-top: 0.45em;
    img {
      width: 100%;
    }
  }
`;

const Desc = styled.p`
  a {
    white-space: nowrap;
  }
`;