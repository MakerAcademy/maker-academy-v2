import GreenButton from "@components/buttons/GreenButton";
import Web3AuthButton from "@components/buttons/Web3Auth";
import FormTextField from "@components/formFields/FormTextField";
import Title from "@components/Title";
import { CommonContext } from "@context/commonContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { handleGoogleLogin, handleRegister } from "@lib/auth";
import GoogleIcon from "@mui/icons-material/Google";
import {
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import Router from "next/router";
import { useSnackbar } from "notistack";
import { useContext, useState } from "react";
import { Bounce } from "react-awesome-reveal";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

export const SocialButton = ({ color, children, tooltip = "", ...other }) => {
  const theme = useTheme();

  return (
    <Tooltip title={tooltip}>
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
    </Tooltip>
  );
};

const RegisterForm = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { setCommonState } = useContext(CommonContext);

  const [type, setType] = useState("learner");

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("First name is required")
      .min(2, "Minimum 2 characters"),
    lastName: Yup.string()
      .required("Last name is required")
      .min(2, "Minimum 2 characters"),
    email: Yup.string().email().required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password should be 8 chars minimum.")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character (! . # % & *)"
      ),
    passwordConfirmation: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  const { handleSubmit, control } = useForm(formOptions);

  const onSubmit = async (data, e) => {
    const { firstName, lastName, email, password } = data;

    handleRegister(firstName, lastName, email, password)
      .then(() => {
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
        }, 15000);
      })
      .catch((err) => {
        if (err?.message) {
          enqueueSnackbar(JSON.stringify(err || {}), {
            variant: "error",
            autoHideDuration: 4000,
            onClose: () => Router.push("/login"),
          });
        }
      });
  };

  const onGoogleRegister = async () => {
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
        if (err?.message) {
          enqueueSnackbar(JSON.stringify(err || {}), {
            variant: "error",
            autoHideDuration: 4000,
            onClose: () => Router.push("/login"),
          });
        }
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

        <Stack
          direction="row"
          justifyContent="center"
          spacing={2}
          sx={{ width: "100%" }}
        >
          <FormTextField
            name="firstName"
            label="First Name"
            control={control}
            placeholder="Your first name"
            fullWidth
            sx={{ maxWidth: 217 }}
          />
          <FormTextField
            name="lastName"
            label="Last Name"
            control={control}
            placeholder="Your last name"
            fullWidth
            sx={{ maxWidth: 217 }}
          />
        </Stack>

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
            <SocialButton
              color="#DF4D3B"
              tooltip="Google"
              onClick={onGoogleRegister}
            >
              <GoogleIcon />
            </SocialButton>
          </Bounce>

          <Bounce>
            <Web3AuthButton />
          </Bounce>
        </Stack>
      </Stack>
    </form>
  );
};

export default RegisterForm;
