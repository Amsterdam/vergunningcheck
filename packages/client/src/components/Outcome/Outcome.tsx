import { themeSpacing } from "@amsterdam/asc-ui";
import React, { FunctionComponent } from "react";
import styled from "styled-components";

import { useChecker, useTopic } from "../../hooks";
import Loading from "../Loading";
import { OutcomeContent } from "./";

const OutcomeWrapper = styled.div`
  @media screen {
    padding-bottom: ${themeSpacing(5)};
  }
`;

const Outcome: FunctionComponent = () => {
  const { checker } = useChecker();
  const topic = useTopic();

  if (!topic) {
    return <Loading />;
  }

  if (checker === undefined) {
    return <Loading />;
  }

  // The "need contact" content comes from the IMTR file itself
  const outcomeType = checker.getClientOutcomeType();
  // This function can be moved to `imtr-client`

  // This part can be refactored whenever we have another checker that have custom outcomes
  const checkerContent = "XXX todo";

  const outcomeContent = checkerContent[outcomeType];

  if (!outcomeContent) {
    // Convert this to a unit test
    throw new Error("The contents have not been configured properly.");
  }

  return (
    <OutcomeWrapper>
      <OutcomeContent
        {...{
          outcomeContent,
          outcomeType,
        }}
      />
    </OutcomeWrapper>
  );
};

export default Outcome;
