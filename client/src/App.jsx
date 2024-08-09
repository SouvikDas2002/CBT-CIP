import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './components/Header';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtecRoute from './components/ProtecRoute';
import Dashboard from './pages/Dashboard';
import PassRecover from './pages/PassRecover';
import Profile from './pages/Profile';
import { logout } from './redux/authSlice';
import Myactivity from './pages/Myactivity';

const theme = createTheme();

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtecRoute isAuthenticated={isAuthenticated}>
                <Dashboard />
              </ProtecRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtecRoute isAuthenticated={isAuthenticated}>
                <Profile />
              </ProtecRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/password-recovery" element={<PassRecover />} />
          <Route path='/myactivity' element={<Myactivity/>}/>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
