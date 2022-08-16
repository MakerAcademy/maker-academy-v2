import FormFieldArray from "@components/formFields/FormFieldArray";
import FormTextField from "@components/formFields/FormTextField";
import { Button, Paper, Stack, Typography, useTheme } from "@mui/material";
import React from "react";

const RenderHeader = ({ append }) => {
  return (
    <Stack direction={{ xs: "column", md: "row" }}>
      <Typography variant="h6" sx={{ flex: 1 }}>
        Learning Outcomes
      </Typography>

      <Button onClick={() => append()}>Add</Button>
    </Stack>
  );
};

const RenderListItem = (_props) => {
  const theme = useTheme();
  const { remove, index, control, name } = _props;

  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: theme.palette.background.grey1,
        width: "100%",
      }}
    >
      <FormTextField
        name={`learningOutcomes[${index}]`}
        label={`Outcome ${index + 1}`}
        control={control}
        fullWidth
      />
    </Paper>
  );
};

const LearningOutcomes = ({ control, name }) => {
  return (
    <FormFieldArray
      control={control}
      name="learningOutcomes"
      RenderHeader={RenderHeader}
      Elements={(_props) => RenderListItem({ control, name, ..._props })}
    />
  );
};

export default LearningOutcomes;
