import GreenButton from "@components/buttons/GreenButton";
import Title from "@components/Title";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";

const CustomProgress = ({ percentage }) => {
  return (
    <Box sx={{ position: "relative" }}>
      <CircularProgress
        variant="determinate"
        // disableShrink
        value={100}
        size={140}
        thickness={9}
        sx={{
          color: (theme) =>
            theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
        }}
      />
      <CircularProgress
        variant="determinate"
        sx={{
          animationDuration: "550ms",
          position: "absolute",
          left: 0,
        }}
        value={percentage}
        size={140}
        thickness={9}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Title sx={{ color: "primary.main" }}>{percentage}%</Title>
      </Box>
    </Box>
  );
};

const Completed = ({
  points,
  outOf,
  handleViewQuestionsClick,
  handleRetake,
  handleContinue,
}) => {
  const percentage = parseInt((points / outOf) * 100 || 0);
  const fullGrade = percentage === 100;

  return (
    <Container maxWidth="lg">
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "70vh", textAlign: "center" }}
        spacing={5}
      >
        {/* Progress */}
        <CustomProgress percentage={percentage} />

        <Title variant="h4">
          {fullGrade ? "Quiz Completed" : "Quiz Failed"}
        </Title>

        <Typography sx={{ whiteSpace: "pre-line" }}>
          {fullGrade
            ? "Congratulation! Your rewards is being processed, you can check your reward history for the status."
            : "To unlock the rewards for this course, you need to answer all questions correctly.\nPlease try again."}
        </Typography>

        {fullGrade && (
          <Stack spacing={1}>
            {handleContinue && (
              <GreenButton onClick={handleContinue}>
                Continue Course
              </GreenButton>
            )}
            <Button onClick={handleViewQuestionsClick}>View Questions</Button>
          </Stack>
        )}

        {!fullGrade && (
          <Stack spacing={1}>
            <GreenButton onClick={handleRetake}>Retake Quiz</GreenButton>
            {handleContinue && (
              <Button onClick={handleContinue}>Continue Course</Button>
            )}
          </Stack>
        )}
      </Stack>
    </Container>
  );
};

export default Completed;
