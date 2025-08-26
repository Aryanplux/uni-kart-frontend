import React from "react";

const Button = ({ type = "button", text, className, icon, ...rest }) => (
  <button type={type} className={className} {...rest}>
    {icon && <span className="btn-icon">{icon}</span>}
    {text}
  </button>
);

export default Button;
