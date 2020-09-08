import React from "react";

import Question from "../sttr_client/models/question";

type State = {
  active: boolean;
  finished: boolean;
  checked: boolean;
};

type StepData = {
  data?: any;
  state: State;
  title?: string;
};

type Step = {
  isCompleted(): boolean;
};

type SectionData = {
  renderer: React.FC;
  steps: StepData[];
  title?: string;
  state: State;
};

type Section = {
  isCompleted(): boolean;
  renderer: React.FC;
  steps: StepData[];
  title?: string;
  state: State;
};

class Stepper {
  sectionIndex: number = 0;
  stepIndex: number = 0;
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
  nextSection() {}
  nextStep() {}
}

export default () => {
  type StepProps = {
    children: React.ReactNode;
    title?: string;
    state: State;
    step: Step;
  };
  const Step: React.FC<StepProps> = ({ children, title, state, step }) => (
    <>
      {state.finished && <i title="chevron" />}
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
  }) => (
    <Step {...{ props }}>
      <button onClick={props.step.data.question.setAnswer("bla")} />
      {props.state.finished && !props.state.active && (
        <a onClick={activateSelf}>wijzig</a>
      )}

      <a onClick={prev}>Vorige vraag</a>
      <a onClick={next}>Volgende vraag</a>
      <a>Naar conclusie</a>
    </Step>
  );

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
          activeIndex++;
        };
        return <QuestionStep question={step.data.question} next={next} />;
      },
      steps: [
        { title: "Vraag 1", data: { question: {} } },
        { title: "Vraag 2" },
        { title: "Vraag 3" },
      ],
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

            {section.steps.map((step, index) => {
              <section.renderer
                next={() => {}}
                prev={() => {}}
                {...{ finished, active, checked }}
              />;
            })}
          </NavItem>
        );
      })}
      )
    </nav>
  );
};
