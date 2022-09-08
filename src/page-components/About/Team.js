import Title from "@components/Title";
import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import React from "react";

const team = [
  { name: "Colby", title: "Product" },
  { name: "Sam", title: "Product" },
  { name: "Ashley", title: "Product" },
  { name: "Raj", title: "Product" },
];

const AboutTeam = () => {
  return (
    <Box>
      <Title variant={{ xs: "h4", md: "h3" }} sx={{ mb: { xs: 3, md: 4 } }}>
        Team
      </Title>

      <Typography sx={{ mb: 7 }}>
        {
          "MakerDAO is a  decentralized autonomous organization (DAO) responsible for maintaining the Maker protocol. The Maker Protocol allows users to mint DAI - decentralized stablecoin pegged to the US dollar - in return for collateral. "
        }
      </Typography>

      <Grid container spacing={3}>
        {team.map((item, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Paper
              sx={{
                borderRadius: "16px",
                boxShadow: "0px 2px 10px rgba(24, 39, 75, 0.05)",
                "&:hover": {
                  boxShadow: "0px 4px 10px rgba(24, 39, 75, 0.2)",
                  transform: "scale(1.01)",
                },
              }}
            >
              {/* Image */}
              <Box
                sx={{
                  bgcolor: "grey.grey3",
                  height: 150,
                  borderTopLeftRadius: "inherit",
                  borderTopRightRadius: "inherit",
                }}
              ></Box>

              <Stack spacing={1} sx={{ p: 2 }}>
                <Typography sx={{ fontWeight: 600 }}>{item.name}</Typography>
                <Typography color="grey.grey5">{item.title}</Typography>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AboutTeam;
