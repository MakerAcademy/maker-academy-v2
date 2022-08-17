import GreenButton from "@components/buttons/GreenButton";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useFieldArray } from "react-hook-form";

const CarriculumDocs = ({ control, name, documents }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const theme = useTheme();

  const fieldArray = useFieldArray({
    control,
    name,
  });

  const { append, prepend, remove, swap, move, insert, fields } = fieldArray;

  const handleOnDragEnd = (result) => {
    const from = result?.source?.index;
    const to = result?.destination?.index;

    if (to !== null && from !== null) {
      move(from, to);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleAddDocument = async (data) => {
    append(data);
  };

  const handleRemoveDocument = async (index) => {
    remove(index);
  };

  return (
    <Box>
      <GreenButton
        variant="outlined"
        size="small"
        onClick={() => setDialogOpen(true)}
      >
        Add Document
      </GreenButton>

      <Box sx={{ height: "100%" }}>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="list">
            {(provided) => (
              <List
                className="list"
                sx={{ mt: 2 }}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {fields.map(({ docId, id }, i) => {
                  const _document = documents?.find?.((j) => j.id === docId);

                  if (!_document) return null;

                  return (
                    <Draggable key={id} draggableId={id} index={i}>
                      {(innerProvided) => (
                        <ListItem
                          sx={{
                            border: `1px solid ${theme.palette.primary.grey2}`,
                            borderRadius: 3,
                            mb: 3,
                          }}
                          ref={innerProvided.innerRef}
                          {...innerProvided.draggableProps}
                          {...innerProvided.dragHandleProps}
                        >
                          <ListItemText
                            primary={_document?.metadata?.title}
                            secondary={docId}
                          />

                          <IconButton
                            size="small"
                            onClick={() => handleRemoveDocument(i)}
                          >
                            <RemoveCircleIcon fontSize="small" />
                          </IconButton>

                          {provided.placeholder}
                        </ListItem>
                      )}
                    </Draggable>
                  );
                })}
              </List>
            )}
          </Droppable>
        </DragDropContext>
      </Box>

      {/* Documents Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Select a document to add</DialogTitle>
        <DialogContent>
          <List>
            {documents?.map?.((doc, i) => {
              const alreadyAdded = fields.find((i) => i.docId === doc.id);

              return (
                <ListItem
                  key={i}
                  onClick={() =>
                    alreadyAdded
                      ? null
                      : handleAddDocument({
                          docId: doc.id,
                          title: doc?.metadata?.title,
                          contentType: doc.contentType,
                          duration: doc?.metadata?.duration,
                        })
                  }
                  button
                  disabled={!!alreadyAdded}
                >
                  <ListItemText
                    primary={doc?.metadata?.title}
                    secondary={doc.id}
                  />
                </ListItem>
              );
            })}
          </List>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default React.memo(CarriculumDocs);
