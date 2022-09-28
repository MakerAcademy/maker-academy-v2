import Title from "@components/Title";
import { Button, Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const AssessmentRadio = ({
  question,
  options,
  handleChange,
  answer,
  index,
  submitted,
  correctAnswer,
}) => {
  const theme = useTheme();

  const handleClick = (item) => {
    if (submitted) return null;
    handleChange?.(index, item);
  };

  return (
    <Stack alignItems="center" spacing={{ xs: 4, md: 7 }}>
      <Stack
        spacing={1}
        sx={{
          textAlign: "center",
        }}
      >
        <Title
          variant={{ xs: "h5", md: "h3" }}
          sx={{
            fontWeight: "600!important",
            maxWidth: 800,
          }}
        >
          {question}
        </Title>
        <Typography>(Select One Answer)</Typography>
      </Stack>

      <Stack spacing={2}>
        {options?.map?.((item, i) => (
          <Button
            key={i}
            onClick={() => handleClick(item)}
            variant={answer === item ? "contained" : "outlined"}
            sx={{
              p: 2,
              border: `1px solid ${theme.palette.primary.main}`,
              borderRadius: "10px",
              color: answer === item ? "text.invert" : "inherit",
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

              {submitted && answer === item ? (
                correctAnswer === item ? (
                  <CheckCircleIcon fontSize="small" />
                ) : (
                  <CancelIcon fontSize="small" />
                )
              ) : null}

              {submitted && answer !== item && correctAnswer === item && (
                <CheckCircleIcon fontSize="small" />
              )}
            </Stack>
          </Button>
        ))}
      </Stack>
    </Stack>
  );
};

export default React.memo(AssessmentRadio);
