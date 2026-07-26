import React from 'react';

const ErrorMessage = ({message, onRetry, onBack, backLabel = 'Back to listings'}) => {
  /* ===== JSX Return ===== */
  return (
    <div className="error-state">
      <p className="error-message">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="retry-button">
          Try again
        </button>
      )}
      {onBack && (
        <button onClick={onBack} className="retry-button">
          {backLabel}
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
