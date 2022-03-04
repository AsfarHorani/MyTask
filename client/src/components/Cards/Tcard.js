import React from "react";

const Tcard = (props) => {
  return props.label ? (
    <div className="t-card">
      <p>Transaction Type</p>
      <p>Amount</p>
      <p>Category</p>
      <p>Account</p>
      <p>Date | Time</p>
      <div className="icon">icon</div>
    </div>
  ) : (
    <div className="t-card">
      <p>Income</p>
      <p>Rs. 1000/-</p>
      <p>Pocket Money</p>
      <p>Bank</p>
      <p>Date/Time</p>
      <div className="icon">icon</div>
    </div>
  );
};

export default Tcard;
