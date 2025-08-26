import React from "react";

// Replace with actual icons or SVGs
const getIcon = (icon) => {
  switch (icon) {
    case "face":
      return <span role="img" aria-label="face">🙂</span>;
    case "lock":
      return <span role="img" aria-label="lock">🔒</span>;
    default:
      return null;
  }
};

const InputField = ({ type, placeholder, icon, value, onChange }) => (
  <div className="input-group">
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="input"
      required
    />
    <div className="input-icon">
      {getIcon(icon)}
    </div>
  </div>
);

export default InputField;
