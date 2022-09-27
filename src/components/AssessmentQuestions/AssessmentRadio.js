import Title from "@components/Title";
import { Button, Stack, Typography, useTheme } from "@mui/material";
import React from "react";

const AssessmentRadio = ({
  question,
  options,
  handleChange,
  answer,
  index,
}) => {
  const theme = useTheme();

  const handleClick = (item) => {
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
            <Typography
              sx={{
                textAlign: "left",
              }}
            >
              {item}
            </Typography>
          </Button>
        ))}
      </Stack>
    </Stack>
  );
};

export default React.memo(AssessmentRadio);
