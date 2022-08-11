import FormTextField from "@components/formFields/FormTextField";
import { useAppSelector } from "@hooks/useRedux";
import { getUserDocuments } from "@lib/document";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Button,
  Collapse,
  Divider,
  IconButton,
  List,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useFieldArray } from "react-hook-form";
import CarriculumDocs from "./CarriculumDocs";

const CourseCarriculum = ({ control, name }) => {
  const [documents, setDocuments] = useState([]);
  const [carriculums, setCarriculums] = useState([]);
  const { t } = useTranslation("creator-studio");
  const theme = useTheme();

  const { profile } = useAppSelector((state) => state.profile);

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

  useEffect(() => {
    const timer = setTimeout(async () => {
      const data = await getUserDocuments(profile?.id);
      setDocuments(data);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box>
      <Stack spacing={2} direction="row" justifyContent="space-between">
        <Typography sx={{ fontWeight: 600 }}>Carriculum</Typography>

        {documents?.length > 0 && (
          <Button
            sx={{ textTransform: "inherit" }}
            onClick={() =>
              append({
                title: "Section Title",
                description: "Section Description",
              })
            }
          >
            Append
          </Button>
        )}
      </Stack>

      <Divider sx={{ mb: 2 }} />

      <Box sx={{ height: "100%" }}>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="list">
            {(provided) => (
              <List
                className="list"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {fields.map(({ title, description, id }, i) => {
                  return (
                    <Draggable key={id} draggableId={id} index={i}>
                      {(innerProvided) => (
                        <Box
                          sx={{
                            border: `1px solid ${theme.palette.primary.grey2}`,
                            borderRadius: 3,
                            mb: 3,
                          }}
                          ref={innerProvided.innerRef}
                          {...innerProvided.draggableProps}
                        >
                          <Stack
                            direction="row"
                            alignItems="center"
                            sx={{
                              bgcolor: "primary.grey1",
                              p: 1,
                              borderTopLeftRadius: "inherit",
                              borderTopRightRadius: "inherit",
                            }}
                          >
                            <IconButton
                              size="small"
                              {...innerProvided.dragHandleProps}
                            >
                              <MenuIcon />
                            </IconButton>

                            <FormTextField
                              name={`${name}.${i}.title`}
                              placeholder="Title"
                              control={control}
                              fullWidth={false}
                              sx={{ flex: 1 }}
                            />

                            <IconButton size="small" onClick={() => remove(i)}>
                              <DeleteOutlinedIcon sx={{ fontSize: 18 }} />
                            </IconButton>
                          </Stack>

                          <Box sx={{ p: 2 }}>
                            <FormTextField
                              name={`${name}.${i}.description`}
                              placeholder="Description"
                              control={control}
                              fullWidth
                              multiline
                              sx={{ mb: 1 }}
                              // rows={2}
                            />

                            <Collapse in timeout="auto" unmountOnExit>
                              <CarriculumDocs
                                control={control}
                                name={`${name}.${i}.documents`}
                                documents={documents}
                              />
                            </Collapse>
                          </Box>

                          {provided.placeholder}
                        </Box>
                      )}
                    </Draggable>
                  );
                })}
              </List>
            )}
          </Droppable>
        </DragDropContext>
      </Box>
    </Box>
  );
};

export default React.memo(CourseCarriculum);
