import { handleSignOut } from "@lib/auth";
import { Box, Container } from "@mui/material";
import Router from "next/router";
import React, { useEffect } from "react";

const Signout = () => {
  useEffect(() => {
    handleSignOut().then(() => {
      Router.push("/");
    });
  }, []);

  return (
    <Container sx={{ minHeight: "60vh", py: 10 }}>Signing out...</Container>
  );
};

export default Signout;
