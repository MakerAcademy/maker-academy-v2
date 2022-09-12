import Title from "@components/Title";
import { CommonContext } from "@context/commonContext";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import React, { useContext } from "react";
import { Droppable } from "react-beautiful-dnd";
import Element from "./Element";
import PestControlIcon from "@mui/icons-material/PestControl";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import LightbulbIcon from "@mui/icons-material/Lightbulb";

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

const Header = ({ title }) => {
  const { commonState, setCommonState } = useContext(CommonContext);
  const { t } = useTranslation("about");
  const Icon = ISSUE_TYPE_NEW_BUTTON[title].icon;

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
        {t(ISSUE_TYPE_TITLE[title])}
      </Typography>

      <Button
        // variant="contained"
        size="small"
        sx={{ borderRadius: "8px" }}
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
        height: "100%",
        // bgcolor: "grey.grey2",
        p: 3,
        borderRadius: "16px",
      }}
    >
      <Header title={title} />

      <Droppable droppableId={`${title}`}>
        {(provided) => (
          <Stack
            spacing={2}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {elements?.map?.((item, i) => (
              <Element key={i} {...item} index={i} />
            ))}

            {provided.placeholder}
          </Stack>
        )}
      </Droppable>
    </Box>
  );
};

export default Column;
