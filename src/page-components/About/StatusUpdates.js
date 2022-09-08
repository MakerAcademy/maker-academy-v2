import Title from "@components/Title";
import { Box, Paper, Stack, Typography } from "@mui/material";
import React from "react";

const updates = [
  {
    title: "Maker Academy Update 1",
    description:
      "MakerDAO is a  decentralized autonomous organization (DAO) responsible for maintaining the Maker protocol. The Maker Protocol allows users to mint DAI - decentralized stablecoin pegged to the US dollar - in return for collateral. ",
  },
  {
    title: "Maker Academy Update 2",
    description:
      "MakerDAO is a  decentralized autonomous organization (DAO) responsible for maintaining the Maker protocol. The Maker Protocol allows users to mint DAI - decentralized stablecoin pegged to the US dollar - in return for collateral. ",
  },
  {
    title: "Maker Academy Update 3",
    description:
      "MakerDAO is a  decentralized autonomous organization (DAO) responsible for maintaining the Maker protocol. The Maker Protocol allows users to mint DAI - decentralized stablecoin pegged to the US dollar - in return for collateral. ",
  },
  {
    title: "Maker Academy Update 4",
    description:
      "MakerDAO is a  decentralized autonomous organization (DAO) responsible for maintaining the Maker protocol. The Maker Protocol allows users to mint DAI - decentralized stablecoin pegged to the US dollar - in return for collateral. ",
  },
  {
    title: "Maker Academy Update 5",
    description:
      "MakerDAO is a  decentralized autonomous organization (DAO) responsible for maintaining the Maker protocol. The Maker Protocol allows users to mint DAI - decentralized stablecoin pegged to the US dollar - in return for collateral. ",
  },
];

const AboutStatusUpdates = () => {
  return (
    <Box>
      <Title variant={{ xs: "h4", md: "h3" }} sx={{ mb: { xs: 3, md: 5 } }}>
        Status Updates
      </Title>

      <Stack spacing={3}>
        {updates.map((item, i) => (
          <Paper
            key={i}
            sx={{
              cursor: "pointer",
              p: 2.5,
              borderRadius: "16px",
              boxShadow: "0px 2px 10px rgba(24, 39, 75, 0.05)",
              "&:hover": {
                boxShadow: "0px 4px 10px rgba(24, 39, 75, 0.2)",
                transform: "scale(1.01)",
              },
            }}
          >
            <Typography sx={{ mb: 2, fontWeight: 600 }}>
              {item.title}
            </Typography>

            <Typography color="grey.grey5">{item.description}</Typography>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
};

export default AboutStatusUpdates;
