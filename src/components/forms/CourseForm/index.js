import GreenButton from "@components/buttons/GreenButton";
import DashboardPaper from "@components/DashboardPaper";
import FirebaseGallery from "@components/FirebaseGallery";
import FormCheckbox from "@components/formFields/FormCheckbox";
import FormDropzone from "@components/formFields/FormDropzone";
import FormSelectField from "@components/formFields/FormSelectField";
import FormTextField from "@components/formFields/FormTextField";
import { CONTENT_CATEGORIES } from "@constants/";
import { BRANDS, CONTENT_DIFFICULTY_LEVELS } from "@constants/";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Divider, Paper, Stack, Typography } from "@mui/material";
import { cleanObject } from "@utils/helpers";
import useTranslation from "next-translate/useTranslation";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import * as Yup from "yup";
import CourseCurriculum from "./Curriculum";
import LearningOutcomes from "./LearningOutcomes";

const CourseForm = ({
  handleSubmit: propsHandleSubmit,
  edit,
  values = { private: false },
  user,
}) => {
  const [disabled, setDisabled] = useState(false);

  const { t } = useTranslation("creator-studio");

  // form validation rules
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
    shortDescription: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    level: Yup.string().required("Required"),
    category: Yup.string().required("Required"),
    duration: Yup.number().required("Required"),
    curriculum: Yup.array().required("required"),
    learningOutcomes: Yup.array().required("required"),
  });

  const formOptions = {
    resolver: yupResolver(validationSchema),
    defaultValues: values,
  };

  const { handleSubmit, reset, control, getValues, setValue, formState } =
    useForm(formOptions);

  const onSubmit = (data, e) => {
    // return console.log(1, data);
    setDisabled(true);
    propsHandleSubmit(cleanObject(data));
  };

  // const handleDraftChange = ({ editor, markdown, html }) => {
  //   setValue("markdownValue", markdown);
  // };

  const _thumbnail = useWatch({ control, name: "thumbnail" });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Basic Information */}
      <DashboardPaper>
        <Stack spacing={3}>
          <Stack spacing={2}>
            <Typography sx={{ fontWeight: 600 }}>Basic Information</Typography>

            <Divider />
          </Stack>

          <Box>
            <FormDropzone
              name="thumbnail"
              label="Thumbnail"
              control={control}
              accept="image/*"
              restrict={{ type: "images", maxSize: 3 }}
              acceptedFilesTitle="(PNG or JPG no bigger than 3mb)"
              exists={!!_thumbnail}
            />

            <FirebaseGallery
              storageRef={"/app/course_thumbs"}
              handleSelect={(_url) => {
                setValue("thumbnail", _url);
              }}
              ButtonComponent={(_props) => (
                <Button {..._props}>Or click to select image</Button>
              )}
            />
          </Box>

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

            <FormSelectField
              name="category"
              label="Category"
              control={control}
              disabled={disabled}
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
              disabled={disabled}
            />
          </Stack>
        </Stack>
      </DashboardPaper>

      {/* Learning Outcomes */}
      <DashboardPaper>
        <LearningOutcomes control={control} />
      </DashboardPaper>

      {/* Curriculum */}
      <DashboardPaper>
        <CourseCurriculum control={control} name="curriculum" />

        {/* Submit */}
        <Stack
          justifyContent="flex-end"
          alignItems="flex-end"
          direction="row"
          spacing={2}
        >
          {/* <FormCheckbox
            name="private"
            control={control}
            options={["private"]}
            sx={{ width: "auto" }}
          /> */}

          <FormSelectField
            name="brand"
            label="Brand"
            control={control}
            disabled={disabled}
            options={BRANDS}
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
