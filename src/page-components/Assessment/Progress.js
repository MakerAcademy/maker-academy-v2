import { Box, Stack, Typography } from "@mui/material";
import React from "react";

const Progress = ({ questions, answers, qnNumber }) => {
  return (
    <Stack justifyContent="center" alignItems="center">
      <Typography
        variant="caption"
        sx={{ textAlign: "center", pb: 2 }}
        color="grey.grey5"
      >
        Question {qnNumber + 1} / {questions?.length}
      </Typography>

      <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ maxWidth: 400 }}>
        {questions.map((_, i) => {
          const hasAnswer =
            answers?.[`${i}`] !== null && answers?.[`${i}`] !== undefined;

          return (
            <Box
              key={i}
              sx={(theme) => ({
                height: 7,
                width: 22,
                borderRadius: "6px",
                backgroundColor:
                  qnNumber === i
                    ? "text.primary"
                    : hasAnswer
                    ? "primary.main"
                    : "grey.grey3",
              })}
            ></Box>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default Progress;
