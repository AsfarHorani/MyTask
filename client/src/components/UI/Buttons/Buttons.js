import React from "react";

const AuthButton = (props) => {
  const { label, onClick } = props;
  return (
    <button className="auth-button" onClick={onClick}>
      {label}
    </button>
  );
};

export default AuthButton;