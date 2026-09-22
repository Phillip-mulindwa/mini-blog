// src/hocs/withLogger.tsx
//
// A Higher-Order Component: a function that takes a component and returns
// a new component wrapping it with extra behaviour  here, logging when
// the wrapped component mounts and unmounts.

import { useEffect, type ComponentType } from "react";

export function withLogger<P extends object>(
  WrappedComponent: ComponentType<P>,
  label: string = WrappedComponent.displayName || WrappedComponent.name || "Component"
) {
  function LoggedComponent(props: P) {
    useEffect(() => {
      console.log(`[withLogger] ▸ ${label} mounted at ${new Date().toLocaleTimeString()}`);
      return () => {
        console.log(`[withLogger] ▾ ${label} unmounted at ${new Date().toLocaleTimeString()}`);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <WrappedComponent {...props} />;
  }

  LoggedComponent.displayName = `withLogger(${label})`;
  return LoggedComponent;
}