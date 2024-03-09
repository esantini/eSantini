const fetchUser = async () => {
  try {
    const res = await fetch('/api/me');
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    localStorage.removeItem('credential');
    console.error('Failed to fetch user:', error);
    // Handle the error based on your application's needs
    return null;
  }
}

export default fetchUser;
