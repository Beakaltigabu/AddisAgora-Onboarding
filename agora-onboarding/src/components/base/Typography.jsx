export const Heading1 = ({ children, className = '' }) => (
  <h1 className={`text-h1 font-bold text-heading leading-heading ${className}`}>
    {children}
  </h1>
);

export const Heading2 = ({ children, className = '' }) => (
  <h2 className={`text-h2 font-semibold text-heading leading-heading ${className}`}>
    {children}
  </h2>
);

export const BodyText = ({ children, className = '' }) => (
  <p className={`text-body font-regular text-body leading-body ${className}`}>
    {children}
  </p>
);
