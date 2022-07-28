import { Tooltip, Typography } from "@mui/material";
import { parseLineBreaks } from "@utils/helperFunctions";

const MdTooltip = ({ data }) => {
  const { hover, text, variant = "p", placement = "right" } = data || {};
  const _text = parseLineBreaks(text);

  return (
    <Tooltip title={hover} placement={placement}>
      <Typography variant={variant} sx={{ whiteSpace: "pre-line" }}>
        {_text}
      </Typography>
    </Tooltip>
  );
};

export default MdTooltip;
