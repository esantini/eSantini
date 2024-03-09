import PropTypes from 'prop-types';
import GoogleLoginButton from './GoogleLoginButton';
import { logOut } from 'utils';

const Login = ({ user, setUser }) =>
  user?.name ?
    <div>
      Hello {user.name}
      <br />
      <img alt="User Profile Image" src={user.picture} />
      <br />
      <button onClick={() => logOut(setUser)} >Log out</button>
    </div>
    :
    <GoogleLoginButton setUser={setUser} />;

Login.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func,
};

export default Login;
