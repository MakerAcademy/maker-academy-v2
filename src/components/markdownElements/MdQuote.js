import { Card, Stack, Typography } from "@mui/material";
import { parseLineBreaks } from "@utils/helperFunctions";

const MdQuote = ({ data }) => {
  const { text, author } = data || {};
  const _text = parseLineBreaks(text);

  return (
    <Card
      sx={{
        py: 3,
        px: 4,
        bgcolor: "grey.grey2",
        textAlign: "center",
        borderRadius: "10px",
      }}
      elevation={0}
    >
      <Typography
        component="span"
        sx={{
          fontSize: 40,
          color: "grey.grey6",
          verticalAlign: "middle",
          lineHeight: 0,
          mr: 1,
        }}
      >
        ‟
      </Typography>

      <Typography component="span" sx={{ lineHeight: 1.7 }}>
        {_text}
      </Typography>

      <Typography
        component="span"
        sx={{
          fontSize: 40,
          color: "grey.grey6",
          verticalAlign: "middle",
          lineHeight: 0,
          ml: 1,
        }}
      >
        ”
      </Typography>

      <Stack
        alignItems="flex-end"
        sx={{ fontWeight: 600, width: "100%", mt: 2 }}
      >
        {author}
      </Stack>
    </Card>
  );
};

export default MdQuote;
