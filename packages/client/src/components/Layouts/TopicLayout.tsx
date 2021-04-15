import { FormTitle, Heading } from "@amsterdam/asc-ui";
import React, { FunctionComponent } from "react";

import { HideForPrint } from "../../atoms";
import { DebugVariables } from "../../debug";
import { useTopic } from "../../hooks";
import { BaseLayout } from ".";

interface TopicLayoutProps {
  formTitle?: string;
  heading?: string;
}

const TopicLayout: FunctionComponent<TopicLayoutProps> = ({
  children,
  formTitle: formTitleProp,
  heading: headingProp,
}) => {
  const topic = useTopic();
  if (!topic) {
    return <p>loading...</p>;
  }

  const { hasIMTR, name, text } = topic;
  const formTitle = formTitleProp || text?.heading;
  const heading = hasIMTR && name ? name : headingProp;

  return (
    <BaseLayout>
      {formTitle && <FormTitle>{formTitle}</FormTitle>}
      {heading && (
        <Heading forwardedAs="h2" gutterBottom={16} styleAs="h1">
          {heading}
        </Heading>
      )}
      {children}

      <HideForPrint>
        <DebugVariables />
      </HideForPrint>
    </BaseLayout>
  );
};

export default TopicLayout;
