import React from 'react';

const Grid = ({ children, cols = 1, gap = 4, className = '' }) => (
  <div
    className={`grid grid-cols-1 md:grid-cols-${cols} gap-${gap} ${className}`}
  >
    {children}
  </div>
);

export default Grid;
