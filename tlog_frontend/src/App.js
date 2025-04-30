import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import Header from "./components/Header";
import TravelDetail from "./components/TravelDetail";
import TravelList from "./components/TravelList";
import Footer from "./components/Footer";
import Profile from "./components/Profile";
import TravelCreate from "./components/TravelCreate";
import TravelEdit from "./components/TravelEdit";

const App = () => {
  return (
    <main className="d-flex flex-column gap-3 min-vh-100">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/travels" />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/travels" element={<TravelList />} />
          <Route path="/travels/create" element={<TravelCreate />} />
          <Route path="/travels/:id" element={<TravelDetail />} />
          <Route path="/travels/:id/edit" element={<TravelEdit />} />
        </Routes>
        <Footer />
      </Router>
    </main>
  );
};

export default App;
