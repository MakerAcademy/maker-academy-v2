import GreenButton from "@components/buttons/GreenButton";
import Title from "@components/Title";
import { withProtectedUser } from "@hoc/routes";
import { handleSignOut, sendUserEmailVerification } from "@lib/auth";
import { Container, Stack, Typography } from "@mui/material";
import React, { useState } from "react";

const VerifyEmail = ({ user }) => {
  const [sent, setSent] = useState(false);

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Stack
        spacing={4}
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "70vh", textAlign: "center" }}
      >
        <img
          src={
            "https://www.clipartmax.com/png/full/72-722844_email-id-verification-reminder-plugin-business.png"
          }
          alt="Verify Image"
          style={{ height: 350, objectFit: "contain" }}
        />

        <Title variant="h4">Verify your email address</Title>

        <Typography>
          An email has been sent to {user.email} with a link to verify your
          account. If you have not received the email after a few minutes,
          please check your spam folder
        </Typography>

        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="center"
        >
          <GreenButton
            onClick={() =>
              sendUserEmailVerification().then(() => {
                setSent(true);
              })
            }
            disabled={!!sent}
          >
            Resend Email
          </GreenButton>

          <GreenButton variant="outlined" onClick={handleSignOut}>
            Sign out
          </GreenButton>
        </Stack>

        {sent && (
          <Typography variant="caption">Verification email sent!</Typography>
        )}
      </Stack>
    </Container>
  );
};

export default VerifyEmail;

export const getServerSideProps = withProtectedUser();
