
import { Route } from 'react-router-dom';
const setAnonCookie = () => document.cookie = 'is_ese=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/';

const MyDebugger = () => <Route path="/makemeanon">
  <button onClick={setAnonCookie}>Anon</button>
</Route>

export default MyDebugger;
