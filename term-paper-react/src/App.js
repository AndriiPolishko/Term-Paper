import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import './index.css';
import './styles.css';
import './technicalStyles.css';
import Homepage from './pages/Homepage';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import UserPage from './pages/UserPage';
import LikedHousing from './pages/LikedHousing';
import Header from './components/header/Header';
const App = () => {
  const { user } = useAuthContext();
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/sign-up"
          element={!user ? <SignUp /> : <Navigate to="/" />}
        />
        <Route
          path="/log-in"
          element={!user ? <LogIn /> : <Navigate to="/" />}
        />
        <Route
          path="/user"
          element={user ? <UserPage /> : <Navigate to="/log-in" />}
        />
        <Route
          path="/likedHousing"
          element={user ? <LikedHousing /> : <Navigate to="/log-in" />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
