import React, { Children } from "react";

type Callback = (index?: number) => any;

/**
 * Use in case we need to pass props to children.
 * @param childrenProp React children
 * @param propsOrCallback this could be an object or a callback with the index as a parameter
 */
const passPropsToChildren = (
  childrenProp: React.ReactNode,
  propsOrCallback: React.PropsWithoutRef<{}> | Callback
) => {
  const children = Children.map(childrenProp, (child, index) =>
    React.cloneElement(
      child as React.ReactElement<any>,
      /* istanbul ignore next */
      typeof propsOrCallback === "function"
        ? propsOrCallback(index)
        : propsOrCallback
    )
  );

  return { children };
};

export default passPropsToChildren;
