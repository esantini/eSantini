import PropTypes from 'prop-types';
import GoogleLoginButton from './GoogleLoginButton';

const logOut = async (setUser) => {
  try {
    const res = await fetch('/api/auth/logout', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();
    console.log({ data });
  }
  catch (error) {
    console.error('Failed to log out:', error);
  }
  localStorage.removeItem('credential');
  setUser({});
}

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
