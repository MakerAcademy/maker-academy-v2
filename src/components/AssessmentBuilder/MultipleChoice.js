import FormFieldArray from "@components/formFields/FormFieldArray";
import FormTextField from "@components/formFields/FormTextField";
import { Button, Drawer, Stack, Typography } from "@mui/material";
import React, { useState } from "react";

const MultipleChoice = ({ control, name, ...other }) => {
  const [propsDrawer, setPropsDrawer] = useState(null);

  const toggleDrawer = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setPropsDrawer(true);
  };

  const RenderHeader = ({ append }) => {
    return (
      <Stack direction={{ xs: "column", md: "row" }}>
        <Typography variant="h6" sx={{ flex: 1 }}>
          Options
        </Typography>

        <Button onClick={() => append()}>Add Option</Button>
      </Stack>
    );
  };

  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={1}>
        {/* TODO - Props */}
        {/* <Button onClick={toggleDrawer}>Props</Button> */}
      </Stack>

      <FormFieldArray
        name={`${name}.options`}
        RenderHeader={RenderHeader}
        Elements={({ remove, index }) => (
          <FormTextField
            control={control}
            name={`${name}.options.${index}`}
            placeholder={`Option ${index + 1}`}
          />
        )}
        control={control}
        {...other}
      />

      <FormTextField
        control={control}
        name={`${name}.answer`}
        label="Correct Answer"
      />

      <Drawer
        anchor={"right"}
        open={propsDrawer}
        onClose={() => setPropsDrawer(null)}
        sx={{ minWidth: 300 }}
      >
        <Stack spacing={2} sx={{ p: 2 }}>
          <Typography>Props</Typography>
        </Stack>
      </Drawer>
    </Stack>
  );
};

export default MultipleChoice;
