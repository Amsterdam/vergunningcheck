import React from "react";

import ConclusionAlert from "../components/ConclusionAlert";
import Question from "../sttr_client/models/question";

type State = {
  active: boolean;
  checked: boolean;
  finished: boolean;
};

type StepData = {
  data?: any;
  state?: State;
  title?: string;
};

type Step = {
  isCompleted: Function;
};

type SectionData = {
  renderer: React.FC;
  steps: StepData[];
  title?: string;
  state: State;
};

type Section = {
  isCompleted: Function;
  renderer: React.FC;
  steps: StepData[];
  title?: string;
  state: State;
};

class Stepper {
  currentStep: number = 0;
  sectionIndex: number = 0;
  sectionStepIndex: number = 0;
  sections: (SectionData | Section)[] = [];

  constructor(sections: Section[]) {
    sections.forEach((section) => {
      section.steps.forEach((step) => {
        step.state = { finished: false, active: false, checked: false };
      });
      section.state = { finished: false, active: false, checked: false };
    });
    this.sections = sections;
  }
  next() {
    // @TODO: need to fix
  }
  getNext() {
    const allSteps: Array<object> = this.sections.flatMap((steps) => steps);
    const currentStepIndex = allSteps.indexOf(this.currentStep);
    return allSteps[currentStepIndex + 1];
  }
}

export default () => {
  const checker: Checker = useChecker();
  const [relevantQuestions, setRelevantQuestions] = React.useState(
    checker.relevantQuestions()
  );

  type StepProps = {
    children: React.ReactNode;
    title?: string;
    state: State;
    step: Step;
  };
  const Step: React.FC<StepProps> = ({ children, title, state, step }) => (
    <>
      {state.finished && <i title="chevron" />}
      <div style={{ color: stepper.getNext()?.finished ? "blue" : "gray" }}>
        |
      </div>

      <h1>
        {state.finished && !state.active ? (
          <a onClick={step.activateSelf}>{title}</a>
        ) : (
          { title }
        )}
      </h1>
      {children}
    </>
  );

  const LocationStep: React.FC<StepProps> = (props) => (
    <Step {...{ props }}>
      <p>{props.state.finished ? "gekozen adres" : "kies adres"}...</p>
    </Step>
  );

  const QuestionStep = ({
    prev,
    next,
    question,
    ...props
  }: {
    prev: any;
    next: any;
    question: Question;
    props: StepProps;
  }) => {
    const updateChecker = () =>
      setRelevantQuestions(checker.getRelevantQuestions());

    return (
      <Step {...{ props }}>
        {props.state.active && (
          <button onClick={props.step.data.question.setAnswer("bla")} />
        )}
        {props.state.finished && !props.state.active && (
          <a onClick={activateSelf}>wijzig</a>
        )}

        {/* We need to think about what happens if this question is causing multiple permits */}
        {/* Do we show multiple Alerts? */}
        {checker.isQuestionCausingPermit(question) && (
          <ConclusionAlert
            questionNeedsContactExit={checker.hasContactConclusion()}
          >
            {checker.isConclusive() && <a>Naar conclusie</a>}
          </ConclusionAlert>
        )}

        <a
          onClick={() => {
            updateChecker();
            stepper.prev();
          }}
        >
          {checker.isFirstQuestion(question) ? `Vorige vraag` : `Ga terug`}
        </a>
        <a
          onClick={() => {
            updateChecker();
            stepper.next();
          }}
        >
          {checker.isLastQuestion(question)
            ? `Naar Conclusie`
            : `Volgende vraag`}
        </a>
      </Step>
    );
  };

  const ConclusionStep = ({ state }: { state: State }) => (
    <Step {...{ state }}>Conclusie....</Step>
  );

  const sections: Section[] = [
    {
      renderer: LocationStep,
      steps: [{ title: "Address" }],
    },
    {
      title: "Vragen",
      isCompleted: () => {
        // if current question is not answered ... error ...
        // check outcomes, if contact ... if ...
        return;
      },
      renderer: ({ step }) => {
        const next = () => {
          // if current question is not answered ... error ...
          // check outcomes, if contact ... if ...
          this.sectionStepIndex++;
        };
        return <QuestionStep question={step.data.question} next={next} />;
      },
      steps: relevantQuestions,
    },
    {
      renderer: ConclusionStep,
      steps: [{ title: "Conclusie" }],
    },
  ];

  const stepper = new Stepper(sections);

  const NavItem = ({ state }: { state: State }) => <div></div>;
  return (
    <nav>
      {stepper.sections.map((section) => {
        return (
          <NavItem {...section.state}>
            {section.title && <h1>{section.title}</h1>}

            {section.steps.map((step) => (
              <section.renderer
                next={() => {}}
                prev={() => {}}
                {...{ finished, active, checked }}
              />
            ))}
          </NavItem>
        );
      })}
      )
    </nav>
  );
};
