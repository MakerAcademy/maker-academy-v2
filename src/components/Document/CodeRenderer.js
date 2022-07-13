import { Card, IconButton, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const CodeRenderer = (props) => {
  const str =
    '{ "type": "service-card", "title": "Permissionless", "subtitle": "No one can stop you from using cryptocurrency. Centralized payment services, on the other hand, can freeze accounts or prevent transactions from being made.", "icon": "Delete" }';

  const data = JSON.parse(str);

  return (
    <Card sx={{ m: 3, maxWidth: 200, p: 2 }}>
      <Stack spacing={2}>
        <IconButton>{data.icon}</IconButton>

        <Typography>{data.title}</Typography>

        <Typography variant="body2">{data.subtitle}</Typography>
      </Stack>
    </Card>
  );
};

export default CodeRenderer;
