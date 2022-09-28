import QuestionRenderer from "@components/AssessmentQuestions";
import GreenButton from "@components/buttons/GreenButton";
import { useAppSelector } from "@hooks/useRedux";
import {
  getAssessmentAnswers,
  listenUsersSubmittedAssessment,
  retakeAssessment,
  submitCompletedAssessment,
} from "@lib/assessment";
import { Box, Button, Container, Stack } from "@mui/material";
import { isArrayEqual } from "@utils/helperFunctions";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useEffect, useReducer, useState } from "react";
import Completed from "./Completed";
import Progress from "./Progress";

const reducer = (state, action) => {
  const _key = action.field;

  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        [_key]: action.payload,
      };
    case "CHANGE_ALL":
      return {
        ...action.payload,
      };

    default:
      return state;
  }
};

const AssessmentPage = ({ assessment }) => {
  const [viewQuestions, setViewQuestions] = useState(false);
  const [qnNumber, setQnNumber] = useState(0);
  const [answers, dispatch] = useReducer(reducer, {});
  const [correctAnswers, setCorrectAnswers] = useState({});
  const [submission, setSubmission] = useState(null);

  const { profile } = useAppSelector((state) => state.profile);

  const isSubmitted = profile?.submittedAssessments?.includes(assessment?.id);

  const { query } = useRouter();
  const { courseId, docId } = query;

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const currentQuestion = assessment?.questions?.[qnNumber];
  const totalLength = assessment?.questions?.length;

  // console.log(qnNumber);

  const nextQuestion = () => {
    if (qnNumber === totalLength - 1) return;

    setQnNumber(qnNumber + 1);
  };

  const previousQuestion = () => {
    if (qnNumber === 0) return;

    setQnNumber(qnNumber - 1);
  };

  const handleChange = (qn, _value) => {
    if (typeof qn !== "undefined" && typeof _value !== "undefined") {
      dispatch({
        type: "CHANGE",
        field: qn,
        payload: _value,
      });
    }

    // setAnswers({ ...answers, [currentQuestion?.index]: _value });
  };

  const handleSubmit = async () => {
    // return console.log(answers);

    const _key = enqueueSnackbar("Submitting Assessment...", {
      variant: "default",
    });

    await submitCompletedAssessment(
      profile?.id,
      courseId,
      docId,
      assessment?.published,
      answers,
      totalLength
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

  useEffect(() => {
    if (isSubmitted) {
      getAssessmentAnswers(assessment?.published).then((res) =>
        setCorrectAnswers(res.payload)
      );

      const unsub = listenUsersSubmittedAssessment(
        profile?.id,
        assessment?.id,
        (res) => {
          if (!res) return null;

          setSubmission(res);
          const _answers = res.answers?.reduce((acc, item) => {
            return { ...acc, [item.index]: item.answer };
          }, {});
          // setAnswers(_answers); FIX
          dispatch({
            type: "CHANGE_ALL",
            payload: _answers,
          });
        }
      );

      return () => {
        unsub();
      };
    }
  }, [isSubmitted]);

  if (isSubmitted && !viewQuestions) {
    const handleRetake = () => {
      retakeAssessment(profile?.id, docId);
    };

    return (
      <Completed
        points={submission?.totalPoints}
        outOf={submission?.outOf}
        handleViewQuestionsClick={() => setViewQuestions(true)}
        handleRetake={handleRetake}
      />
    );
  }

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
            answer={answers?.[qnNumber]}
            handleChange={handleChange}
            submitted={!!isSubmitted}
            correctAnswer={correctAnswers?.[qnNumber]?.answer}
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
                  onClick={() => (!isSubmitted ? handleSubmit() : null)}
                  disabled={!!isSubmitted}
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

          {isSubmitted && (
            <Button onClick={() => setViewQuestions(false)}>View Grades</Button>
          )}
        </Stack>
      </Container>
    </Box>
  );
};

export default AssessmentPage;
