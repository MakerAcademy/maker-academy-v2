import Title from "@components/Title";
import styled from "@emotion/styled";
import { Stack, Typography, useTheme } from "@mui/material";
import { useState } from "react";

const LoginContent = ({}) => {
  const theme = useTheme();
  const [termsDialog, setTermsDialog] = useState(false);
  const [policyDialog, setPolicyDialog] = useState(false);

  const StyledDialogButton = styled("span")`
    text-decoration: underline;
    cursor: pointer;
  `;

  return (
    <>
      <Stack
        justifyContent="center"
        spacing={4}
        sx={{
          height: "100%",
          color: theme.palette.primary.white,
        }}
      >
        <Title variant={{ xs: "h3", md: "h2" }}>Sign In</Title>
        {/* <Typography variant="h2" sx={{ color: "text.title" }}>
          Sign In
        </Typography> */}

        <Title variant="h5">Good to see you again!</Title>

        <Typography sx={{ fontWeight: 400, pb: 3 }}>
          By logging in for Maker Academy, you agree to our{" "}
          <StyledDialogButton onClick={() => setTermsDialog(true)}>
            Terms of Use
          </StyledDialogButton>{" "}
          and our{" "}
          <StyledDialogButton onClick={() => setPolicyDialog(true)}>
            Privacy Policy
          </StyledDialogButton>
          .
        </Typography>
      </Stack>
    </>
  );
};

export default LoginContent;
