import React, { useState, useEffect } from "react";
import GlobalStyle from "./globals";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Navbar from "./components/Navbar";
import JobsPage from "./pages/JobsPage";
import styled from "styled-components";
import JobPostPage from "./pages/JobPostPage";
import { JobSearchProvider } from "./context/JobSearchContext";
import Login from "./pages/LoginPage";
import Signup from "./pages/SignupPage";

const AppStyled = styled.div`
  width: 100vw;
  min-height: 100vh;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: var(--padding-18);
  // position: relative;
`;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  
  return (
    <AppStyled>
      <GlobalStyle />
      <Router>
        <JobSearchProvider>
        {isLoggedIn && <Navbar onLogout={handleLogout}/>} {/* Show navbar only when logged in */}

          <Routes>
            {/* If the user is not logged in, redirect them to login page */}
            <Route
              path="/"
              element={
                isLoggedIn ? <Homepage /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/signup"
              exact
              element={<Signup onSignup={handleLogin} />} // Pass the login handler
            />
            <Route
              path="/login"
              exact
              element={<Login onLogin={handleLogin} />} // Pass the login handler
            />
            <Route
              path="/jobs"
              element={isLoggedIn ? <JobsPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/jobs/:id"
              element={isLoggedIn ? <JobPostPage /> : <Navigate to="/login" />}
            />
          </Routes>

        
        </JobSearchProvider>
      </Router>
    </AppStyled>
  );
}

export default App;
