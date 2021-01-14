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
import { SectionFunctions, SectionObject } from "../types";
import ErrorPage from "./ErrorPage";

const defaultSectionData = {
  hideSection: false,
  index: 0,
  isActive: false,
  isCompleted: false,
};

const CheckerPage: FunctionComponent = () => {
  const { checker } = useChecker();
  const hasDataNeeds = !!getDataNeed(checker);
  const { t } = useTranslation();

  // Show the Location Section only when required by `hasDataNeeds`
  const skipLocationSection = !!(checker && !hasDataNeeds);

  // Show the Question Section only when it has questions to render
  const skipQuestionSection = !!(
    checker &&
    checker.stack.length === 0 &&
    checker._getUpcomingQuestions().length === 0
  );

  const defaultSections: SectionObject[] = [
    // Location Section:
    {
      ...defaultSectionData,
      component: (props) => {
        return <LocationSection {...props} />;
      },
      heading: t("location.address.heading"), // Add an alternative heading here when adding the map
      hideSection: skipLocationSection,
    },
    // Question Section:
    {
      ...defaultSectionData,
      component: (props) => {
        return <QuestionSection {...props} />;
      },
      heading: t("question.heading"),
      hideSection: skipQuestionSection,
      renderOutsideWrapper: true,
    },
    // Outcome Section:
    {
      ...defaultSectionData,
      component: (props) => {
        return <OutcomeSection {...props} />;
      },
      heading: t("outcome.heading"),
    },
  ];

  const sessionContext = useContext(SessionContext);
  const sectionsRef = React.useRef(defaultSections);
  const [sections, updateSections] = useState(defaultSections);
  const slug = useSlug();
  const { text } = useTopic();
  const { setTopicData, topicData } = useTopicData();
  const { address, timesCheckerLoaded, sectionData } = topicData;

  useEffect(() => {
    // Next to the useState hook, we also need the useRef hook to make sure the state is always up to date
    // See: https://stackoverflow.com/a/58877875
    sectionsRef.current = sections;
  }, [sections]);

  const setSectionData = (sections: SectionObject[]) => {
    const newSections = [...sections];

    updateSections(newSections);

    setTopicData({
      sectionData: sections.map(({ index, isActive, isCompleted }) => ({
        index,
        isActive,
        isCompleted,
      })),
    });
  };

  useEffect(() => {
    // Count the times the checker is loaded
    setTopicData({
      timesCheckerLoaded: timesCheckerLoaded + 1,
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (checker) {
      // Potentially restore new sections from session
      const restoreTopicData =
        sectionData.length === defaultSections.length &&
        sectionData.filter((s) => s.isActive).length === 1;

      // Initialize new sections
      defaultSections.map((section, index) => {
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

      // Autocomplete the location section in case a new checker with data needs was started with a stored address
      if (address && hasDataNeeds && !sectionData.length) {
        // Complete the location section
        defaultSections[0].isActive = false;
        defaultSections[0].isCompleted = true;
        // Activate the question section
        defaultSections[1].isActive = true;
      }

      setSectionData(defaultSections);
    }

    // Prevent linter to add all dependencies, now the useEffect is only called when `checker` updates
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checker]);

  const getActiveSectionIndex = () => {
    const activeSection = sectionsRef.current.filter(
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

  /**
   *
   * @param section - The section to activate
   * @param initialize - Only use when there's no active section yet
   */
  const activateSection = (
    section: SectionObject,
    initialize: boolean = false
  ) => {
    let newSections = [...sectionsRef.current];

    if (!initialize) {
      // Deactivate current active section
      newSections[getActiveSectionIndex()].isActive = false;
    }

    // Mark new section as active
    newSections[section.index].isActive = true;

    setSectionData(newSections);
  };

  /**
   *
   * @param state - Pass a boolean to (in)complete the section (optional - default: true)
   * @param section - Pass a specific section to complete or by default it completes the active section. (optional)
   */
  const completeSection = (
    state: boolean = true,
    section: SectionObject | null = null
  ) => {
    let newSections = [...sectionsRef.current];

    if (section) {
      // Mark specific section as complete
      newSections[section.index].isCompleted = state;
    } else {
      // Mark current section as complete || as state
      newSections[getActiveSectionIndex()].isCompleted = state;
    }
    setSectionData(newSections);
  };

  const getNextSection = () =>
    sectionsRef.current[getActiveSectionIndex() + 1]
      ? sectionsRef.current[getActiveSectionIndex() + 1]
      : null;

  const isLastSection = (section: SectionObject) =>
    section.index === sectionsRef.current.length - 1;

  const goToNextSection = () => {
    const newSectionIndex = getActiveSectionIndex() + 1;
    const newSection = sectionsRef.current[newSectionIndex];

    if (newSection) {
      completeSection();
      activateSection(newSection);

      // The last section is always completed when activated
      if (isLastSection(newSection)) {
        completeSection(true, newSection);
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
    const newSection = sectionsRef.current[newSectionIndex];

    if (newSection) {
      activateSection(newSection);
    } else {
      // Expect new section to exist
      throw new Error(
        `"goToPrevSection()": Failed going to prev section, because "newSectionIndex" doesn't exist. Received: "${newSectionIndex}"`
      );
    }
  };

  // In case `topicData` is not found on the Session Context display an error
  // This is to prevent a bug when `topicData` is passing old data or when the Session Storage is manually deleted
  if (!sessionContext.session[slug]) {
    return <ErrorPage />;
  }

  const sectionFunctions: SectionFunctions = {
    activateSection,
    completeSection,
    getNextSection,
    goToNextSection,
    goToPrevSection,
  };

  // @TODO: refactor this style
  const activeStyle = { marginTop: -1, borderColor: "white" };

  const sectionsRenderer = () =>
    sectionsRef.current.map((section, computedIndex) => {
      const {
        isActive,
        isCompleted,
        component,
        heading,
        hideSection,
        renderOutsideWrapper,
      } = section;

      if (hideSection) {
        // Skip to the next section if the section to be hidden is active
        if (isActive) {
          goToNextSection();
        }
        return null;
      }

      const componentToRender =
        component &&
        component({
          currentSection: section,
          sectionFunctions,
        });

      const needsOnClick = isLastSection(section) && isCompleted && !isActive;
      const handleOnClick = needsOnClick
        ? () => activateSection(section)
        : false;

      return (
        <Fragment key={computedIndex}>
          <StepByStepItem
            active={renderOutsideWrapper ? false : isActive}
            as="div"
            checked={isCompleted}
            customSize
            done={renderOutsideWrapper && isActive}
            highlightActive={!renderOutsideWrapper}
            key={computedIndex}
            largeCircle
            onClick={handleOnClick}
            style={isLastSection(section) ? activeStyle : {}}
            {...{ heading }}
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
        <>
          <StepByStepNavigation
            disabledTextColor="inherit"
            doneTextColor="inherit"
            lineBetweenItems
          >
            {sectionsRenderer()}
          </StepByStepNavigation>
          <DebugDecisionTable />
        </>
      ) : (
        <Loading />
      )}
    </TopicLayout>
  );
};

export default CheckerPage;
