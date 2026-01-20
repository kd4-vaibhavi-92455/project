import React, { lazy, Suspense } from "react";

// Utility function to lazy load a component
export const LazyLoad = (importFunc) => {
  const Component = lazy(importFunc);
  return (props) => (
    <Suspense fallback={<div>Loading...</div>}>
      <Component {...props} />
    </Suspense>
  );
};
