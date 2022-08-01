import GreenButton from "@components/buttons/GreenButton";
import FormTextField from "@components/formFields/FormTextField";
import Title from "@components/Title";
import { yupResolver } from "@hookform/resolvers/yup";
import { handleGoogleLogin, handleLogin } from "@lib/auth";
import GoogleIcon from "@mui/icons-material/Google";
import { Divider, Stack, Typography } from "@mui/material";
import Router from "next/router";
import { useSnackbar } from "notistack";
import { Bounce } from "react-awesome-reveal";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { SocialButton } from "./RegisterForm";

const LoginForm = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  // form validation rules
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  const { handleSubmit, reset, control, getValues } = useForm(formOptions);

  const onSubmit = async (data, e) => {
    const { email, password } = data;

    handleLogin(email, password)
      .then((res) => {
        setCommonState({
          loadingOverlay: [
            "Creating User...",
            "Generating Profile...",
            "Finalizing...",
            "Finalizing...",
            "Finalizing...",
          ],
        });

        setTimeout(() => {
          setCommonState({ loadingOverlay: null });
          Router.push("/");
        }, 1000);
      })
      .catch((err) => {
        enqueueSnackbar(JSON.stringify(err || {}), {
          variant: "error",
          autoHideDuration: 4000,
          onClose: () => Router.push("/login"),
        });
      });
  };

  const onGoogleLogin = async () => {
    handleGoogleLogin()
      .then(({ isNewUser, user }) => {
        if (isNewUser) {
          setCommonState({
            loadingOverlay: [
              "Creating User...",
              "Generating Profile...",
              "Finalizing...",
              "Finalizing...",
              "Finalizing...",
            ],
          });

          setTimeout(() => {
            setCommonState({ loadingOverlay: null });
            Router.push("/");
          }, 12000);
        } else if (user?.uid) {
          setCommonState({ loadingOverlay: ["Signing in..."] });
          setTimeout(() => {
            setCommonState({ loadingOverlay: null });
            Router.push("/");
          }, 1000);
        }
      })
      .catch((err) => {
        enqueueSnackbar(JSON.stringify(err || {}), {
          variant: "error",
          autoHideDuration: 2000,
          onClose: () => Router.push("/login"),
        });
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ height: "100%" }}>
      <Stack
        alignItems="center"
        justifyContent="center"
        spacing={3}
        sx={{ width: "100%", height: "100%" }}
      >
        <Title variant="h5" sx={{ pb: 2 }}>
          Login to your account
        </Title>

        <FormTextField
          name="email"
          label="Email"
          control={control}
          type="email"
          placeholder="abc@xyz.com"
          fullWidth
          sx={{ maxWidth: 450 }}
        />

        <FormTextField
          name="password"
          label="Password"
          placeholder="Password"
          control={control}
          type="password"
          fullWidth
          sx={{ maxWidth: 450 }}
        />

        <GreenButton fullWidth sx={{ maxWidth: 200 }} type="submit">
          Login
        </GreenButton>

        <Divider
          variant="middle"
          sx={{
            width: "100%",
            maxWidth: 410,
            display: "flex",
            alignItems: "end",
          }}
        >
          Or
        </Divider>

        <Typography>Login using social networks</Typography>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={2.5}
        >
          <Bounce>
            <SocialButton color="#DF4D3B" onClick={onGoogleLogin}>
              <GoogleIcon />
            </SocialButton>
          </Bounce>
        </Stack>
      </Stack>
    </form>
  );
};

export default LoginForm;
