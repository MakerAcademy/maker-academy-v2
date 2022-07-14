import Title from "@components/Title";
import { Stack, Typography, useTheme } from "@mui/material";
import { Fade } from "react-awesome-reveal";

const RegisterContent = ({}) => {
  const theme = useTheme();

  return (
    <Stack
      spacing={5}
      justifyContent="center"
      // alignItems="center"
      sx={{
        py: { xs: 3, md: 5 },
        height: "100%",
        // textAlign: "center",
      }}
    >
      <Fade triggerOnce>
        <Title variant="h2">Sign Up</Title>
      </Fade>

      <Fade direction="down" triggerOnce duration={700}>
        <Stack spacing={1}>
          <Title variant="h5">Why join as a learner?</Title>

          <Typography sx={{ textAlign: "left" }}>
            {
              "Joining as a learner will give you the SAME features as an educator or contributor. Choosing the best category you fall under just helps with Maker Academy's analytics :)"
            }
          </Typography>
        </Stack>
      </Fade>

      <Fade direction="down" triggerOnce duration={1000}>
        <Stack spacing={1}>
          <Title variant="h5">Why create an account?</Title>
          <Typography sx={{ textAlign: "left" }}>
            Creating an account will give you access to the following features:
          </Typography>
          <Typography
            sx={{
              whiteSpace: "pre-line",
              pb: 3,
              textAlign: "left",
            }}
          >
            {`• Continuing content where you left off
            • Saving content
            • Creating content
            • Earning certificates for your learning
          `}
          </Typography>
        </Stack>
      </Fade>
    </Stack>
  );
};

export default RegisterContent;
