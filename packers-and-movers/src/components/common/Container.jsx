// components/layout/Container.jsx
const Container = ({ children, className = "" }) => {
  return <div className={`px-45 w-full ${className}`}>{children}</div>;
};

export default Container;
