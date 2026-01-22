// components/layout/Container.jsx
const Container = ({ children, className = "" }) => {
  return <div className={`px-6 md:px-24 w-full ${className}`}>{children}</div>;
};

export default Container;
