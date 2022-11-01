import GreenButton from "@components/buttons/GreenButton";
import FormDropzone from "@components/formFields/FormDropzone";
import FormMarkdown from "@components/formFields/FormMarkdownOld";
import FormTextField from "@components/formFields/FormTextField";
import { yupResolver } from "@hookform/resolvers/yup";
import { Divider, Stack, Typography, useTheme } from "@mui/material";
import { cleanObject } from "@utils/helpers";
import useTranslation from "next-translate/useTranslation";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import * as Yup from "yup";

const StatusUpdatesForm = ({
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
    caption: Yup.string().required("Required"),
    // issue_type: Yup.string().required("Required"),
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
          <Typography sx={{ fontWeight: 600 }}>Status Update</Typography>

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

        <FormTextField
          name="caption"
          label="Caption"
          control={control}
          fullWidth
          disabled={disabled}
          multiline
          rows={2}
        />

        <FormMarkdown
          placeholder="Write your update..."
          name="description"
          control={control}
          disabled={disabled}
          removeComponents
          sx={{
            minHeight: 400,
            [theme.breakpoints.up("xl")]: {
              minHeight: 400,
            },
          }}
        />

        <FormTextField
          name="video_link"
          label="Video Link"
          control={control}
          fullWidth
          disabled={disabled}
        />

        <Stack
          justifyContent="flex-end"
          alignItems="flex-end"
          direction="row"
          spacing={2}
        >
          <GreenButton type="submit" disabled={disabled}>
            {edit ? t("edit_status_update") : t("create_new_status_update")}
          </GreenButton>
        </Stack>
      </Stack>
    </form>
  );
};

export default StatusUpdatesForm;
