import Title from "@components/Title";
import { BACKLOG_TYPES } from "@constants/";
import { useAppSelector } from "@hooks/useRedux";
import { updateBacklog } from "@lib/backlog";
import {
  Box,
  Card,
  Dialog,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";

const Element = ({ title, description, id, index, status }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { user } = useAppSelector((state) => state.user);

  const handleStatusChange = (e, v) => {
    const _value = e.target.value;

    updateBacklog(id, { status: _value || "open" });
  };

  return (
    <>
      <Draggable draggableId={id} index={index}>
        {(provided, snapshot) => (
          <Paper
            elevation={0}
            ref={provided.innerRef}
            snapshot={snapshot}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            sx={{ p: 1, cursor: "pointer" }}
            onClick={() => setDialogOpen(true)}
          >
            {title}
          </Paper>
        )}
      </Draggable>

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <Stack sx={{ p: 4 }} spacing={3}>
          <Title>{title}</Title>

          <Typography>{description}</Typography>

          <Stack alignItems="flex-end">
            <FormControl size="small" sx={{ minWidth: 170 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={status}
                label="Status"
                onChange={handleStatusChange}
              >
                <MenuItem value={"open"}>open</MenuItem>
                <MenuItem value={"development"}>development</MenuItem>
                <MenuItem value={"review"}>review</MenuItem>
                <MenuItem value={"done"}>done</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Stack>
      </Dialog>
    </>
  );
};

export default Element;
