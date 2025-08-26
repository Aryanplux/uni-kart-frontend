// src/pages/signup.jsx
import React, { useState } from "react";
import SignUpForm from "../components/Auth/SignUpForm";

const Signup = () => {
  const [userCreated, setUserCreated] = useState(false);
  const [username, setUsername] = useState("");

  const handleComplete = (user) => {
    setUsername(user.name);
    setUserCreated(true);
    // navigate to onboarding or dashboard page
  };

  if (userCreated) {
    return <OnboardingContainer username={username} />
  }

  return <SignUpForm onComplete={handleComplete} />;
};

export default Signup;
