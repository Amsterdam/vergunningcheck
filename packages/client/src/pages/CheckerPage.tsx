import React, {
  Fragment,
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

import { TopicLayout } from "../components/Layouts";
import Loading from "../components/Loading";
import { LocationSection } from "../components/Location";
import { OutcomeSection } from "../components/Outcome";
import { QuestionSection } from "../components/Question";
import {
  StepByStepItem,
  StepByStepNavigation,
} from "../components/StepByStepNavigation";
import { getDataNeed } from "../config/autofill";
import { DebugDecisionTable } from "../debug";
import { useChecker, useSlug, useTopic, useTopicData } from "../hooks";
import { SessionContext } from "../SessionContext";
import { SectionData } from "../types";
import ErrorPage from "./ErrorPage";

export type SectionProps = {
  currentSection?: any;
  sectionFunctions?: any;
};

type SectionObjectProps = SectionData & {
  component?: (props: SectionProps) => {};
  heading?: string;
  renderOutsideWrapper?: boolean;
};

const defaultSectionData = {
  index: 0,
  isActive: false,
  isCompleted: false,
};

const CheckerPage: FunctionComponent = () => {
  const { checker } = useChecker();
  const hasDataNeeds = !!getDataNeed(checker);
  const { t } = useTranslation();

  const defaultSections: SectionObjectProps[] = [
    {
      ...defaultSectionData,
      component: (props) => {
        return <QuestionSection {...props} />;
      },
      heading: t("question.heading"),
      renderOutsideWrapper: true,
    },
    {
      ...defaultSectionData,
      component: (props) => {
        return <OutcomeSection {...props} />;
      },
      heading: t("outcome.heading"),
    },
  ];
  const locationSection: SectionObjectProps[] = [
    {
      ...defaultSectionData,
      component: (props) => {
        return <LocationSection {...props} />;
      },
      heading: t("location.address.heading"), // Add an alternative heading here when adding the map
    },
  ];

  const sessionContext = useContext(SessionContext);
  const [sections, updateSections] = useState(defaultSections);
  const slug = useSlug();
  const { text } = useTopic();
  const { setTopicData, topicData } = useTopicData();
  const { sectionData } = topicData;

  const setSectionData = (sections: SectionObjectProps[]) => {
    updateSections(sections);

    setTopicData({
      sectionData: sections.map(({ index, isActive, isCompleted }) => ({
        index,
        isActive,
        isCompleted,
      })),
    });
  };

  useEffect(() => {
    if (checker) {
      // Add location section if required by `hasDataNeeds`
      let initialSections: SectionObjectProps[] = hasDataNeeds
        ? [...locationSection, ...defaultSections]
        : [...sections];

      // Potentially restore new sections from session
      const restoreTopicData =
        sectionData.length === initialSections.length &&
        sectionData.filter((s) => s.isActive).length === 1;

      // Initialize new sections
      initialSections.map((section, index) => {
        // Reorder the indexes (in case sections have been added)
        section.index = index;

        if (restoreTopicData) {
          // Restore sectionData from session
          section.isActive = sectionData[index].isActive;
          section.isCompleted = sectionData[index].isCompleted;
        } else {
          // Set the first section active
          section.isActive = index === 0;
          // Set all sections incomplete
          section.isCompleted = false;
        }

        return section;
      });

      setSectionData(initialSections);
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

  // @TODO: change to setActive
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

    setSectionData(newSections);
  };

  // @TODO: change to setCompleted
  const complete = (
    state: null | boolean = null,
    section: SectionObjectProps | null = null
  ) => {
    let newSections = [...sections];
    const newState = state === null ? true : state;

    if (section) {
      // Mark specific section as complete
      newSections[section.index].isCompleted = newState;
    } else {
      // Mark current section as complete || as state
      newSections[getActiveSectionIndex()].isCompleted = newState;
    }
    setSectionData(newSections);
  };

  const getNextSection = () =>
    sections[getActiveSectionIndex() + 1]
      ? sections[getActiveSectionIndex() + 1]
      : null;

  // @TODO: change to getLastSection
  const isLastSection = (section: SectionObjectProps) =>
    section.index === sections.length - 1;

  const goToNextSection = () => {
    const newSectionIndex = getActiveSectionIndex() + 1;
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

  // Check if a future section is completed
  const hasFutureCompletedSections = (
    section: SectionObjectProps = getActiveSection()
  ) =>
    sections
      .filter((s) => s.isCompleted)
      .map((s) => s.index)
      .pop() || -1 > section.index;

  // In case `topicData` is not found on the Session Context display an error
  // This is to prevent a bug when `topicData` is passing old data or when the Session Storage is manually deleted
  if (!sessionContext.session[slug]) {
    return <ErrorPage />;
  }

  const sectionFunctions = {
    activate,
    complete,
    getNextSection,
    goToNextSection,
    goToPrevSection,
  };

  const sectionsRenderer = () =>
    sections.map((section, computedIndex) => {
      const {
        isActive: active,
        isCompleted: checked,
        component,
        heading,
        renderOutsideWrapper,
      } = section;

      const componentToRender =
        component &&
        component({
          currentSection: section,
          sectionFunctions,
        });

      return (
        <Fragment key={computedIndex}>
          <StepByStepItem
            customSize
            // `done` is a state when a future section is completed but the active section is not completed
            done={hasFutureCompletedSections(section)}
            // @TODO: highlight the Questions Section Wrapper only when the first question is active
            highlightActive={!renderOutsideWrapper}
            largeCircle
            key={computedIndex}
            {...{ active, checked, heading }}
          >
            {!renderOutsideWrapper && componentToRender}
          </StepByStepItem>
          {renderOutsideWrapper && componentToRender}
        </Fragment>
      );
    });

  return (
    <TopicLayout>
      <Helmet>
        <title>Vragen en uitkomst - {text.heading}</title>
      </Helmet>

      {checker ? (
        <StepByStepNavigation
          disabledTextColor="inherit"
          doneTextColor="inherit"
          lineBetweenItems
        >
          {sectionsRenderer()}
        </StepByStepNavigation>
      ) : (
        <Loading />
      )}

      <DebugDecisionTable />
    </TopicLayout>
  );
};

export default CheckerPage;
