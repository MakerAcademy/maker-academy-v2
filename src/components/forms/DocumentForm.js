import GreenButton from "@components/buttons/GreenButton";
import FormCheckbox from "@components/formFields/FormCheckbox";
import FormMarkdown from "@components/formFields/FormMarkdown";
import FormSelectField from "@components/formFields/FormSelectField";
import FormTextField from "@components/formFields/FormTextField";
import { CONTENT_CATEGORIES } from "@constants/";
import { BRANDS, CONTENT_DIFFICULTY_LEVELS } from "@constants/";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { cleanObject } from "@utils/helpers";
import useTranslation from "next-translate/useTranslation";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import * as Yup from "yup";

const DocumentForm = ({
  handleSubmit: propsHandleSubmit,
  edit,
  values = { private: false },
  editableFields,
}) => {
  const [disabled, setDisabled] = useState(false);

  const isEditable = (_name) => {
    if (!editableFields?.length) return true;

    if (editableFields?.includes(_name)) return true;

    return false;
  };

  const { t } = useTranslation("creator-studio");

  // form validation rules
  const validationSchema = Yup.object().shape({
    // title: Yup.string().required("Required"),
    // description: Yup.string().required("Required"),
    // level: Yup.string().required("Required"),
    // category: Yup.string().required("Required"),
    // duration: Yup.string().required("Required"),
    // markdown: Yup.string().required("Required"),
  });

  const formOptions = {
    resolver: yupResolver(validationSchema),
    defaultValues: values,
  };

  const { handleSubmit, reset, control, getValues, setValue } =
    useForm(formOptions);

  const onSubmit = (data, e) => {
    setDisabled(true);
    propsHandleSubmit(cleanObject(data));
  };

  // const handleDraftChange = ({ editor, markdown, html }) => {
  //   setValue("markdownValue", markdown);
  // };

  const _image = useWatch({ control, name: "markdownValue" });

  // console.log(_image);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Stack spacing={2}>
          <Typography sx={{ fontWeight: 600 }}>Basic Information</Typography>

          <Divider />
        </Stack>

        <FormTextField
          name="title"
          label="Title"
          control={control}
          fullWidth
          disabled={!isEditable("title") || disabled}
        />

        <FormTextField
          name="shortDescription"
          label="Short Description"
          control={control}
          fullWidth
          multiline
          rows={2}
          disabled={!isEditable("shortDescription") || disabled}
        />

        <FormTextField
          name="description"
          label="Description"
          control={control}
          fullWidth
          multiline
          rows={5}
          disabled={!isEditable("description") || disabled}
        />

        <Stack direction="row" spacing={2}>
          <FormSelectField
            name="level"
            label="Level"
            control={control}
            fullWidth
            disabled={!isEditable("level") || disabled}
            options={CONTENT_DIFFICULTY_LEVELS}
          />

          <FormSelectField
            name="category"
            label="Category"
            control={control}
            disabled={!isEditable("category") || disabled}
            options={CONTENT_CATEGORIES}
            fullWidth={false}
            sx={{ width: "100%", minWidth: 200 }}
          />

          <FormTextField
            name="duration"
            label="Duration (minutes)"
            type="number"
            control={control}
            fullWidth
            disabled={!isEditable("duration") || disabled}
          />
        </Stack>

        <FormMarkdown
          placeholder="Write your document content here..."
          name="markdown"
          control={control}
          disabled={!isEditable("markdown") || disabled}
        />

        <Stack
          justifyContent="flex-end"
          alignItems="flex-end"
          direction="row"
          spacing={2}
        >
          <FormCheckbox
            name="private"
            control={control}
            options={["private"]}
            sx={{ width: "auto" }}
            disabled={!isEditable("private") || disabled}
          />

          <FormSelectField
            name="brand"
            label="Brand"
            control={control}
            disabled={!isEditable("brand") || disabled}
            options={BRANDS}
            fullWidth={false}
            sx={{ minWidth: 200 }}
          />

          <GreenButton type="submit" disabled={disabled}>
            {edit ? t("edit_document") : t("create_new_document")}
          </GreenButton>
        </Stack>
      </Stack>
    </form>
  );
};

export default DocumentForm;
