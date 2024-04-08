import { useEffect } from 'react';
import PropTypes from 'prop-types';
import GoogleLoginButton from './GoogleLoginButton';
import { logOut } from 'utils';
import styled from '@emotion/styled';
import defaultProfileImg from 'assets/images/default-profile-img.png';

const Login = ({ user, setUser }) => {
  useEffect(() => {
    document.title = 'Login - eSantini';
  }, []);

  return <>
    <h1>Log In</h1>
    {user?.name ?
      <LoggedInDiv>
        Hello {user.name}
        <br />
        <img
          alt="User Profile Image"
          className="userImage"
          src={user.picture}
          onError={e => e.target.src = defaultProfileImg}
        />
        <br />
        <button onClick={() => logOut(setUser)} >Log out</button>
      </LoggedInDiv>
      :
      <>
        <P>
          Unless you&apos;re me, there&apos;s nothing to gain by logging in, but you can still explore!
        </P>
        <GoogleLoginButton setUser={setUser} />
      </>}
  </>;
};

Login.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func,
};

export default Login;

const LoggedInDiv = styled.div`
  text-align: center;
  .userImage {
    border-radius: 5em;
  }
`;

const P = styled.p`
  margin: 3em 1em;
  width: 19em;
  max-width: 85vw;
  text-align: center;
`;