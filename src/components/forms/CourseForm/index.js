import GreenButton from "@components/buttons/GreenButton";
import DashboardPaper from "@components/DashboardPaper";
import FormCheckbox from "@components/formFields/FormCheckbox";
import FormSelectField from "@components/formFields/FormSelectField";
import FormTextField from "@components/formFields/FormTextField";
import { BRAND, CONTENT_DIFFICULTY_LEVELS } from "@constants/";
import { yupResolver } from "@hookform/resolvers/yup";
import { Divider, Paper, Stack, Typography } from "@mui/material";
import { cleanObject } from "@utils/helpers";
import useTranslation from "next-translate/useTranslation";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import * as Yup from "yup";
import CourseCarriculum from "./Carriculum";

const CourseForm = ({
  handleSubmit: propsHandleSubmit,
  edit,
  values = {},
  user,
}) => {
  const [disabled, setDisabled] = useState(false);

  const { t } = useTranslation("creator-studio");

  // form validation rules
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    level: Yup.string().required("Required"),
    category: Yup.string().required("Required"),
    duration: Yup.string().required("Required"),
    carriculum: Yup.array().required("required"),
  });

  const formOptions = {
    resolver: yupResolver(validationSchema),
    defaultValues: values,
  };

  const { handleSubmit, reset, control, getValues, setValue } =
    useForm(formOptions);

  const onSubmit = (data, e) => {
    console.log(data);
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
      {/* Basic Information */}

      <DashboardPaper>
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
            disabled={disabled}
          />

          <FormTextField
            name="shortDescription"
            label="Short Description"
            control={control}
            fullWidth
            multiline
            rows={2}
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

          <Stack direction="row" spacing={2}>
            <FormSelectField
              name="level"
              label="Level"
              control={control}
              fullWidth
              disabled={disabled}
              options={CONTENT_DIFFICULTY_LEVELS}
            />

            <FormTextField
              name="category"
              label="Category"
              control={control}
              fullWidth
              disabled={disabled}
            />

            <FormTextField
              name="duration"
              label="Duration (minutes)"
              type="number"
              control={control}
              fullWidth
              disabled={disabled}
            />
          </Stack>
        </Stack>
      </DashboardPaper>

      {/* Carriculum */}
      <DashboardPaper>
        <CourseCarriculum control={control} name="carriculum" />

        {/* Submit */}
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
          />

          <FormSelectField
            name="brand"
            label="Brand"
            control={control}
            disabled={disabled}
            options={BRAND}
            fullWidth={false}
            sx={{ minWidth: 200 }}
          />

          <GreenButton type="submit">
            {edit ? t("edit_course") : t("create_new_course")}
          </GreenButton>
        </Stack>
      </DashboardPaper>
    </form>
  );
};

export default CourseForm;
