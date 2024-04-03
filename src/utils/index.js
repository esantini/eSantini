import { fetchUser, fetchData, fetchSessions, deleteSession } from './apiUtils';
import useClickOutside from './useClickOutside';
import { logOut } from './authUtils';
import { setLight, getLight } from './lightControls';
import { getWeather, setMessage, getCurrentMessage } from './miscApiCalls';
import { trackPageView, trackEvent } from './analytics';

export {
  logOut,
  setLight,
  getLight,
  fetchUser,
  fetchData,
  fetchSessions,
  deleteSession,
  getWeather,
  setMessage,
  useClickOutside,
  getCurrentMessage,
  trackPageView,
  trackEvent,
};
