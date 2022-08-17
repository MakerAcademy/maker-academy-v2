import GreenButton from "@components/buttons/GreenButton";
import Title from "@components/Title";
import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";

const AssessmentCheckbox = ({ question, options, handleSave, answer = [] }) => {
  const theme = useTheme();
  const [value, setValue] = useState(answer || []);

  const handleClick = (item) => {
    if (value?.includes?.(item)) {
      setValue(value.filter((i) => i !== item));
    } else {
      setValue([...value, item]);
    }
  };

  useEffect(() => {
    handleSave?.(value?.length ? value : null);
  }, [value]);

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
            alignItems="center"
            justifyContent="center"
            key={i}
            onClick={() => handleClick(item)}
            variant={value?.includes(item) ? "contained" : "outlined"}
            sx={{
              p: 2,
              border: `1px solid ${theme.palette.primary.main}`,
              borderRadius: "10px",
              color: value?.includes(item) ? "text.invert" : "inherit",
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

export default AssessmentCheckbox;
