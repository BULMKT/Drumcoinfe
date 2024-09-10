import React from "react";

import "./index.css";

const Button1 = ({ imgPath, clickHandler, title }) => {
  return (
    <button
      className="custom-button1"
      onClick={(e) => {
        clickHandler();
      }}
    >
      <img src={imgPath} alt="no exsist" />
      <span>{title}</span>
    </button>
  );
};

export default Button1;
