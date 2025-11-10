import { ComponentType, Suspense } from "react";

import SuspenseLoader from "src/components/SuspenseLoader";

const RoutesLoader =
  <P extends object>(Component: ComponentType<P>) =>
  (props: P) => {
    return (
      <Suspense fallback={<SuspenseLoader />}>
        <Component {...props} />
      </Suspense>
    );
  };

export default RoutesLoader;
