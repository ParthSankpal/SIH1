import React from "react";
import { BrowserRouter, Link, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import UserLogin from "./pages/UserLogin";
import LawyerLogin from "./pages/LawyerLogin";
import UserRegistration from "./pages/UserRegistration";
import LawyerRegistration from "./pages/LawyerRegistration";
import LawyerProfile from "./pages/LawyerProfile";
import ProfileSP from "./pages/ProfileSP";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/lawyer/login" element={<LawyerLogin />} />
        <Route path="/user/register" element={<UserRegistration />} />
        <Route path="/lawyer/register" element={<LawyerRegistration />} />
        {/* <Route path="/user/profile" element={<UserProfile />} /> User Profile Route */}
        <Route path="/lawyer/profile" element={< ProfileSP />} /> {/* Lawyer Profile Route */}
        <Route path="/" element={<Navigate to="/user/login" />} /> {/* Redirect to user login */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
