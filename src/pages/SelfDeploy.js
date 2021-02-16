import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

import { selfUpdate } from '../utils';
import { GithubLink, H1, P, Section } from '../components';

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

const SelfDeploy = () => {
  const [updateKey, setUpdateKey] = useState('');
  const [deployStatus, setDeployStatus] = useState('');

  const onChangeInput = (e) => setUpdateKey(e.target.value);

  const submitSelfUpdate = () =>
    selfUpdate(
      updateKey,
      (aver) => console.log({ aver }) || setDeployStatus(aver.status)
    );

  useEffect(() => (document.title = 'Self Update - eSantini'), []);

  return (
    <>
      <Nav>
        <Link to="/">
          <img alt="Logo link to home" src={logo} />
        </Link>
      </Nav>
      <Header>
        <H1>Self Deploy</H1>
      </Header>
      <Section>
        <P_NoWrap>
          Pull changes from the{' '}
          <Span>
            <GithubLink compact={true} />
          </Span>
          Repository and deploys the server.
        </P_NoWrap>

        <div>
          <input
            type="password"
            onChange={onChangeInput}
            value={updateKey.toString()}
          />
          <button onClick={submitSelfUpdate}>Update</button>
        </div>

        {deployStatus && <h3>{deployStatus}</h3>}
      </Section>
    </>
  );
};

export default SelfDeploy;
