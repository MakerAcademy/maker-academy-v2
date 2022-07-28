import { Card, Stack, Typography } from "@mui/material";
import React from "react";
import { parseMdCode } from ".";

const MdQuote = ({ value }) => {
  const data = parseMdCode(value);

  const { text, author } = data || {};
  const _text = parseLineBreaks(text);

  return (
    <Card sx={{ p: 2 }} elevation={0}>
      <Stack sx={{ textAlign: "center" }} alignItems="center" spacing={2}>
        <Typography>{_text}</Typography>

        <Stack alignItems="flex-end" sx={{ fontWeight: 600 }}>
          {author}
        </Stack>
      </Stack>
    </Card>
  );
};

export default MdQuote;
