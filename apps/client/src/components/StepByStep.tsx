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
  isCompleted?: Function;
};

type Section = {
  isCompleted?: Function;
  renderer: any;
  steps?: StepData[];
  title?: string;
  state?: State;
};

class Stepper {
  currentStep: number = 0;
  sectionIndex: number = 0;
  sectionStepIndex: number = 0;
  sections: Section[] = [];

  constructor(sections: Section[]) {
    sections.forEach((section) => {
      section.steps?.forEach((step) => {
        step.state = { finished: false, active: false, checked: false };
      });
      section.state = { finished: false, active: false, checked: false };
    });
    this.sections = sections;
  }
  activateSelf() {
    // do something to activite
  }
  getNext() {
    const allSteps: any = this.sections.flatMap((steps) => steps);
    const currentStepIndex = allSteps.indexOf(this.currentStep);
    return allSteps[currentStepIndex + 1];
  }
  next() {
    // do something to go to next section / item
  }
  prev() {
    // do something to go to prev section / item
  }
}

export default () => {
  // Temporary checker mock
  const checker = {
    getRelevantQuestions: () => [
      {
        title: "Vraag 1",
      },
      {
        title: "Vraag 2",
      },
    ],
    hasContactConclusion: () => true,
    isConclusive: () => true,
    isFirstQuestion: (question: any) => question,
    isLastQuestion: (question: any) => question,
    isQuestionCausingPermit: (question: any) => question,
    setAnswer: (value: any) => value,
  };

  const [relevantQuestions, setRelevantQuestions] = React.useState(
    checker.getRelevantQuestions()
  );

  type StepProps = {
    children: React.ReactNode;
    state: State;
    step?: Step;
    title?: string;
  };

  const Step: React.FC<StepProps> = ({ children, title, state, ...rest }) => {
    return (
      <>
        {state?.finished && <i title="chevron" />}
        <div style={{ color: stepper.getNext()?.finished ? "blue" : "gray" }}>
          |
        </div>

        <h1>
          {state?.finished && !state?.active ? (
            <a href="/" onClick={stepper.activateSelf}>
              {title}
            </a>
          ) : (
            title
          )}
        </h1>

        {children}
      </>
    );
  };

  const LocationStep: React.FC<StepProps> = ({ ...stepProps }) => {
    return (
      <Step {...{ ...stepProps }}>
        <p>{stepProps.state?.finished ? "gekozen adres" : "kies adres"}...</p>
      </Step>
    );
  };

  const QuestionStep = ({
    prev,
    next,
    question,
    state,
    title,
  }: {
    prev?: any;
    next?: any;
    question?: Question;
    state: State;
    title: string;
  }) => {
    const updateChecker = () => {
      setRelevantQuestions(checker.getRelevantQuestions());
    };

    return (
      <Step {...{ state, title }}>
        {state?.active && <button onClick={checker.setAnswer("bla")} />}
        {state?.finished && !state?.active && (
          <a href="/" onClick={stepper.activateSelf}>
            wijzig
          </a>
        )}

        {/* We need to think about what happens if this question is causing multiple permits */}
        {/* Do we show multiple Alerts? */}
        {checker.isQuestionCausingPermit(question) && (
          <ConclusionAlert
            questionNeedsContactExit={checker.hasContactConclusion()}
          >
            {checker.isConclusive() && <a href="/">Naar conclusie</a>}
          </ConclusionAlert>
        )}

        <a
          href="/"
          onClick={() => {
            updateChecker();
            stepper.prev();
          }}
        >
          {checker.isFirstQuestion(question) ? `Vorige vraag` : `Ga terug`}
        </a>
        <a
          href="/"
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

  const ConclusionStep: React.FC<StepProps> = ({ ...stepProps }) => {
    return <Step {...{ ...stepProps }}>Conclusie....</Step>;
  };

  const sections: Section[] = [
    {
      title: "Adresgegevens",
      renderer: LocationStep,
      // steps: [{ title: "Adresgegevens" }],
    },
    {
      title: "Vragen",
      isCompleted: () => {
        // if current question is not answered ... error ...
        // check outcomes, if contact ... if ...
        return;
      },
      // renderer: ({ step }) => {
      //   const next = () => {
      //     // if current question is not answered ... error ...
      //     // check outcomes, if contact ... if ...
      //     this.sectionStepIndex++;
      //   };
      //   return <QuestionStep question={step.data.question} next={next} />;
      // },
      renderer: QuestionStep,
      steps: relevantQuestions,
    },
    {
      title: "Conclusie",
      renderer: ConclusionStep,
      // steps: [{ title: "Conclusie" }],
    },
  ];

  const NavItem = ({
    children,
    state,
  }: {
    children: React.ReactNode;
    state?: State;
  }) => (
    <div>
      {state?.active ? "active" : "inactive"}
      {children}
    </div>
  );

  const stepper = new Stepper(sections);

  return (
    <nav>
      {stepper.sections.map((section) => {
        const { renderer: Renderer } = section;
        return (
          <NavItem {...section.state} key={section.title}>
            {section.title && <h1>{section.title}</h1>}

            {section.steps?.map((step) => {
              return (
                <Renderer
                  key={step.title}
                  // next={() => {}}
                  // prev={() => {}}
                  {...{ ...step }}
                />
              );
            })}
          </NavItem>
        );
      })}
    </nav>
  );
};
