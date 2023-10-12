import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const users = await fetch('http://localhost:4000/auth/login', {
          method: 'GET',
        });
        const data = await users.json();
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    };
    getUser();
  }, []);
  return (
    <div>
      <h1>Hello Vite + React!</h1>
      <a href='http://localhost:4000/auth/google'>google</a>
      <h2>{user ? `Hello ${user}` : 'Hello Guest'}</h2>
      <button>submit</button>
    </div>
  );
}

export default App;
