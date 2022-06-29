import GreenButton from "@components/buttons/GreenButton";
import FormTextField from "@components/formFields/FormTextField";
import { yupResolver } from "@hookform/resolvers/yup";
import { handleGoogleLogin, handleLogin } from "@lib/auth";
import GoogleIcon from "@mui/icons-material/Google";
import { Divider, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { SocialButton } from "./RegisterForm";

const LoginForm = () => {
  // form validation rules
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const router = useRouter();

  const { handleSubmit, reset, control, getValues } = useForm(formOptions);

  const onSubmit = async (data, e) => {
    const { email, password } = data;
    try {
      handleLogin(email, password);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ height: "100%" }}>
      <Stack
        alignItems="center"
        justifyContent="center"
        spacing={3}
        sx={{ width: "100%", height: "100%" }}
      >
        <Typography variant="h5" sx={{ pb: 2 }}>
          Login to your account
        </Typography>

        <FormTextField
          name="email"
          label="Email"
          variant="filled"
          control={control}
          type="email"
          placeholder="abc@xyz.com"
          fullWidth
          sx={{ maxWidth: 450 }}
        />

        <FormTextField
          name="password"
          variant="filled"
          label="Password"
          placeholder="Password"
          control={control}
          type="password"
          fullWidth
          sx={{ maxWidth: 450 }}
        />

        <GreenButton fullWidth sx={{ maxWidth: 200 }} type="submit">
          Sign in
        </GreenButton>

        <Divider variant="middle" sx={{ width: "100%", maxWidth: 410 }}>
          Or
        </Divider>

        <Typography>Login using social networks</Typography>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={2.5}
        >
          <SocialButton color="#DF4D3B" onClick={handleGoogleLogin}>
            <GoogleIcon />
          </SocialButton>
        </Stack>
      </Stack>
    </form>
  );
};

export default LoginForm;
