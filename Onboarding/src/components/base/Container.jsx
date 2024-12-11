import React from 'react';

const Container = ({ children, className = '' }) => (
  <div className={`max-w-[1200px] mx-auto px-4 ${className}`}>
    {children}
  </div>
);

export default Container;
