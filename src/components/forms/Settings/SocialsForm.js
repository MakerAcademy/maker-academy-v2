import GreenButton from "@components/buttons/GreenButton";
import FormTextField from "@components/formFields/FormTextField";
import Title from "@components/Title";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Stack, Typography, useTheme } from "@mui/material";
import { cleanObject } from "@utils/helpers";
import { useForm, useWatch } from "react-hook-form";
import * as Yup from "yup";

const ProfileForm = ({ values, handleSubmit: propsHandleSubmit }) => {
  const theme = useTheme();

  // form validation rules
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Required"),
  });

  const formOptions = {
    resolver: yupResolver(validationSchema),
    defaultValues: values,
  };

  const hookForm = useForm(formOptions);
  const { handleSubmit, reset, control, getValues } = hookForm;

  const _image = useWatch({ control, name: "image" });

  const FieldLabel = ({ children }) => (
    <Typography sx={{ fontSize: 14, fontWeight: 300, mb: 1 }}>
      {children}
    </Typography>
  );

  const onSubmit = (data, e) => {
    // reset(); // reset after form submit
    propsHandleSubmit(cleanObject({ ...data }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Title variant="h6">Your Social Media</Title>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormTextField
            name="socials.publicEmail"
            label="Public Email"
            control={control}
            placeholder="abc@gmail.com"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormTextField
            name="socials.facebook"
            label="Facebook"
            control={control}
            placeholder="@colby_anderson"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormTextField
            name="socials.twitter"
            label="Twitter"
            control={control}
            placeholder="@colby_anderson"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormTextField
            name="socials.telegram"
            label="Telegram"
            control={control}
            placeholder="@colby_anderson"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormTextField
            name="socials.linkedin"
            label="LinkedIn"
            control={control}
            placeholder="@colby_anderson"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormTextField
            name="socials.other"
            label="Other Link"
            control={control}
            placeholder="https://www.yourwebsite.com"
          />
        </Grid>
      </Grid>

      <Stack alignItems="flex-end" spacing={2} sx={{ mt: 2 }}>
        <GreenButton
          variant="navbar"
          type="submit"
          sx={{
            minWidth: 200,
          }}
        >
          Update Profile
        </GreenButton>
      </Stack>
    </form>
  );
};

export default ProfileForm;
