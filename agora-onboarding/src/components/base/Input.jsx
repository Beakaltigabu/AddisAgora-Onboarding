import React from 'react';

const Input = ({ label, error, className = '', ...props }) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-heading mb-2 font-medium">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-2 bg-background-primary border border-border-primary
                   rounded-lg focus:outline-none focus:border-primary
                   focus:ring-2 focus:ring-primary/20 ${className}`}
        {...props}
      />
      {error && (
        <span className="text-primary text-small mt-1 font-regular">
          {error}
        </span>
      )}
    </div>
  );
};



export default Input;
