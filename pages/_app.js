// pages/_app.js
import '../styles/globals.css';
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { ThemeProvider } from '../lib/ThemeContext';

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    // 로컬 스토리지에서 사용자 정보 가져오기
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <ThemeProvider>
      <Layout user={user} logout={logout}>
        <Component {...pageProps} user={user} login={login} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;