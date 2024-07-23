import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from './components/Navbar';
import Router from './components/Router';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Login from './pages/login.jsx';
import Cookies from 'js-cookie';
import { setAuthenticated, setUnauthenticated } from './reducers/authReducer';

export default function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const checkSession = async () => {
    const sessionId = Cookies.get('sessionId');
    if (sessionId) {
      try {
        const response = await fetch('http://localhost:3000/hasAdminSession', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ sessionId }),
        });

        if (response.ok) {
          const result = await response.text();
          if (result === "true") {
            dispatch(setAuthenticated());
          } else {
            dispatch(setUnauthenticated());
          }
        } else {
          dispatch(setUnauthenticated());
        }
      } catch (error) {
        dispatch(setUnauthenticated());
      }
    } else {
      dispatch(setUnauthenticated());
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <>
      {isAuthenticated ? (
        <div className="main-wrapper container">
          <div className="navbar-bg"></div>
          <Navbar />
          <Sidebar />
          <main>
            <Router />
          </main>
          <Footer />
        </div>
      ) : (
        <Login />
      )}
    </>
  );
}
