import { Button, Link, Stack, Typography } from "@mui/material";
import React from "react";

const MenuButtons = ({ menuItems = [], theme }) => {
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={{ xs: 3, md: 6 }}
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
              fontWeight: 400,
              "&:hover": {
                color: theme.palette.primary.main,
              },
            }}
          >
            {name}
          </Button>
        </Link>
      ))}
    </Stack>
  );
};

export default MenuButtons;
