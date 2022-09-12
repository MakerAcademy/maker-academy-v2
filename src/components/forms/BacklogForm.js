import GreenButton from "@components/buttons/GreenButton";
import FormSelectField from "@components/formFields/FormSelectField";
import FormTextField from "@components/formFields/FormTextField";
import { BACKLOG_TYPES } from "@constants/";
import { yupResolver } from "@hookform/resolvers/yup";
import { Divider, Stack, Typography, useTheme } from "@mui/material";
import { cleanObject } from "@utils/helpers";
import useTranslation from "next-translate/useTranslation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const BacklogForm = ({
  handleSubmit: propsHandleSubmit,
  edit,
  values = {},
}) => {
  const theme = useTheme();
  const [disabled, setDisabled] = useState(false);

  const { t } = useTranslation("about");

  // form validation rules
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    issue_type: Yup.string().required("Required"),
  });

  const formOptions = {
    resolver: yupResolver(validationSchema),
    defaultValues: values,
  };

  const { handleSubmit, reset, control, getValues, setValue } =
    useForm(formOptions);

  const onSubmit = (data, e) => {
    setDisabled(true);
    const isDraft = e?.nativeEvent?.submitter?.name === "draft";

    if (isDraft) {
      propsHandleSubmit(cleanObject(data), true);
    } else {
      propsHandleSubmit(cleanObject(data));
    }
  };

  //   const _image = useWatch({ control, name: "markdownValue" });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <Stack spacing={2}>
          <Typography sx={{ fontWeight: 600 }}>Submit your ticket</Typography>

          <Divider />
        </Stack>

        <FormTextField
          name="title"
          label="Title"
          control={control}
          fullWidth
          disabled={disabled}
        />

        <FormTextField
          name="description"
          label="Description"
          control={control}
          fullWidth
          multiline
          rows={5}
          disabled={disabled}
        />

        <FormSelectField
          name="issue_type"
          label="Issue Type"
          control={control}
          fullWidth
          disabled={disabled}
          options={BACKLOG_TYPES}
        />

        <Stack
          justifyContent="flex-end"
          alignItems="flex-end"
          direction="row"
          spacing={2}
        >
          <GreenButton type="submit" disabled={disabled}>
            {edit ? t("edit_ticket") : t("create_new_ticket")}
          </GreenButton>
        </Stack>
      </Stack>
    </form>
  );
};

export default BacklogForm;
