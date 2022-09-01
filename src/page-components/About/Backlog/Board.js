import { BACKLOG_TYPES } from "@constants/";
import { listenBacklogs } from "@lib/backlog";
import { Box, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";

const Board = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsub = listenBacklogs(setData);
    return () => unsub();
  }, []);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    const from = source?.index;
    const to = destination?.index;
  };

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Stack
          direction="row"
          justifyContent="space-between"
          spacing={3}
          // sx={{ bgcolor: "white" }}
        >
          {BACKLOG_TYPES.map((item) => (
            <Box key={item.name} sx={{ width: "100%" }}>
              <Column
                elements={data.filter((i) => i.issue_type === item)}
                title={item}
              />
            </Box>
          ))}
        </Stack>
      </DragDropContext>
    </div>
  );
};

export default Board;
