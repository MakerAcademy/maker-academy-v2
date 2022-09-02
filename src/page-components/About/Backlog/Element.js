import Title from "@components/Title";
import { BACKLOG_TYPES } from "@constants/";
import { useAppSelector } from "@hooks/useRedux";
import { deleteBacklog, updateBacklog } from "@lib/backlog";
import {
  Box,
  Button,
  Card,
  Chip,
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

const Element = ({ title, description, id, index, status, issue_type }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { user } = useAppSelector((state) => state.user);

  const handleStatusChange = (e, v) => {
    const _value = e.target.value;

    updateBacklog(id, { status: _value || "open" });
  };

  const handleDelete = () => {
    setDialogOpen(false);
    deleteBacklog(id);
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
            sx={{ p: 2, borderRadius: 3, cursor: "pointer" }}
            onClick={() => setDialogOpen(true)}
          >
            <Typography sx={{ mb: 2 }}>{title}</Typography>

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
            >
              <Chip label={issue_type} size="small" />

              <Typography variant="caption">{status}</Typography>
            </Stack>
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

          {user?.trustLevel > 3 && (
            <Stack direction="row" justifyContent="flex-end" spacing={2}>
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

              <Button color="error" variant="outlined" onClick={handleDelete}>
                Delete
              </Button>
            </Stack>
          )}
        </Stack>
      </Dialog>
    </>
  );
};

export default Element;
