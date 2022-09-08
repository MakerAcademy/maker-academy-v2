import MarkdownBody from "@components/Document/MarkdownBody";
import { Box } from "@mui/material";

const MarkdownBox = ({ data }) => {
  const { body, align = "left" } = data;

  return (
    <Box
      sx={{
        px: 3,
        py: 2,
        my: 2,
        bgcolor: "grey.grey2",
        borderRadius: "10px",
        textAlign: align,
      }}
    >
      <MarkdownBody
        markdown={body}
        headingStyle={{ textAlign: align, mt: 0 }}
      />
    </Box>
  );
};

export default MarkdownBox;
