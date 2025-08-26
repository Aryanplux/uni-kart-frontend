import React from "react";
import WelcomeScreen from "./WelcomeScreen";

const OnboardingContainer = ({ username, onComplete }) => (
  <WelcomeScreen username={username} onFinish={onComplete} />
);

export default OnboardingContainer;
