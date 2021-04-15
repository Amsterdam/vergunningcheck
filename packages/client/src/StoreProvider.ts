import React, { useCallback, useState } from "react";
import { setConstantValue } from "typescript";

import { initialProps } from "./TopicStore";
import IProps, { TopicDataProps } from "./types";

const TopicStoreProvider: React.FC<IProps> = ({ children }) => {
  const [topicData, setState] = useState<TopicDataProps>(initialProps);
  const [pagesCount, setPagesCount] = React.useState(1);
  const fetchedPages = React.useRef(new Set([0]));

  const canFetchData = React.useCallback(
    (activePage: number) => {
      const isAlreadyFetched = fetchedPages.current.has(activePage);
      const dataLength = topicData.length;
    },
    [topicData, fetchedPages, pagesCount]
  );

  const onQueryDataSuccess = React.useCallback(
    (newDataFromRequest: ["data"], params: {}) => {
      setPagesCount(newDataFromRequest.length);

      setConstantValue((oldState) => {
        const endPoint = params.endPointKey;
        let currentTableData = oldState(endpoint);

        if (newDataFromRequest) {
          currentTableData = newDataFromRequest;
        }

        return {
          ...oldState,
          [endPoint]: currentTableData,
        };
      });
    },
    [setPagesCount]
  );

  const { runQuery, status } = useTopicQuery(onQueryDataSuccess);

  const fetchTopicData = useCallback(
    async (endpointKey?: TablesEndPointKeys, forceFetch?: boolean) => {}
  );
};
