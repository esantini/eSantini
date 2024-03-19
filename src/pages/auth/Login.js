import PropTypes from 'prop-types';
import GoogleLoginButton from './GoogleLoginButton';
import { logOut } from 'utils';
import styled from '@emotion/styled';

const Login = ({ user, setUser }) => (<>
  <h1>Log In</h1>
  {user?.name ?
    <div style={{ textAlign: 'center' }}>
      Hello {user.name}
      <br />
      <img alt="User Profile Image" src={user.picture} />
      <br />
      <button onClick={() => logOut(setUser)} >Log out</button>
    </div>
    :
    <>
      <P>
        Unless you&apos;re me, there&apos;s nothing to gain by logging in, but you can still explore!
      </P>
      <GoogleLoginButton setUser={setUser} />
    </>}
</>);

Login.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func,
};

export default Login;

const P = styled.p`
  margin: 3em 1em;
  width: 19em;
  max-width: 85vw;
  text-align: center;
`;