import Title from "@components/Title";
import { Box, Stack, Typography } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { Droppable } from "react-beautiful-dnd";
import Element from "./Element";

const Column = ({ elements, title }) => {
  const { t } = useTranslation("about");

  return (
    <Box
      sx={{
        height: "100%",
        // bgcolor: "primary.grey2",
        p: 3,
        borderRadius: "16px",
      }}
    >
      <Title sx={{ mb: 3 }}>{t(title)}</Title>

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
