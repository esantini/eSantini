const fetchUser = async (setUser, setIsLoading) => {
  try {
    const res = await fetch('/api/me');
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const user = await res.json();
    setUser(user);
    if (!user) {
      localStorage.removeItem('credential');
    }
  } catch (error) {
    setUser(null);
    localStorage.removeItem('credential');
    console.error('Failed to fetch user:', error);
    // Handle the error based on your application's needs
    return null;
  } finally {
    setIsLoading(false);
  }
}

const fetchData = (endpoint, callback) => {
  fetch(endpoint)
    .then(res => res.json())
    .then(callback)
    .catch(console.error);
}

const fetchSessions = (callback) => {
  fetch('graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      query: `
        query GetSessions($daysAgo: Int) {
          sessions(daysAgo: $daysAgo) {
            id
            timestamp
            geo {
              city
              region
              country
              ll
            }
            events {
              type
              details {
                page_path
                event_category
                event_label
                value
              }
              timestamp
            }
          }
        }
      `,
      variables: {
        daysAgo: 7, // Adjust this value as needed
      },
    }),
  })
    .then(response => response.json())
    .then(callback)
    .catch(console.error);
}

export { fetchUser, fetchData, fetchSessions };
