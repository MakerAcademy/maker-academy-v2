import QuestionRenderer from "@components/AssessmentQuestions";
import GreenButton from "@components/buttons/GreenButton";
import { useAppSelector } from "@hooks/useRedux";
import { submitCompletedAssessment } from "@lib/assessment";
import { Box, Container, Stack } from "@mui/material";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useState } from "react";
import Progress from "./Progress";

const AssessmentPage = ({ assessment }) => {
  const [qnNumber, setQnNumber] = useState(0);
  const [answers, setAnswers] = useState({});

  const { profile } = useAppSelector((state) => state.profile);
  const { query } = useRouter();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

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
    setAnswers({ ...answers, [currentQuestion?.index]: _value });
  };

  const handleSubmit = async () => {
    const { courseId, docId } = query;

    // return console.log(answers);

    const _key = enqueueSnackbar("Submitting Assessment...", {
      variant: "default",
    });

    await submitCompletedAssessment(
      profile?.id,
      courseId,
      docId,
      assessment?.published,
      answers
    )
      .then(() => {
        closeSnackbar(_key);
        enqueueSnackbar("Success", {
          variant: "success",
          autoHideDuration: 2000,
          // onClose: () => Router.push("/app/studio"),
        });
      })
      .catch((err) => {
        enqueueSnackbar("Error", {
          variant: "error",
          autoHideDuration: 2000,
          // onClose: () => Router.push("/app/studio"),
        });
      });
  };

  return (
    <Box>
      <Container maxWidth="lg">
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{ minHeight: "70vh" }}
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
