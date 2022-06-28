import { Stack, Typography, useTheme } from "@mui/material";

const RegisterContent = ({}) => {
  const theme = useTheme();

  return (
    <Stack
      spacing={5}
      justifyContent="center"
      alignItems="center"
      sx={{
        py: { xs: 3, md: 5 },
        height: "100%",
        textAlign: "center",
      }}
    >
      <Typography variant="h2">Sign Up</Typography>

      <Stack spacing={1}>
        <Typography variant="h5">Why join as a learner?</Typography>

        <Typography variant="h6" sx={{ fontWeight: 300, textAlign: "left" }}>
          {
            "Joining as a learner will give you the SAME features as an educator or contributor. Choosing the best category you fall under just helps with Maker Academy's analytics :)"
          }
        </Typography>
      </Stack>

      <Stack spacing={1}>
        <Typography variant="h5">Why create an account?</Typography>
        <Typography variant="h6" sx={{ fontWeight: 300, textAlign: "left" }}>
          Creating an account will give you access to the following features:
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 300,
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
    </Stack>
  );
};

export default RegisterContent;
