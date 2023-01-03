import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Redirect } from 'react-router-dom';
import './index.css';
import Homepage from './pages/Homepage';
import SignUp from './components/signUp/SignUp';
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
