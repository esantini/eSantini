import {
  fetchUser,
  fetchData,
  fetchSessions,
  deleteSession,
  setChatId,
  requestChat,
  useWebSocket,
  fetchChatMessages,
  fetchConversations,
} from './apiUtils';
import { useUser } from 'components/UserProvider';
import { logOut } from './authUtils';
import { setLight, getLight } from './lightControls';
import { getWeather, setMessage, getCurrentMessage } from './miscApiCalls';
import { trackPageView, trackEvent } from './analytics';
import { getFormattedDate, useClickOutside } from './commonUtils';

export {
  logOut,
  useUser,
  setLight,
  getLight,
  fetchUser,
  fetchData,
  fetchSessions,
  deleteSession,
  setChatId,
  requestChat,
  useWebSocket,
  fetchChatMessages,
  fetchConversations,
  getWeather,
  setMessage,
  useClickOutside,
  getFormattedDate,
  getCurrentMessage,
  trackPageView,
  trackEvent,
};
