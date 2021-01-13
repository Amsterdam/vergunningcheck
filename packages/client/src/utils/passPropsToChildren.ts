import {
  Children,
  PropsWithoutRef,
  ReactElement,
  ReactNode,
  cloneElement,
} from "react";

type Callback = (index?: number) => any;

/**
 * Use in case we need to pass props to children.
 * @param childrenProp React children
 * @param propsOrCallback this could be an object or a callback with the index as a parameter
 */
const passPropsToChildren = (
  childrenProp: ReactNode,
  propsOrCallback: PropsWithoutRef<{}> | Callback
) => {
  const children = Children.map(childrenProp, (child, index) =>
    cloneElement(
      child as ReactElement<any>,
      typeof propsOrCallback === "function"
        ? propsOrCallback(index)
        : propsOrCallback
    )
  );

  return { children };
};

export default passPropsToChildren;
