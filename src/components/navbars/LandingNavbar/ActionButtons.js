import GreenButton from "@components/buttons/GreenButton";
import LanguageMenu from "@components/buttons/LanguageButton";
import ThemeSwitch from "@components/buttons/ThemeSwitch";
import { Stack, Link } from "@mui/material";
import React from "react";

const ActionButtons = ({ theme }) => {
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      alignItems="center"
      spacing={{ xs: 2, md: 3 }}
    >
      <LanguageMenu sx={{ color: theme.palette.text.main }} />

      <ThemeSwitch />

      <Link href="/sign-up">
        <GreenButton size="small">Sign Up</GreenButton>
      </Link>
    </Stack>
  );
};

export default ActionButtons;
