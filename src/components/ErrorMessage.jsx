import React from 'react';

const ErrorMessage = ({message, onRetry}) => {
  return (
    <div className="error-state">
      <p className="error-message">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="retry-button">
          Try again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
