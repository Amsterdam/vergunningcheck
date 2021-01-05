import React, {
  Fragment,
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { Helmet } from "react-helmet";

import { TopicLayout } from "../components/Layouts";
import { LocationSection } from "../components/Location";
import { OutcomeSection } from "../components/Outcome";
import { QuestionSection } from "../components/Question";
import {
  StepByStepItem,
  StepByStepNavigation,
} from "../components/StepByStepNavigation";
import { getDataNeed } from "../config/autofill";
import { useChecker, useSlug, useTopic } from "../hooks";
import { SessionContext } from "../SessionContext";
import ErrorPage from "./ErrorPage";
import LoadingPage from "./LoadingPage";

export type SectionProps = {
  currentSection?: any;
  sectionFunctions?: any;
};

type SectionObjectProps = {
  index: number;
  isActive: boolean;
  isCompleted: boolean;
  renderer?: (props: SectionProps) => {};
  renderOutsideWrapper?: boolean;
  title?: string;
};

const defaultSections: SectionObjectProps[] = [
  {
    index: 0,
    isActive: false,
    isCompleted: false,
    renderer: (props) => {
      return <QuestionSection {...props} />;
    },
    renderOutsideWrapper: true,
    title: "Vragen",
  },
  {
    index: 0,
    isActive: false,
    isCompleted: false,
    renderer: (props) => {
      return <OutcomeSection {...props} />;
    },
    title: "Uitkomt",
  },
];
const locationSection: SectionObjectProps[] = [
  {
    index: 0,
    isActive: false,
    isCompleted: false,
    renderer: (props) => {
      return <LocationSection {...props} />;
    },
    title: "Adresgegevens",
  },
];

const CheckerPage: FunctionComponent = () => {
  // Initialize hooks
  const { checker } = useChecker();
  const sessionContext = useContext(SessionContext);
  const [sections, updateSections] = useState(defaultSections);
  const slug = useSlug();
  const { text } = useTopic();

  const hasDataNeeds = !!getDataNeed(checker);

  const initializeSections = (sections: SectionObjectProps[]) => {
    let newSections = [...sections];

    newSections.map((section, index) => {
      let indexedSection = section;
      indexedSection.index = index;

      // Make the first section active
      if (index === 0) {
        indexedSection.isActive = true;
      } else {
        indexedSection.isActive = false;
      }

      return indexedSection;
    });
    updateSections(newSections);
  };

  useEffect(() => {
    // Add location section
    if (checker && hasDataNeeds) {
      let currentSections: SectionObjectProps[] = [
        ...locationSection,
        ...defaultSections,
      ];

      initializeSections(currentSections);
    }

    if (checker && !hasDataNeeds) {
      initializeSections(sections);
    }

    // Prevent linter to add all dependencies, now the useEffect is only called when `checker` updates
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checker]);

  const getActiveSectionIndex = () => {
    const activeSection = sections.filter(
      (currentSection) => currentSection.isActive === true
    );
    if (!activeSection || activeSection.length !== 1) {
      // Always expect one section to be active
      throw new Error(
        `"getActiveSectionIndex()": Expected one active section, got "${activeSection.length}"`
      );
    }
    return activeSection[0].index;
  };

  const getActiveSection = () => sections[getActiveSectionIndex()];

  // change to setActive
  const activate = (
    section: SectionObjectProps,
    initialize: boolean = false
  ) => {
    let newSections = [...sections];

    if (!initialize) {
      // Deactivate current active section
      newSections[getActiveSectionIndex()].isActive = false;
    }

    // Mark new section as active
    newSections[section.index].isActive = true;

    updateSections(newSections);
  };

  // change to setCompleted
  const complete = (
    state: null | boolean = null,
    section: SectionObjectProps | null = null
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
  const isLastSection = (section: SectionObjectProps) =>
    section.index === sections.length - 1;

  const goToNextSection = () => {
    const newSectionIndex = getActiveSectionIndex() + 1;
    // console.log("goToNextSection:", newSectionIndex);
    const newSection = sections[newSectionIndex];

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
    section: SectionObjectProps = getActiveSection()
  ) => {
    const lastActiveSection = sections
      .filter((s) => s.isCompleted)
      .map((s) => s.index)
      .pop();
    return lastActiveSection && lastActiveSection > section.index;
  };

  const sectionsRenderer = (sections: SectionObjectProps[]) => {
    return sections.map((section, computedIndex) => {
      const {
        isActive,
        isCompleted,
        renderer,
        renderOutsideWrapper,
        title,
      } = section;

      const sectionFunctions = {
        activate,
        complete,
        getActiveSection,
        goToNextSection,
        goToPrevSection,
        hasFutureActiveSections,
        isLastSection,
      };

      const componentToRender =
        renderer &&
        renderer({
          currentSection: section,
          sectionFunctions,
        });

      return (
        <Fragment key={computedIndex}>
          <StepByStepItem
            active={isActive}
            checked={isCompleted}
            customSize
            // `done` is a state when a future section is completed but the active section is not completed
            done={hasFutureActiveSections(section)}
            heading={title}
            largeCircle
          >
            {!renderOutsideWrapper && componentToRender}
          </StepByStepItem>
          {renderOutsideWrapper && componentToRender}
        </Fragment>
      );
    });
  };

  // In case `topicData` is not found on the Session Context display an error
  // This is to prevent a bug when `topicData` is passing old data or when the Session Storage is manually deleted
  if (!sessionContext.session[slug]) {
    return <ErrorPage />;
  }

  if (!checker) {
    return <LoadingPage />;
  }

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
        {sectionsRenderer(sections)}
      </StepByStepNavigation>
    </TopicLayout>
  );
};

export default CheckerPage;
