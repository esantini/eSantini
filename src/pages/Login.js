import { useEffect } from 'react';
import { GoogleLoginButton } from 'components';
import { logOut, useUser } from 'utils';
import styled from '@emotion/styled';
import defaultProfileImg from 'assets/images/default-profile-img.png';

const Login = () => {
  const [user, setUser] = useUser();
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