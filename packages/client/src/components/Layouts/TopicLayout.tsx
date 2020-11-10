import { FormTitle, Heading } from "@amsterdam/asc-ui";
import React from "react";

import { HideForPrint } from "../../atoms";
import { DebugVariables } from "../../debug";
import { useTopic } from "../../hooks";
import BaseLayout from "./BaseLayout";

interface TopicLayoutProps {
  heading?: string;
  formTitle?: string;
}

const TopicLayout: React.FC<TopicLayoutProps> = ({
  children,
  heading: headingProp,
  formTitle: formTitleProp,
}) => {
  const topic = useTopic();

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
