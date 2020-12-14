/**
 * THIS FILE IS COPY PASTED FROM:
 * https://github.com/Amsterdam/signals-frontend/blob/develop/src/hooks/useDebounce.js
 * AND ONLY TRANSFORMED INTO TYPESCRIPT
 *
 * @TODO: Write a test
 */
import { useRef } from "react";

export default (func: Function, wait: number) => {
  const timeout = useRef(null) as any;

  return function (this: any, ...args: any[]) {
    const that = this;

    if (timeout.current) clearTimeout(timeout.current);

    timeout.current = setTimeout(() => {
      func.apply(that, args);
      clearTimeout(timeout.current);
    }, wait);
  };
};
