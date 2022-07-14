import GreenButton from "@components/buttons/GreenButton";
import FormTextField from "@components/formFields/FormTextField";
import { yupResolver } from "@hookform/resolvers/yup";
import { handleGoogleLogin, handleRegister } from "@lib/auth";
import {
  Divider,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import Router, { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import GoogleIcon from "@mui/icons-material/Google";
import Title from "@components/Title";
import { Bounce } from "react-awesome-reveal";
import { useSnackbar } from "notistack";

export const SocialButton = ({ color, children, ...other }) => {
  const theme = useTheme();

  return (
    <IconButton
      // size="large"
      sx={{
        backgroundColor: color,
        color: theme.palette.common.white,
        "&:hover": {
          backgroundColor: color,
          filter: "brightness(90%)",
        },
      }}
      {...other}
    >
      {children}
    </IconButton>
  );
};

const RegisterForm = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [type, setType] = useState("learner");

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
    passwordConfirmation: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { handleSubmit, control } = useForm(formOptions);

  const router = useRouter();

  const onSubmit = async (data, e) => {
    const { email, password } = data;

    const _key = enqueueSnackbar("Signing in...", {
      variant: "default",
    });

    handleRegister(email, password)
      .then(() => {
        closeSnackbar(_key);
        enqueueSnackbar("Success", {
          variant: "success",
          autoHideDuration: 2000,
          onClose: () => Router.push("/app/studio"),
        });
      })
      .catch((err) => {
        enqueueSnackbar("Error", {
          variant: err.message,
          autoHideDuration: 2000,
          onClose: () => Router.push("/register"),
        });
      });
  };

  const onGoogleRegister = async () => {
    const _key = enqueueSnackbar("Signing in...", {
      variant: "default",
    });

    handleGoogleLogin()
      .then(() => {
        closeSnackbar(_key);
        enqueueSnackbar("Registeration Success", {
          variant: "success",
          autoHideDuration: 2000,
          onClose: () => Router.push("/app/studio"),
        });
      })
      .catch((err) => {
        enqueueSnackbar(err.message, {
          variant: "error",
          autoHideDuration: 2000,
          onClose: () => Router.push("/register"),
        });
      });
  };

  const handleTypeChange = (event, _type) => {
    // Maybe add field as part of the form too.
    setType(_type);
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
          Create your account
        </Title>
        {/*<Typography>Join Maker Academy as a</Typography>*/}

        {/*<ToggleButtonGroup*/}
        {/*  color="primary"*/}
        {/*  value={type}*/}
        {/*  exclusive*/}
        {/*  onChange={handleTypeChange}*/}
        {/*  fullWidth*/}
        {/*  sx={{ maxWidth: 450 }}*/}
        {/*>*/}
        {/*  <ToggleButton value="learner">Learner</ToggleButton>*/}
        {/*  <ToggleButton value="educator">Educator</ToggleButton>*/}
        {/*  <ToggleButton value="contributor">Contributor</ToggleButton>*/}
        {/*</ToggleButtonGroup>*/}

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

        <FormTextField
          name="passwordConfirmation"
          label="Confirm Password"
          placeholder="Confirm Password"
          control={control}
          type="password"
          fullWidth
          sx={{ maxWidth: 450 }}
        />

        <GreenButton fullWidth sx={{ maxWidth: 200 }} type="submit">
          Sign up
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

        <Typography>Sign up using social networks</Typography>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={2.5}
        >
          <Bounce>
            <SocialButton color="#DF4D3B" onClick={onGoogleRegister}>
              <GoogleIcon />
            </SocialButton>
          </Bounce>
        </Stack>
      </Stack>
    </form>
  );
};

export default RegisterForm;
