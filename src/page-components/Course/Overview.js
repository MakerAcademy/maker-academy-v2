import { Box, Typography, Grid, Stack } from "@mui/material";
import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

const DESCRIPTION =
  "Excepteur ipsum incididunt cillum commodo nostrud labore et veniam cupidatat sit. Laborum fugiat ipsum ullamco exercitation elit quis pariatur dolor pariatur esse. Est duis sunt ullamco eu pariatur sit. Nulla officia ullamco consectetur nulla esse magna in nisi elit irure elit aute incididunt. Dolor do cupidatat ex qui incididunt duis cillum elit pariatur. Ad quis amet cillum quis cupidatat et eu deserunt pariatur. Eiusmod occaecat consectetur dolore laboris duis veniam. Pariatur in aliquip culpa magna incididunt. Deserunt in ut culpa anim ea quis laborum enim ad.\n\nExcepteur aute id incididunt mollit quis occaecat. Sit velit ipsum mollit ea est fugiat enim aute id nostrud qui laboris. Enim voluptate id reprehenderit voluptate pariatur nisi veniam qui incididunt tempor ut adipisicing veniam non. Elit commodo excepteur incididunt consequat. Pariatur reprehenderit deserunt velit id. Cupidatat sint fugiat labore nisi do voluptate laboris aliqua minim cupidatat pariatur ea amet. Magna occaecat adipisicing labore aliqua commodo sit reprehenderit in est eu consectetur proident nisi.\n\nExcepteur aute id incididunt mollit quis occaecat. Sit velit ipsum mollit ea est fugiat enim aute id nostrud qui laboris. Enim voluptate id reprehenderit voluptate pariatur nisi veniam qui incididunt tempor ut adipisicing veniam non. Elit commodo excepteur incididunt consequat. Pariatur reprehenderit deserunt velit id. Cupidatat sint fugiat labore nisi do voluptate laboris aliqua minim cupidatat pariatur ea amet. Magna occaecat adipisicing labore aliqua commodo sit reprehenderit in est eu consectetur proident nisi.";

const OUTCOMES = Array(10)
  .fill(null)
  .map((i) => "Enim laboris labore cupidatat do reprehenderit.");

const Overview = ({ description = DESCRIPTION, outcomes = OUTCOMES }) => {
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Description
      </Typography>

      <Typography sx={{ whiteSpace: "pre-line", mb: { xs: 5, md: 8 } }}>
        {description}
      </Typography>

      <Typography variant="h5" sx={{ mb: 3 }}>
        What you will learn
      </Typography>

      <Grid container spacing={3}>
        {outcomes.map((item, i) => (
          <Grid item xs={12} md={6} key={i}>
            <Stack direction="row" spacing={1} alignItems="center">
              <CheckCircleIcon />
              <Typography>{item}</Typography>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Overview;
