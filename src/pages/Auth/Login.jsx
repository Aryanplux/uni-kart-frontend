import React, { useState } from "react";
import LoginForm from "../../components/Auth/LoginForm";
import SignUpForm from "../../components/Auth/SignUpForm";
import OnboardingContainer from "../../components/Onboarding/OnboardingContainer";
import Home from "../Home/Home"; // Your home page component

const Login = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [username, setUsername] = useState("");
  const [onboardingData, setOnboardingData] = useState(null);

  const handleSignupComplete = (user) => {
    setUsername(user.name || user.username || "User");
    setShowSignUp(false);
    setDarkMode(false); // switch to light mode on onboarding
    setShowOnboarding(true);
  };

  // Called when onboarding completes all steps
  const handleOnboardingComplete = (data) => {
    setOnboardingData(data);
    setShowOnboarding(false);
    // You may navigate/show home here or update authenticated state
  };

  return (
    <div className={`auth-bg${darkMode ? " dark" : ""}`}>
      <nav className="auth-navbar">
        <h1 className="brand">Uni Kart</h1>

        {!showOnboarding && (
          <>
            <button
              className="dark-mode-btn"
              onClick={() => setDarkMode((d) => !d)}
            >
              {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
            </button>

            <button
              className="sign-up-btn"
              onClick={() => setShowSignUp((s) => !s)}
            >
              {showSignUp ? "Log In" : "Sign Up"}
            </button>
          </>
        )}
      </nav>

      <main className="auth-container">
        {showOnboarding ? (
          <OnboardingContainer
            username={username}
            onComplete={handleOnboardingComplete}
          />
        ) : onboardingData ? (
          <Home onboardingData={onboardingData} />
        ) : showSignUp ? (
          <SignUpForm
            onLogin={() => setShowSignUp(false)}
            onComplete={handleSignupComplete}
          />
        ) : (
          <LoginForm buttonText="Log In" />
        )}
      </main>
    </div>
  );
};

export default Login;
