import GreenButton from "@components/buttons/GreenButton";
import FormDropzone from "@components/formFields/FormDropzone";
import FormTextField from "@components/formFields/FormTextField";
import { yupResolver } from "@hookform/resolvers/yup";
import { uploadFile } from "@lib/storage";
import {
  Avatar,
  Divider,
  Grid,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { cleanObject } from "@utils/helpers";
import { useForm, useWatch } from "react-hook-form";
import * as Yup from "yup";

const ProfileForm = ({ values, handleSubmit: propsHandleSubmit }) => {
  const theme = useTheme();

  // form validation rules
  const validationSchema = Yup.object().shape({
    // email: Yup.string().required("Required"),
  });

  const formOptions = {
    resolver: yupResolver(validationSchema),
    defaultValues: values,
  };

  const hookForm = useForm(formOptions);
  const { handleSubmit, reset, control, getValues } = hookForm;

  const _image = useWatch({ control, name: "profilePicture" });

  const onSubmit = (data, e) => {
    // reset(); // reset after form submit
    propsHandleSubmit({ ...data });
  };

  const image =
    typeof _image === "object" && _image instanceof File
      ? URL.createObjectURL(_image)
      : _image;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Upload File */}
      <Stack spacing={3} sx={{ mb: 3 }}>
        <FormDropzone
          name="profilePicture"
          control={control}
          exists={!!image}
          accept="image/*"
          restrict={{ type: "images", maxSize: 1 }}
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            alignItems="center"
          >
            <Avatar src={image} sx={{ height: 80, width: 80 }} />

            <Stack spacing={0.5}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Your Avatar
              </Typography>

              <Typography variant="caption">
                PNG or JPG no bigger than 1mb
              </Typography>

              <Typography variant="caption">
                Drag and drop or click here to upload
              </Typography>
            </Stack>
          </Stack>
        </FormDropzone>
      </Stack>

      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormTextField
            name="firstName"
            label="First Name"
            control={control}
            placeholder="Colby"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormTextField
            name="lastName"
            label="Last Name"
            control={control}
            placeholder="Anderson"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormTextField
            name="phone"
            label="Phone"
            control={control}
            placeholder="+1 234 567890"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormTextField
            name="birthday"
            label="Birthday"
            type="date"
            control={control}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormTextField
            name="title"
            label="Title"
            control={control}
            placeholder="Developer"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormTextField
            name="walletAddress"
            label="Wallet Address"
            control={control}
            placeholder="0xfc9A6c38aC14e71c0988f5cFcxDeD899Fc9wq"
          />
        </Grid>

        <Grid item xs={12}>
          <FormTextField
            name="bio"
            label="Bio"
            control={control}
            placeholder="About yourself"
            multiline
            rows={3}
          />
        </Grid>
      </Grid>

      <Stack alignItems="flex-end" spacing={2} sx={{ mt: 3 }}>
        <GreenButton
          size="small"
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
