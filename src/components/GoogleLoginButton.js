import PropTypes from 'prop-types';
import { GoogleLogin } from '@react-oauth/google';

const GoogleLoginButton = ({ setUser }) => {

  const handleSuccess = async ({ credential }) => {
    try {
      const apiResponse = await fetch('/api/auth/google', {
        method: 'POST',
        body: JSON.stringify({ idToken: credential }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      localStorage.setItem('credential', JSON.stringify(credential));
      setUser(await apiResponse.json());
    } catch (error) {
      console.error('Failed to log in:', error);
    }
  }

  const handleError = error => {
    console.error('oh no', error);
  }

  return <GoogleLogin onSuccess={handleSuccess} onError={handleError} />;
};

GoogleLoginButton.propTypes = {
  setUser: PropTypes.func,
};

export default GoogleLoginButton;
