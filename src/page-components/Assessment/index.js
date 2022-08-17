import QuestionRenderer from "@components/AssessmentQuestions";
import GreenButton from "@components/buttons/GreenButton";
import { Box, Container, Stack } from "@mui/material";
import { useState } from "react";
import Progress from "./Progress";

const AssessmentPage = ({ assessment }) => {
  const [qnNumber, setQnNumber] = useState(0);
  const [answers, setAnswers] = useState({});

  const currentQuestion = assessment?.questions?.[qnNumber];
  const totalLength = assessment?.questions?.length;

  const nextQuestion = () => {
    if (qnNumber === totalLength - 1) return;

    setQnNumber(qnNumber + 1);
  };

  const previousQuestion = () => {
    if (qnNumber === 0) return;

    setQnNumber(qnNumber - 1);
  };

  const handleSave = (_value) => {
    setAnswers({ ...answers, [qnNumber]: _value });
  };

  const handleSubmit = () => {
    console.log(answers);
  };

  return (
    <Box>
      <Container maxWidth="lg">
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{ minHeight: "81vh" }}
          spacing={2}
        >
          <Progress
            questions={assessment?.questions}
            answers={answers}
            qnNumber={qnNumber}
          />

          <QuestionRenderer
            question={currentQuestion}
            handleSave={handleSave}
            nextQuestion={qnNumber < totalLength - 1 ? nextQuestion : null}
            previousQuestion={qnNumber !== 0 ? previousQuestion : null}
            answer={answers[qnNumber]}
          />

          <Box sx={{ pt: 5 }}>
            {qnNumber === totalLength - 1 ? (
              <Stack direction="row" spacing={2}>
                <GreenButton
                  variant="outlined"
                  sx={{ width: "100%", minWidth: { xs: 0, md: 150 } }}
                  onClick={previousQuestion}
                  disabled={qnNumber == 0}
                >
                  Previous
                </GreenButton>

                <GreenButton
                  sx={{ width: "100%", minWidth: { xs: 0, md: 150 } }}
                  onClick={handleSubmit}
                >
                  Submit
                </GreenButton>
              </Stack>
            ) : (
              <Stack direction="row" spacing={2}>
                <GreenButton
                  variant="outlined"
                  sx={{ width: "100%", minWidth: { xs: 0, md: 150 } }}
                  onClick={previousQuestion}
                  disabled={qnNumber == 0}
                >
                  Previous
                </GreenButton>

                <GreenButton
                  variant="outlined"
                  sx={{ width: "100%", minWidth: { xs: 0, md: 150 } }}
                  onClick={nextQuestion}
                  disabled={qnNumber === totalLength - 1}
                >
                  Next
                </GreenButton>
              </Stack>
            )}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default AssessmentPage;
