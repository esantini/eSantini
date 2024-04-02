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

export { fetchUser, fetchData };
