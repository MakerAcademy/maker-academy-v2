import GreenButton from "@components/buttons/GreenButton";
import DashboardPaper from "@components/DashboardPaper";
import FormDropzone from "@components/formFields/FormDropzone";
import FormTextField from "@components/formFields/FormTextField";
import Title from "@components/Title";
import { CONTACT_ROLES } from "@constants/index";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  InputAdornment,
  Paper,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import { useForm, useWatch } from "react-hook-form";
import * as Yup from "yup";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { emailPasswordReset } from "@lib/auth";
import { useAppSelector } from "@hooks/useRedux";
import { useState } from "react";

const ProfileForm = ({ values, handleSubmit: propsHandleSubmit }) => {
  const [resetPassword, setResetPassword] = useState(false);
  const theme = useTheme();
  const { t } = useTranslation("common");

  const { user } = useAppSelector((state) => state.user);

  // form validation rules
  const validationSchema = Yup.object().shape({
    // email: Yup.string().required("Required"),
  });

  const formOptions = {
    resolver: yupResolver(validationSchema),
    defaultValues: values,
  };

  const hookForm = useForm(formOptions);
  const { handleSubmit, reset, control, getValues, setValue } = hookForm;

  const _image = useWatch({ control, name: "profilePicture" });
  const _coverImage = useWatch({ control, name: "coverPicture" });
  const _firstName = useWatch({ control, name: "firstName" });
  const _lastName = useWatch({ control, name: "lastName" });
  const _role = useWatch({ control, name: "role" });

  const onSubmit = (data, e) => {
    // reset(); // reset after form submit
    propsHandleSubmit({ ...data });
  };

  const handleRoleChange = (_r) => {
    setValue("role", _r);
  };

  const image =
    typeof _image === "object" && _image instanceof File
      ? URL.createObjectURL(_image)
      : _image;

  const coverImage =
    typeof _coverImage === "object" && _coverImage instanceof File
      ? URL.createObjectURL(_coverImage)
      : _coverImage;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Upload File */}

      {/* Top */}
      <Box
        sx={{
          color: theme.palette.primary.white,
          bgcolor: "grey.grey2",
          height: 230,
          p: 3,
          borderRadius: "12px 12px 0 0",
          position: "relative",
          [theme.breakpoints.up("md")]: {
            p: 5,
            pb: 2,
          },
        }}
      >
        <FormDropzone
          name="coverPicture"
          control={control}
          exists={!!coverImage}
          accept="image/*"
          restrict={{ type: "images", maxSize: 3 }}
        >
          <Box
            sx={{
              left: 0,
              top: 0,
              bottom: 0,
              right: 0,
              //   bgcolor: "red",
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {coverImage ? (
              <img
                src={coverImage}
                alt="Cover Photo"
                style={{ height: "100%", width: "100%", objectFit: "cover" }}
              />
            ) : (
              <Typography>Click to upload Cover Photo</Typography>
            )}
          </Box>
        </FormDropzone>

        {/* Image and name */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems={{ md: "flex-end" }}
          spacing={{ xs: 3, md: 5 }}
          sx={{ height: "100%", zIndex: 999 }}
        >
          <FormDropzone
            name="profilePicture"
            control={control}
            exists={!!image}
            accept="image/*"
            restrict={{ type: "images", maxSize: 1 }}
          >
            <Tooltip
              title={
                <>
                  Drag and drop or click here to upload
                  <br />
                  (PNG or JPG no bigger than 1mb)
                </>
              }
            >
              {image ? (
                <Avatar
                  src={image}
                  sx={{
                    cursor: "pointer",
                    height: 120,
                    width: 120,
                    [theme.breakpoints.up("md")]: { mb: -6 },
                    border: `4px solid ${theme.palette.grey.grey2}`,
                  }}
                />
              ) : (
                <Avatar
                  sx={{
                    cursor: "pointer",
                    height: 120,
                    width: 120,
                    bgcolor: "grey.grey2",
                    [theme.breakpoints.up("md")]: { mb: -6 },
                    border: `4px solid ${theme.palette.text.invert}`,
                    color: "text.primary",
                  }}
                >
                  <Stack alignItems="center" justifyContent="center">
                    <CameraAltIcon fontSize="small" />
                    <Typography variant="caption">Upload Photo</Typography>
                  </Stack>
                </Avatar>
              )}
            </Tooltip>
          </FormDropzone>

          <Stack>
            <Title variant="h5">
              {_firstName} {_lastName}
            </Title>
            <Typography variant="body2">{t(_role)}</Typography>
          </Stack>
        </Stack>
      </Box>

      {/* Bottom white */}
      <Box
        sx={{
          bgcolor: "primary.invert",
          borderBottomLeftRadius: "20px",
          borderBottomRightRadius: "20px",
          borderTop: `4px solid ${theme.palette.grey.grey2}`,
          height: 50,
          mb: 5,
        }}
      />

      <Grid container spacing={5}>
        {/* Left side - account details */}
        <Grid item xs={12} md={6}>
          <DashboardPaper>
            <Title sx={{ mb: 3 }}>Account Details</Title>

            <Stack spacing={3}>
              <FormTextField
                name="firstName"
                label="First Name"
                control={control}
                placeholder="Your first name"
              />

              <FormTextField
                name="lastName"
                label="Last Name"
                control={control}
                placeholder="Your last name"
              />

              <FormTextField
                name="phone"
                label="Phone"
                control={control}
                placeholder="+1 234 567890"
              />

              <FormTextField
                name="birthday"
                label="Birthday"
                type="date"
                control={control}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <FormTextField
                name="walletAddress"
                label="Wallet Address"
                control={control}
                placeholder="0xfc9A6c38aC14e71c0988f5cFcxDeD899Fc9wq"
              />

              <FormTextField
                name="bio"
                label="Bio"
                control={control}
                placeholder="About yourself"
                multiline
                rows={3}
              />

              <Typography variant="body2">Your Role</Typography>

              <Grid
                container
                direction="row"
                spacing={2}
                flexWrap="wrap"
                sx={{ mt: "0px !important" }}
              >
                {CONTACT_ROLES.map(({ name, icon }) => (
                  <Grid item key={name}>
                    <Paper
                      onClick={() => handleRoleChange(name)}
                      sx={{
                        bgcolor: _role === name ? "grey.grey2" : "inherit",
                        cursor: "pointer",
                        p: 2,
                        // mb: 2,
                        minHeight: 85,
                        height: "100%",
                        width: 110,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        // justifyContent: "center",
                        textAlign: "center",
                        border: `1px solid ${theme.palette.grey.grey2}`,
                        boxShadow:
                          "0px 1px 3px rgba(190, 190, 190, 0.25), 0px 20px 40px -40px rgba(219, 227, 237, 0.4)",
                        "&:hover": {
                          boxShadow:
                            "0px 6px 12px -6px rgba(24, 39, 75, 0.12), 0px 8px 24px -4px rgba(24, 39, 75, 0.08)",
                        },
                      }}
                    >
                      <Avatar
                        sx={{ mb: 1, height: 26, width: 26 }}
                        src={icon}
                      />
                      <Typography variant="caption">{t(name)}</Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Stack>
          </DashboardPaper>
        </Grid>

        {/* Right side - social media */}
        <Grid item xs={12} md={6}>
          <DashboardPaper>
            <Title sx={{ mb: 3 }}>Social Media</Title>

            <Stack spacing={3}>
              <FormTextField
                name="socials.publicEmail"
                label="Public Email"
                control={control}
                placeholder="abc@gmail.com"
              />

              <FormTextField
                name="socials.twitter"
                label="Twitter"
                control={control}
                placeholder="your_username"
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      sx={{ color: "grey.grey4" }}
                    >
                      <Typography>@</Typography>
                    </InputAdornment>
                  ),
                }}
              />

              <FormTextField
                name="socials.instagram"
                label="Instagram"
                control={control}
                placeholder="your_username"
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      sx={{ color: "grey.grey4" }}
                    >
                      <Typography>@</Typography>
                    </InputAdornment>
                  ),
                }}
              />

              <FormTextField
                name="socials.telegram"
                label="Telegram"
                control={control}
                placeholder="your_username"
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      sx={{ color: "grey.grey4" }}
                    >
                      <Typography>@</Typography>
                    </InputAdornment>
                  ),
                }}
              />

              <FormTextField
                name="socials.linkedin"
                label="LinkedIn"
                control={control}
                placeholder="your_username"
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      sx={{ color: "grey.grey4" }}
                    >
                      <Typography>@</Typography>
                    </InputAdornment>
                  ),
                }}
              />

              <FormTextField
                name="socials.makerforum"
                label="Maker Forum"
                control={control}
                placeholder="your_username"
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      sx={{ color: "grey.grey4" }}
                    >
                      <Typography>@</Typography>
                    </InputAdornment>
                  ),
                }}
              />

              <FormTextField
                name="socials.other"
                label="Other Link"
                control={control}
                placeholder="https://www.yourwebsite.com"
              />
            </Stack>
          </DashboardPaper>

          <DashboardPaper>
            <Typography sx={{ mb: 2 }}>Password</Typography>

            <Typography
              variant="body2"
              component="div"
              sx={{ mb: 2 }}
              color="gray"
            >
              Click the button below to receive a password reset email.
            </Typography>

            <Tooltip title="Send Password Reset Email">
              <Button
                variant="outlined"
                onClick={() =>
                  emailPasswordReset(user?.email).then(() => {
                    setResetPassword(true);
                  })
                }
                disabled={!!resetPassword}
              >
                Reset Password
              </Button>
            </Tooltip>

            {resetPassword && (
              <Typography
                variant="caption"
                component="div"
                color="gray"
                sx={{ mt: 1 }}
              >
                Password reset email sent. Please check your inbox or spam and
                follow the instructions.
              </Typography>
            )}
          </DashboardPaper>

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
        </Grid>
      </Grid>
    </form>
  );
};

export default ProfileForm;
