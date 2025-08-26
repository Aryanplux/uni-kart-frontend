import React, { useState, useEffect } from "react";
import Login from "./pages/Auth/Login";
import OnboardingContainer from "./components/Onboarding/OnboardingContainer";
import Home from "./pages/Home/Home";
import "./App.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem("isLoggedIn") === "true");
  const [showOnboarding, setShowOnboarding] = useState(() => localStorage.getItem("showOnboarding") !== "false");
  const [username, setUsername] = useState(() => localStorage.getItem("username") || "");
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn ? "true" : "false");
    localStorage.setItem("showOnboarding", showOnboarding ? "true" : "false");
    localStorage.setItem("username", username);
  }, [isLoggedIn, showOnboarding, username]);

  const handleLoginSuccess = (user) => {
    setUsername(user?.name || user?.username || "User");
    setIsLoggedIn(true);
    setShowOnboarding(true);
  };

  const handleOnboardingComplete = (data) => {
    setProfileData(data);
    setShowOnboarding(false);
  };

  // CONDITIONAL RENDERING - Only show ONE component at a time
  if (!isLoggedIn) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  if (showOnboarding) {
    return <OnboardingContainer username={username} onComplete={handleOnboardingComplete} />;
  }

  return <Home profileData={profileData} username={username} />;
};

export default App;
