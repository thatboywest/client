import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import LoginComponent from "./pages/Login";
import SignupComponent from "./pages/Signup";
import Driver from "./pages/Driver";
import Client from "./pages/Client";
import Track from "./pages/Track";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginComponent />} />
          <Route path="/driver" element={<Driver />} />
          <Route path="/client" element={<Client />} />
          <Route path="/track" element={<Track />} />

          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<SignupComponent />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
