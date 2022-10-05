import Title from "@components/Title";
import { CommonContext } from "@context/commonContext";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import PestControlIcon from "@mui/icons-material/PestControl";
import { Box, Button, Paper, Stack, Typography, useTheme } from "@mui/material";
import hex from "@utils/hexTransparency";
import useTranslation from "next-translate/useTranslation";
import { useContext } from "react";
import Element from "./Element";

const ISSUE_TYPE_TITLE = {
  bug_fix: "bugs",
  improvement: "improvements",
  feature: "new_features",
};

const ISSUE_TYPE_NEW_BUTTON = {
  bug_fix: { name: "submit_a_bug", icon: PestControlIcon },
  improvement: { name: "suggest_improvement", icon: ElectricBoltIcon },
  feature: { name: "suggest_feature", icon: LightbulbIcon },
};

export const ISSUE_TYPE_COLOR = (theme, type) => {
  const _color = {
    bug_fix: theme.palette.info.main,
    improvement: theme.palette.warning.light,
    feature: theme.palette.primary.main,
  };

  return _color[type];
};

const Header = ({ title, length }) => {
  const { commonState, setCommonState } = useContext(CommonContext);
  const { t } = useTranslation("about");
  const Icon = ISSUE_TYPE_NEW_BUTTON[title].icon;
  const theme = useTheme();

  return (
    <Paper
      sx={{
        mb: 3,
        p: 2,
        borderRadius: 3,
        cursor: "pointer",
        boxShadow: "0px 2px 10px rgba(24, 39, 75, 0.15)",
      }}
    >
      <Typography sx={{ mb: 2, fontWeight: 600 }}>
        {t(ISSUE_TYPE_TITLE[title])} ({length})
      </Typography>

      <Button
        variant="contained"
        disableElevation
        size="small"
        sx={{
          height: 30,
          borderRadius: "8px",
          color: ISSUE_TYPE_COLOR(theme, title),
          bgcolor: `${ISSUE_TYPE_COLOR(theme, title)}${hex["5%"]}`,
          border: `1px solid ${ISSUE_TYPE_COLOR(theme, title)}`,
          "&:hover": {
            bgcolor: `${ISSUE_TYPE_COLOR(theme, title)}${hex["20%"]}`,
          },
        }}
        onClick={() => setCommonState({ backlogDialogOpen: true })}
      >
        {t(ISSUE_TYPE_NEW_BUTTON[title].name)}
        <Icon sx={{ ml: 1, fontSize: 18 }} />
      </Button>
    </Paper>
  );
};

const Column = ({ elements, title }) => {
  const { t } = useTranslation("about");

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        // bgcolor: "grey.grey2",
        // p: 3,
        borderRadius: "16px",
      }}
    >
      <Header title={title} length={elements?.length || 0} />

      <Stack
        spacing={2}
        sx={{
          maxHeight: "600px",
          overflowY: "scroll",
          px: 1,
          ml: -1,
          pb: 2,
          width: "107%",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {elements?.map?.((item, i) => (
          <Element key={i} values={item} index={i} />
        ))}
      </Stack>
    </Box>
  );
};

export default Column;
