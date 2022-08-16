import { Box, Stack, Tab, Tabs, Typography } from "@mui/material";
import React from "react";

const ELEMENTS = [
  {
    type: "radio",
    image:
      "https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png",
  },
  {
    type: "checkbox",
    image:
      "https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png",
  },
];

const QuestionTypes = ({ append }) => {
  return (
    <Box>
      <Tabs
        variant="scrollable"
        value={0}
        TabIndicatorProps={{ style: { display: "none" } }}
        sx={{
          "& .Mui-selected": {
            color: "text.primary",
          },
        }}
      >
        {ELEMENTS.map((item, i) => {
          return (
            <Tab
              label={
                <React.Fragment>
                  <Stack
                    spacing={1}
                    onClick={() => append({ type: item?.type })}
                  >
                    <img
                      src={item?.image}
                      alt={item?.type}
                      style={{
                        maxHeight: 100,
                        maxWidth: 100,
                        objectFit: "contain",
                      }}
                    />

                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Typography variant="body2">{item.type}</Typography>
                    </Stack>
                  </Stack>
                </React.Fragment>
              }
              key={i}
            />
          );
        })}
      </Tabs>
    </Box>
  );
};

export default QuestionTypes;
