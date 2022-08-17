import React from "react";
import AssessmentCheckbox from "./AssessmentCheckbox";
import AssessmentRadio from "./AssessmentRadio";

const QuestionRenderer = ({ question, ...other }) => {
  const type = question.type;
  const RenderedComponent = QuestionRenderer.type[type];

  if (RenderedComponent) {
    return <RenderedComponent {...question} {...other} />;
  }
};

QuestionRenderer.type = {
  radio: AssessmentRadio,
  checkbox: AssessmentCheckbox,
};

export default QuestionRenderer;
