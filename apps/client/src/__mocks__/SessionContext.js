// import { useContext } from "react";

// import { CheckerContext, SessionContext } from "../SessionContext";

// export default ({
//   children,
//   slug,
//   addressMock,
//   checker,
//   questionIndex,
// }) => {
//   const checkerContext = useContext(CheckerContext);
//   const sessionContext = useContext(SessionContext);
//   const setSessionData = jest.fn();

//   if (checker) {
//     checkerContext.checker = checker;
//   }

//   if (slug && addressMock) {
//     Object.assign(sessionContext, { [slug]: { address: addressMock } });
//   }

//   if (slug && questionIndex) {
//     Object.assign(sessionContext, { [slug]: { questionIndex } });
//   }

//   sessionContext.setSessionData = setSessionData;

//   return children;
// };
