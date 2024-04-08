import React from "react";
import "./ResetButton.css";

const ResetButton = ({ resetBoard }) => {
  return <button className="resetBtn" onClick={resetBoard}>Reset</button>;
};

export default ResetButton;
