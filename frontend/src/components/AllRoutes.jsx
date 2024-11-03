import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Login from './pages/Login';

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/signin" element={<Login />} />
    </Routes>
  );
};

export default AllRoutes;
