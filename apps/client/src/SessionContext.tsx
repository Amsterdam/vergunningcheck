import React from "react";
import { createContext, useState } from "react";

// import { Topic } from "./config";

// // import { useParams } from "react-router-dom";

// // type QuestionAnswerType = {
// //   [key: string]: boolean | string;
// // };

// type Address = {};
// type Checker = {};
// export type CheckerData = {
//   checker?: Checker;
//   topic?: Topic;
//   autofillData: {
//     address?: Address;
//   };
// };

// // type TopicSessionData = {
// //   activeComponents: string[];
// //   address?: Address;
// //   answers?: QuestionAnswerType[];
// //   finishedComponents: string[];
// //   questionIndex?: number;
// // };

// // type SessionContextType = {
// //   setSessionData: any;
// // };
// // type SessionDataType = {
// //   [slug: string]: TopicSessionData;
// // };

// // type SessionType = SessionContextType & SessionDataType;

// const defaultCheckerValue: CheckerData = {
//   topic: undefined, // useTopic (gebruikt context)
//   checker: undefined, // useChecker (gebruikt context)
//   useAutofillData: {}, // useAutofillData
// };

// // const defaultSessionValues: SessionContextType = JSON.parse(
// //   sessionStorage.getItem("sessionData") || "{}"
// // );

// export const CheckerContext = createContext(defaultCheckerValue);
// // export const SessionContext = createContext(defaultSessionValues);

// export const SessionProvider = (props: { children: React.ReactNode }) => {
//   // We use the reducer to take care of too complex logic for setState.
//   // Because we sometimes need to clear the sessionStorage.
//   // const [data, setSessionData] = useReducer(reducer, defaultSessionValues);
//   // const [session, setSessionData] = useState(defaultSessionValues);
//   // const { slug } = useParams() as any;
//   // const [topicData, setTopicData] = useState(session[slug]);

//   // console.log(JSON.stringify(session));
//   // useEffect(() => {
//   //   console.log("useEffect called", JSON.stringify(session));
//   //   // debugger;
//   //   setSessionData(session);
//   //   sessionStorage.setItem("sessionData", JSON.stringify(session));
//   // }, [session]);

//   // The session provider makes the data from the context available on all pages.
//   // We can use the setSession function to add new data to the sessionStorage.
//   return (
//     // <SessionContext.Provider value={{ ...session, setSessionData }}>
//     <CheckerContext.Provider value={defaultCheckerValue}>
//       {props.children}
//     </CheckerContext.Provider>
//     // </SessionContext.Provider>
//   );
// };
// ===========================================================

// import React, { createContext, useContext, useEffect, useState } from "react";

// import { Topic } from "./config";

// const KEY = "sessionData";

// export type Context = {
//   session: SessionProps;
//   setSession(data: Partial<SessionProps>): void;
// };

// export type SessionProps = {
//   testing: any;
//   slug?: string;
//   topic?: Topic;
//   checker?: any; // @TODO; replace with IMTR-client CheckerType
//   autofillData?: any;
//   sessionStorage: {
//     [slug: string]: StoredTopicData | null;
//   };
// };

// // We define our type for the context properties right here
// // type ContextProps = {
// //   topics: {
// //     [slug: string]: {
// //       checker: {};
// //       topic: {};
// //       autofillData: {};
// //       session: {
// //         activeComponents?: string[];
// //         address?: {};
// //         answers?: {
// //           [key: string]: boolean | string;
// //         }[];
// //         finishedComponents?: string[];
// //         questionIndex?: number;
// //       }
// //     }
// //   }
// // }

// const originalValue = JSON.parse(window.sessionStorage.getItem(KEY) || "{}");

// const defaultValue: any = {
//   sessionStorage: originalValue,
// };

// // we initialise them without default values, to make that happen, we
// // apply the Partial helper type.
// export const SessionContext = createContext<SessionProps>(defaultValue);

// export const SessionProvider = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const context = useContext(SessionContext);
//   // const [session, _] = useState(context.session);

//   // useEffect(() => {
//   //   // @TODO: persist in sessionStorage
//   //   console.log("context changed!", testing);
//   //   setTesting(testing);
//   //   context.testing = testing;
//   // }, [context.session]);

//   return (
//     <SessionContext.Provider value={context}>
//       {Math.random()}
//       {children}
//     </SessionContext.Provider>
//   );
// };

// ==========================================================================

// export type StoredTopicData = {
//   activeComponents?: string[];
//   address?: {};
//   answers?: {
//     [key: string]: boolean | string;
//   }[];
//   finishedComponents?: string[];
//   questionIndex?: number;
// };

export type TopicSessionData = {
  activeComponents?: string[];
  answers?: {
    [id: string]: boolean | string | number | undefined;
  };
  address: any;
  finishedComponents: string[];
  questionIndex: number;
};

export const defaultTopicSession: TopicSessionData = {
  // activeComponents: [],
  address: null,
  finishedComponents: [],
  questionIndex: 0,
};

export type setSessionDataFn = (sessionData: Partial<SessionData>) => void;
export type SessionData = {
  [slug: string]: TopicSessionData;
};

export type setTopicSessionDataFn = (
  topicData: Partial<TopicSessionData>
) => void;

type X = {
  session: SessionData;
  setSessionData: setSessionDataFn;
};

const defaultSession: X = {
  session: {},
  setSessionData: () => {},
};

// TODO; remove export
export const SessionContext = createContext(defaultSession);

export const SessionProvider = (props: { children: React.ReactNode }) => {
  const { children } = props;
  const [session, setSessionData] = useState({});

  return (
    <SessionContext.Provider value={{ session, setSessionData }}>
      {children}
    </SessionContext.Provider>
  );
};
