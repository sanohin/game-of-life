// @flow
import React from "react";

export function useLatestValue<T>(data: T): { current: T } {
  const ref = React.useRef<T>(data);
  React.useEffect(() => {
    ref.current = data;
  });
  return ref;
}
