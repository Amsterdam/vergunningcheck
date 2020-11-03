import { useContext } from "react";

import {
  SessionContext,
  SessionData,
  setSessionDataFn,
} from "../SessionContext";

// import useSlug from "./useSlug";

// import { useState } from "react";

// import useSlug from "./useSlug";

// type Session = {
//   [slug: string]: SessionTopic;
// };

// type SessionTopic = {
//   activeComponents?: string[];
//   address?: {};
//   answers?: {
//     [key: string]: boolean | string;
//   }[];
//   finishedComponents?: string[];
//   questionIndex?: number;
// };

// const KEY = "sessionData";

// const res = JSON.parse(window.sessionStorage.getItem(KEY) || "{}") as Session;
// console.log("Getting session from sessionStorage", JSON.stringify(res));

// export const useSession = () => {
//   const slug = useSlug();

//   // State to store our value
//   // Pass initial state function to useState so logic is only executed once
//   const [session, setSession] = useState(res);

//   return {
//     // Current session is scoped to active slug
//     session: session[slug],

//     // Set new session data for active slug
//     setSessionData: (data: any) => {
//       const newSession: Session = Object.assign({}, session, {
//         [slug]: Object.assign({}, session[slug], data),
//       });
//       console.warn(
//         "set from ",
//         JSON.stringify(session),
//         "to",
//         JSON.stringify(newSession)
//       );
//       debugger;

//       // Save to local storage
//       window.sessionStorage.setItem(KEY, JSON.stringify(newSession));
//       setSession(newSession);
//       setTimeout(() => {
//         console.log("session after 1 ms is ", JSON.stringify(session));
//       }, 1);
//     },
//   };
// };

// const fakeContext = {};

/// ===========================================

// export default () => {
//   const context = useContext(SessionContext);
//   // const slug = useSlug();
//   // if (!slug) throw new Error("Session not found because slug is unknown");

//   // const [session, setSession] = useState(fakeContext);
//   const [topicData, setTopicData] = useState(context.testing);
//   const [topicData2, setTopicData2] = useState(context.testing);

//   useEffect(() => {
//     setTopicData(context.testing);
//   }, [context]);

//   useEffect(() => {
//     context.testing = topicData2;
//   }, [topicData2]);

//   // const updateContext = (incomingData) => {
//   //   context.testing = incomingData;
//   // }

//   // context.testing = topicData;
//   // const [topicData, setTopicData] = useState(context.testing);
//   // useEffect(() => {
//   //   console.log("use effect", session);
//   //   setSession(context.sessionStorage[slug]);
//   // }, [context.sessionStorage]);

//   // const [session, setData] = useState(context.sessionStorage);
//   // const setData = (data: any | null) => {
//   //   const newSession = data ? { ...topicData, ...data, robin: true } : data;
//   //   console.log(
//   //     "setting new session, olddata: ",
//   //     JSON.stringify(topicData),
//   //     "incoming data:",
//   //     JSON.stringify(data),
//   //     "new session",
//   //     JSON.stringify(newSession)
//   //   );

//   //   // context.testing = newSession;
//   //   context.testing = newSession;
//   //   context.setTesting(newSession);
//   //   // setTopicData(newSession);
//   // };

//   return [topicData, setTopicData2] as [
//     StoredTopicData,
//     (data: StoredTopicData | null) => void
//   ];
// };

export default () => {
  const { session, setSessionData } = useContext(SessionContext);

  // const loggedSetter = (data: any) => {
  //   console.log("useSession setter => data", data);
  //   setSessionData(data);
  // };

  return [session, setSessionData] as [SessionData, setSessionDataFn];
};
