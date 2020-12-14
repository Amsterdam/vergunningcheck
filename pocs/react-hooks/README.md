# React Hooks

This PoC is to demonstrate how we can use React Hooks. The code in this PoC can also
be used as reference in case something breaks.

## Requirements

- Separate Context for Session (SessionStorage) and Checker (Memory)
- When using the setters all the components in the app should update (Context solves this)
- Setters need to handle mulitple calls in same render pass (useReducer solves this)
- Hooks using data and calling setters from other hooks
- Combine the Context and reducers in the right fashion

## Running this PoC

```
npm install
npm test
npm start
```
