import { Button, Link, Stack, Typography } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import React from "react";

const MenuButtons = ({ menuItems = [], theme }) => {
  const { t } = useTranslation("common");

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={{ xs: 3, lg: 4 }}
      alignItems="center"
    >
      {menuItems.map(({ name, link }, i) => (
        <Link key={link} href={link} underline="none">
          <Button
            sx={{
              // p: 1,
              color: theme.palette.text.primary,
              fontSize: 20,
              textTransform: "inherit",
              fontWeight: 500,
              "&:hover": {
                color: theme.palette.primary.main,
              },
            }}
          >
            {t(name)}
          </Button>
        </Link>
      ))}
    </Stack>
  );
};

export default MenuButtons;
