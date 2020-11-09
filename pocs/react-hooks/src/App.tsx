import React, { createContext, useContext, useEffect, useReducer } from "react";

// - Context nodig om ALLES tegelijk te updaten
// - Reducer nodig om de hook meerdere keren aan te kunnen roepen
// - Reducer dus IN context provider

type SessionData = {
  [slug: string]: TopicData;
};

type TopicData = {
  address1: any;
  address2: any;
};

// type setTopicDataFn = (topicData: Partial<TopicData>) => void;
type setSessionDataFn = (sessionData: SessionData) => void;

type AppSessionContext = {
  session: {} & SessionData;
  setSession: setSessionDataFn;
};

//// instantiate

const slug = "dakkapel-plaatsen";

const defaultSession = {
  "dakkapel-plaatsen": {
    address1: "default",
    address2: "default",
  },
};

const defaultContext: AppSessionContext = {
  session: defaultSession,
  setSession: (sessionData) => {},
};

const SessionContext = createContext(defaultContext);

/* =========================== SESSION ========================== */

export const useSession = () => {
  const { session, setSession } = useContext(SessionContext);
  return { session, setSession };
};

export const SessionButton = () => {
  const { session, setSession } = useSession();
  return (
    <p>
      <button
        onClick={() => {
          setSession({ [slug]: { address1: true, address2: true } });
          setSession({ xyz: { address1: false, address2: false } });
        }}
      >
        update session
      </button>
      <em>{JSON.stringify(session)}</em>
    </p>
  );
};

/* =========================== TOPIC ========================== */

export const topicReducer = (
  topicData: TopicData,
  data: Partial<TopicData>
) => {
  return {
    ...topicData,
    ...data,
  };
};

export const useTopicData = () => {
  const { session, setSession } = useSession();
  const [topicData, setTopicData] = useReducer(topicReducer, session[slug]);

  // When topicData changes, update the session
  useEffect(() => {
    setSession({ [slug]: topicData });
  }, [setSession, topicData]);

  return { topicData: session[slug], setTopicData };
};

export const TopicButton = () => {
  const { topicData, setTopicData } = useTopicData();
  return (
    <p>
      <button
        onClick={() => {
          setTopicData({ address1: Math.random().toString() + " 1" });
          setTopicData({ address2: Math.random().toString() + " 2" });
        }}
      >
        update topic
      </button>
      <em>{JSON.stringify(topicData)}</em>
    </p>
  );
};

/* =========================== PROVIDER ========================== */

export const sessionReducer = (
  session: SessionData,
  data: Partial<SessionData>
) => {
  return {
    ...session,
    ...data,
  } as SessionData;
};

const SessionProvider: React.FC = ({ children }) => {
  // We use the reducer to take care of too complex logic for setState.
  // Because we sometimes need to clear the sessionStorage.
  const [session, setSession] = useReducer(sessionReducer, defaultSession);

  useEffect(() => {
    sessionStorage.setItem("sessionData", JSON.stringify(session));
  }, [session]);

  // The session provider makes the data from the context available on all pages.
  // We can use the setSessionData function to add new data to the sessionStorage.
  return (
    <SessionContext.Provider value={{ session, setSession }}>
      {children}
    </SessionContext.Provider>
  );
};

/* =========================== THE ACTUAL FUNCTIONALITY ========================== */

export const Content = () => {
  const { session } = useSession();
  return (
    <div>
      <p>
        The session is <em>{JSON.stringify(session)}</em>
      </p>
      <SessionButton />
      <SessionButton />
      <TopicButton />
    </div>
  );
};

const App = () => {
  return (
    <SessionProvider>
      <Content />
    </SessionProvider>
  );
};

export default App;
