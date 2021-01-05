import React, { FunctionComponent, useState } from "react";
import { Helmet } from "react-helmet";

import { TopicLayout } from "../components/Layouts";
import {
  StepByStepItem,
  StepByStepNavigation,
} from "../components/StepByStepNavigation";
import { useTopic } from "../hooks";

type SectionProps = {
  index: any;
  isActive: boolean;
  isCompleted: boolean;
  renderer?: any;
  title?: string;
};

const Section: FunctionComponent = (props: any) => {
  const {
    activate,
    complete,
    currentSection,
    getActiveSection,
    goToNextSection,
    goToPrevSection,
    hasFutureActiveSections,
    isLastSection,
  } = props;

  return (
    <div>
      <p>Index: {currentSection.index}</p>

      {currentSection.index > 0 && currentSection.isActive && (
        <div>
          <button
            disabled={getActiveSection() !== currentSection}
            onClick={goToPrevSection}
          >
            Prev
          </button>
        </div>
      )}

      {getActiveSection() !== currentSection &&
        (hasFutureActiveSections(currentSection) ||
          currentSection.isCompleted) && (
          <div>
            <button onClick={() => activate(currentSection)}>Activate</button>
          </div>
        )}

      {!isLastSection(currentSection) && (
        <div>
          <button
            onClick={() =>
              complete(!currentSection.isCompleted, currentSection)
            }
          >
            Toggle complete
          </button>
        </div>
      )}

      {!isLastSection(currentSection) && currentSection.isActive && (
        <div>
          <button
            disabled={getActiveSection() !== currentSection}
            onClick={goToNextSection}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

// This one needs to be generated
const defaultSections: SectionProps[] = [
  {
    index: 0,
    isActive: true,
    isCompleted: false,
    renderer: (props: any) => {
      return <Section {...props} />;
    },
    title: "Adresgegevens",
  },
  {
    index: 1,
    isActive: false,
    isCompleted: false,
    renderer: (props: any) => {
      return <Section {...props} />;
    },
    title: "Vragen",
  },
  {
    index: 2,
    isActive: false,
    isCompleted: false,
    renderer: (props: any) => {
      return <Section {...props} />;
    },
    title: "Uitkomt",
  },
];

const CheckerPage: FunctionComponent = () => {
  const { text } = useTopic();
  const [sections, updateSections] = useState(defaultSections);

  const getActiveSectionIndex = () => {
    const activeSection = sections.filter(
      (currentSection) => currentSection.isActive === true
    );
    if (activeSection.length !== 1) {
      // Always expect one section to be active
      throw new Error(
        `"getActiveSectionIndex()": Expected one active section, got "${activeSection.length}"`
      );
    }
    return activeSection[0].index;
  };

  const getActiveSection = () => sections[getActiveSectionIndex()];

  // change to setActive
  const activate = (section: SectionProps) => {
    let newSections = [...sections];

    // Deactivate current active section
    newSections[getActiveSectionIndex()].isActive = false;

    // Mark new section as active
    newSections[section.index].isActive = true;

    updateSections(newSections);
  };

  // change to setCompleted
  const complete = (
    state: null | boolean = null,
    section: SectionProps | null = null
  ) => {
    // console.log("complete:", state, section?.index);
    let newSections = [...sections];
    const newState = state === null ? true : state;

    if (section) {
      // Mark specific section as complete
      newSections[section.index].isCompleted = newState;
    } else {
      // Mark current section as complete || as state
      newSections[getActiveSectionIndex()].isCompleted = newState;
    }
    updateSections(newSections);
  };

  // change to getLastSection
  const isLastSection = (section: SectionProps) =>
    section.index === sections.length - 1;

  const goToNextSection = () => {
    const newSectionIndex = getActiveSectionIndex() + 1;
    const newSection = sections[newSectionIndex];
    // console.log("goToNextSection:", newSectionIndex);

    if (newSection) {
      complete();
      activate(newSection);

      // The last section is always completed when activated
      if (isLastSection(newSection)) {
        complete(true, newSection);
      }
    } else {
      // Expect new section to exist
      throw new Error(
        `"goToNextSection()": Failed going to next section, because "newSectionIndex" doesn't exist. Received: "${newSectionIndex}"`
      );
    }
  };

  const goToPrevSection = () => {
    const newSectionIndex = getActiveSectionIndex() - 1;
    const newSection = sections[newSectionIndex];

    if (newSection) {
      activate(newSection);
    } else {
      // Expect new section to exist
      throw new Error(
        `"goToPrevSection()": Failed going to prev section, because "newSectionIndex" doesn't exist. Received: "${newSectionIndex}"`
      );
    }
  };

  const hasFutureActiveSections = (
    section: SectionProps = getActiveSection()
  ) => {
    const lastActiveSection = sections
      .filter((s) => s.isCompleted)
      .map((s) => s.index)
      .pop();
    return lastActiveSection > section.index;
  };

  const sectionsRenderer = () => {
    return sections.map((section) => {
      const { index, isActive, isCompleted, renderer, title } = section;

      return (
        <StepByStepItem
          active={isActive}
          checked={isCompleted}
          // `done` is a state when a future section is completed but the active section is not completed
          done={hasFutureActiveSections(section)}
          heading={title}
          largeCircle
          key={index}
        >
          {renderer({
            activate,
            complete,
            currentSection: sections[index],
            getActiveSection,
            goToNextSection,
            goToPrevSection,
            hasFutureActiveSections,
            isCompleted,
            isLastSection,
          })}
        </StepByStepItem>
      );
    });
  };

  return (
    <TopicLayout>
      <Helmet>
        <title>Vragen en uitkomst - {text.heading}</title>
      </Helmet>
      <StepByStepNavigation
        customSize
        disabledTextColor="inherit"
        doneTextColor="inherit"
        highlightActive
        lineBetweenItems
      >
        {sectionsRenderer()}
      </StepByStepNavigation>
    </TopicLayout>
  );
};

export default CheckerPage;
