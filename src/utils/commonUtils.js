import { useEffect } from 'react';

/**
 * Hook that runs callback if click outside of the passed ref
 */
export function useClickOutside(ref, callback) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
}

const convertToISO = (timestamp) => {
  if (/^\d+$/.test(timestamp)) {  // Checks if the timestamp is all digits (UNIX epoch)
    return new Date(parseInt(timestamp)).toISOString();
  }
  return timestamp;
};
const dateOptions = {
  year: 'numeric', month: 'short', day: 'numeric',
  hour: '2-digit', minute: '2-digit', second: '2-digit',
  hour12: true
};
export const getFormattedDate = (dateString) => {
  try {
    const date = new Date(convertToISO(dateString));
    return new Intl.DateTimeFormat('en-US', dateOptions).format(date);
  } catch (e) {
    console.error(e.message);
    return 'Invalid Date';
  }
}
