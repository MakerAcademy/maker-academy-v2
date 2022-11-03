import GreenButton from "@components/buttons/GreenButton";
import FormDropzone from "@components/formFields/FormDropzone";
import FormMarkdown from "@components/formFields/FormMarkdown";
import FormSelectField from "@components/formFields/FormSelectField";
import FormTextField from "@components/formFields/FormTextField";
import { BACKLOG_TYPES } from "@constants/";
import { BACKLOG_PRIORITIES } from "@constants/index";
import { yupResolver } from "@hookform/resolvers/yup";
import { Divider, Stack, Typography, useTheme } from "@mui/material";
import { cleanObject } from "@utils/helpers";
import useTranslation from "next-translate/useTranslation";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
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

  const _thumbnail = useWatch({ control, name: "thumbnail" });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <Stack spacing={2}>
          <Typography sx={{ fontWeight: 600 }}>Submit your ticket</Typography>

          <Divider />
        </Stack>

        <FormDropzone
          name="thumbnail"
          label="Thumbnail"
          control={control}
          accept="image/*"
          restrict={{ type: "images", maxSize: 3 }}
          acceptedFilesTitle="(PNG or JPG no bigger than 3mb)"
          exists={!!_thumbnail}
        />

        <FormTextField
          name="title"
          label="Title"
          control={control}
          fullWidth
          disabled={disabled}
        />

        <FormMarkdown
          placeholder="Write your issue/feature..."
          name="description"
          control={control}
          disabled={disabled}
          removeComponents
          sx={{
            minHeight: 300,
            [theme.breakpoints.up("xl")]: {
              minHeight: 300,
            },
          }}
        />

        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems="center"
          spacing={2}
        >
          <FormSelectField
            name="issue_type"
            label="Issue Type"
            control={control}
            fullWidth
            disabled={disabled}
            options={BACKLOG_TYPES}
            t={t}
          />

          <FormSelectField
            name="priority"
            label="Priority"
            control={control}
            fullWidth
            disabled={disabled}
            options={BACKLOG_PRIORITIES}
            t={t}
          />
        </Stack>

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
