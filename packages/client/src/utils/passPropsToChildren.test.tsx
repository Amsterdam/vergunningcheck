import React from "react";

import passPropsToChildren from "./passPropsToChildren";

const children = [<input />, <input />];
const childrenWithNull = [<input />, null, <input />];

describe("passPropsToChildren", () => {
  it("passes the properties", () => {
    const result = passPropsToChildren(children, {
      required: true,
    });

    expect(result).toMatchInlineSnapshot(`
      Object {
        "children": Array [
          <input
            required={true}
          />,
          <input
            required={true}
          />,
        ],
      }
    `);
  });

  it("passes the properties from a function", () => {
    const result = passPropsToChildren(children, () => ({
      required: false,
    }));

    expect(result).toMatchInlineSnapshot(`
      Object {
        "children": Array [
          <input
            required={false}
          />,
          <input
            required={false}
          />,
        ],
      }
    `);
  });

  it("accepts null", () => {
    const result = passPropsToChildren(childrenWithNull, () => ({
      required: false,
    }));

    expect(result).toMatchInlineSnapshot(`
      Object {
        "children": Array [
          <input
            required={false}
          />,
          <input
            required={false}
          />,
        ],
      }
    `);
  });
});
