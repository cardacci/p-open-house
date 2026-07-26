import React from 'react';

const Spinner = () => {
  /* ===== JSX Return ===== */
  return (
    <div className="spinner">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Spinner;
