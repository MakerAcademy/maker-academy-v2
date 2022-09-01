import AssessmentBuilder from "@components/AssessmentBuilder";
import DashboardPaper from "@components/DashboardPaper";
import FormSelectField from "@components/formFields/FormSelectField";
import FormTextField from "@components/formFields/FormTextField";
import { CONTENT_CATEGORIES, CONTENT_DIFFICULTY_LEVELS } from "@constants/";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { cleanObject } from "@utils/helpers";
import useTranslation from "next-translate/useTranslation";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import * as Yup from "yup";
import QuestionTypes from "./QuestionTypes";
import DeleteIcon from "@mui/icons-material/Delete";
import FormFieldArray from "@components/formFields/FormFieldArray";
import GreenButton from "@components/buttons/GreenButton";

export const ASSESSMENT_QUESTION_TYPES = [
  "radio",
  "checkbox",
  "text",
  // "file",
];

const RenderListItem = (_props) => {
  const theme = useTheme();
  const { remove, index, control, disabled, _questions } = _props;

  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: theme.palette.background.grey1,
        width: "100%",
        p: 2,
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ width: "100%" }}
        spacing={4}
        alignItems="flex-start"
      >
        <Stack spacing={2} sx={{ width: "100%" }}>
          <FormTextField
            name={`questions[${index}].question`}
            label="Question"
            control={control}
            fullWidth
            disabled={disabled}
          />

          <FormSelectField
            name={`questions[${index}].type`}
            label="Question Type"
            control={control}
            fullWidth
            disabled={disabled}
            options={ASSESSMENT_QUESTION_TYPES}
          />

          <AssessmentBuilder
            control={control}
            type={_questions[index]?.type}
            name={`questions[${index}]`}
          />
        </Stack>

        <IconButton onClick={() => remove(index)} size="small">
          <DeleteIcon />
        </IconButton>
      </Stack>
    </Paper>
  );
};

const AssessmentForm = ({
  handleSubmit: propsHandleSubmit,
  edit,
  values = { private: false },
  user,
}) => {
  const theme = useTheme();
  const [disabled, setDisabled] = useState(false);

  const { t } = useTranslation("creator-studio");

  // form validation rules
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    level: Yup.string().required("Required"),
    category: Yup.string().required("Required"),
    duration: Yup.number().required("Required"),
    questions: Yup.array().required("required"),
  });

  const formOptions = {
    resolver: yupResolver(validationSchema),
    defaultValues: values,
  };

  const { handleSubmit, reset, control, getValues, setValue } =
    useForm(formOptions);

  const onSubmit = (data, e) => {
    // setDisabled(true);
    propsHandleSubmit(cleanObject(data));
  };

  // const handleDraftChange = ({ editor, markdown, html }) => {
  //   setValue("markdownValue", markdown);
  // };

  const _image = useWatch({ control, name: "markdownValue" });
  const _questions = useWatch({ control, name: "questions" }) || [];

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
            name="description"
            label="Description"
            control={control}
            fullWidth
            multiline
            rows={3}
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

      {/* Questions */}
      <DashboardPaper>
        <Stack spacing={2}>
          <Typography sx={{ fontWeight: 600 }}>Questions</Typography>
          <Divider />
        </Stack>

        <FormFieldArray
          control={control}
          name="questions"
          RenderHeader={({ append }) => <QuestionTypes append={append} />}
          Elements={(_props) =>
            RenderListItem({ control, disabled, _questions, ..._props })
          }
        />

        <Stack
          justifyContent="flex-end"
          alignItems="flex-end"
          direction="row"
          spacing={2}
          sx={{ mt: 2 }}
        >
          <GreenButton type="submit">
            {edit ? t("edit_assessment") : t("create_new_assessment")}
          </GreenButton>
        </Stack>
      </DashboardPaper>
    </form>
  );
};

export default AssessmentForm;
