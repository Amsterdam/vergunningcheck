import { captureException } from "@sentry/browser";
import React, {
  Fragment,
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { Helmet } from "react-helmet";

import { TopicLayout } from "../components/Layouts";
import Loading from "../components/Loading";
import { LocationSection } from "../components/Location";
import { OutcomeSection } from "../components/Outcome";
import { QuestionSection } from "../components/Question";
import { StepByStepNavigation } from "../components/StepByStepNavigation";
import { DebugDecisionTable } from "../debug";
import { useChecker, useSlug, useTopic, useTopicData } from "../hooks";
import { SessionContext } from "../SessionContext";
import { SectionFunctions, SectionObject } from "../types";
import ErrorPage from "./ErrorPage";

const defaultSectionData = {
  index: 0,
  isActive: false,
  isCompleted: false,
};

const CheckerPage: FunctionComponent = () => {
  const { checker } = useChecker();

  const initialSections: SectionObject[] = [
    // Location Section:
    {
      ...defaultSectionData,
      component: (props) => {
        return <LocationSection {...props} />;
      },
    },
    // Question Section:
    {
      ...defaultSectionData,
      component: (props) => {
        return <QuestionSection {...props} />;
      },
    },
    // Outcome Section:
    {
      ...defaultSectionData,
      component: (props) => {
        return <OutcomeSection {...props} />;
      },
    },
  ];

  const sessionContext = useContext(SessionContext);
  const sectionsRef = React.useRef(initialSections);
  const [sections, updateSections] = useState(initialSections);
  const slug = useSlug();
  const { text } = useTopic();
  const { setTopicData, topicData } = useTopicData();
  const { timesLoaded, sectionData } = topicData;

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
    // Count the times the page is loaded
    setTopicData({
      timesLoaded: timesLoaded ? timesLoaded + 1 : 1,
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (checker) {
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
    const activeSection = sectionsRef.current.filter(
      (currentSection) => currentSection.isActive === true
    );
    if (!activeSection || activeSection.length !== 1) {
      // Always expect one section to be active
      const error = `"getActiveSectionIndex()": Expected one active section, got "${activeSection.length}"`;
      captureException(error);

      // Return the first index
      return 0;
    }
    return activeSection[0].index;
  };

  /**
   *
   * @param section - The section to activate
   * @param initialize - Only use when there's no active section yet
   */
  const changeActiveSection = (
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
      changeActiveSection(newSection);

      // The last section is always completed when activated
      if (isLastSection(newSection)) {
        completeSection(true, newSection);
      }
    } else {
      // Expect new section to exist
      const error = `"goToNextSection()": Failed going to next section, because "newSectionIndex" doesn't exist. Received: "${newSectionIndex}"`;
      captureException(error);
    }
  };

  // In case `topicData` is not found on the Session Context display an error
  // This is to prevent a bug when `topicData` is passing old data or when the Session Storage is manually deleted
  if (!sessionContext.session[slug]) {
    return <ErrorPage />;
  }

  const sectionFunctions: SectionFunctions = {
    changeActiveSection,
    completeSection,
    getNextSection,
    goToNextSection,
  };

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
            {sectionsRef.current.map(
              (section: SectionObject, computedIndex) => (
                <Fragment key={computedIndex}>
                  {section.component({
                    currentSection: section,
                    sectionFunctions,
                  })}
                </Fragment>
              )
            )}
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
