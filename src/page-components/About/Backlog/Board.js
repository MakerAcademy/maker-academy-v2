import { BACKLOG_TYPES } from "@constants/";
import { listenBacklogs } from "@lib/backlog";
import { Box, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import Column from "./Column";

const Board = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsub = listenBacklogs(setData);
    return () => unsub();
  }, []);

  return (
    <div>
      <Stack
        direction="row"
        justifyContent="space-between"
        spacing={4}
        // sx={{ bgcolor: "white" }}
      >
        {BACKLOG_TYPES.map((item, i) => (
          <Box key={i} sx={{ width: "100%" }}>
            <Column
              elements={data.filter((i) => i.issue_type === item)}
              title={item}
            />
          </Box>
        ))}
      </Stack>
    </div>
  );
};

export default Board;
