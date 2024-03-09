import { googleLogout } from '@react-oauth/google';

export const logOut = async (setUser) => {
  try {
    googleLogout();
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
};
