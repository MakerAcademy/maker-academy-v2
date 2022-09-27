import Title from "@components/Title";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Button, Stack, Typography, useTheme } from "@mui/material";

const AssessmentCheckbox = ({
  question,
  options,
  handleChange,
  answer = [],
  submitted,
  correctAnswer,
  index,
}) => {
  const theme = useTheme();

  const handleClick = (item) => {
    if (submitted) return null;
    const _ans = answer?.includes?.(item)
      ? answer.filter((i) => i !== item)
      : [...answer, item];

    handleChange(index, _ans);
  };

  return (
    <Stack alignItems="center" spacing={{ xs: 4, md: 8 }}>
      <Title
        variant={{ xs: "h5", md: "h3" }}
        sx={{
          fontWeight: "600!important",
          textAlign: "center",
          maxWidth: 800,
        }}
      >
        {question}
      </Title>

      <Stack spacing={2}>
        {options?.map?.((item, i) => (
          <Button
            key={i}
            onClick={() => handleClick(item)}
            variant={answer?.includes(item) ? "contained" : "outlined"}
            // disabled={disabled}
            sx={{
              p: 2,
              border: `1px solid ${theme.palette.primary.main}`,
              borderRadius: "10px",
              color: answer?.includes(item) ? "text.invert" : "inherit",
              width: { xs: 250, sm: 350, md: 400 },
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={2}
            >
              <Typography
                sx={{
                  textAlign: "left",
                }}
              >
                {item}
              </Typography>

              {submitted && answer?.includes(item) ? (
                correctAnswer?.includes(item) ? (
                  <CheckCircleIcon fontSize="small" />
                ) : (
                  <CancelIcon fontSize="small" />
                )
              ) : null}

              {submitted &&
                !answer?.includes(item) &&
                correctAnswer?.includes(item) && (
                  <CheckCircleIcon fontSize="small" />
                )}
            </Stack>
          </Button>
        ))}
      </Stack>
    </Stack>
  );
};

export default AssessmentCheckbox;
