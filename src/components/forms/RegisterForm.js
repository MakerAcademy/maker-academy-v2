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
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import GoogleIcon from "@mui/icons-material/Google";

export const SocialButton = ({ color, children, ...other }) => {
  const theme = useTheme();

  return (
    <IconButton
      size="large"
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
    try {
      handleRegister(email, password);
    } catch (err) {
      console.log(err);
    }
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
        <Typography variant="h5" sx={{ pb: 2 }}>
          Create your account
        </Typography>
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

        <FormTextField
          name="passwordConfirmation"
          variant="filled"
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

        <Divider variant="middle" sx={{ width: "100%", maxWidth: 410 }}>
          Or
        </Divider>

        <Typography>Sign up using social networks</Typography>

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

export default RegisterForm;
