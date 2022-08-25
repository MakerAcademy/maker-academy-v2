import Title from "@components/Title";
import { Box, Typography } from "@mui/material";
import React from "react";

const AboutMission = () => {
  return (
    <Box>
      {/* Mission */}
      <Title variant={{ xs: "h4", md: "h3" }} sx={{ mb: { xs: 3, md: 4 } }}>
        Mission
      </Title>

      <Title variant="h5" sx={{ mb: { xs: 2, md: 3 } }}>
        Introduction
      </Title>

      <Typography sx={{ mb: 7, whiteSpace: "pre-line" }}>
        {
          "MakerDAO is a decentralized autonomous organization (DAO) responsible for maintaining the Maker protocol. The Maker Protocol allows users to mint DAI - decentralized stablecoin pegged to the US dollar - in return for collateral.\n\nRune Christensen, a Danish Entrepreneur, created MakerDAO in 2014[1]. Over the next few years, MakerDAO's governance went from the centralized stewardship of the Maker Foundation to fully 100% decentralized.\n\nIn this course, we will learn how the Maker Foundation and the community laid down the elements of decentralization and how our DAO has incorporated various innovations to ensure robust governance. Here is an overview of everything you will learn:"
        }
      </Typography>

      {/* Vision */}
      <Title variant={{ xs: "h4", md: "h3" }} sx={{ mb: { xs: 3, md: 4 } }}>
        Vision
      </Title>

      <Title variant="h5" sx={{ mb: { xs: 2, md: 3 } }}>
        Introduction
      </Title>

      <Typography sx={{ mb: 7, whiteSpace: "pre-line" }}>
        {
          "MakerDAO is a  decentralized autonomous organization (DAO) responsible for maintaining the Maker protocol. The Maker Protocol allows users to mint DAI - decentralized stablecoin pegged to the US dollar - in return for collateral.\n\nRune Christensen, a Danish Entrepreneur, created MakerDAO in 2014[1]. Over the next few years, MakerDAO's governance went from the centralized stewardship of the Maker Foundation to fully 100% decentralized.\n\nIn this course, we will learn how the Maker Foundation and the community laid down the elements of decentralization and how our DAO has incorporated various innovations to ensure robust governance. Here is an overview of everything you will learn:"
        }
      </Typography>

      {/* Strategy */}
      <Title variant={{ xs: "h4", md: "h3" }} sx={{ mb: { xs: 3, md: 4 } }}>
        Strategy
      </Title>

      <Title variant="h5" sx={{ mb: { xs: 2, md: 3 } }}>
        Introduction
      </Title>

      <Typography sx={{ mb: 8, whiteSpace: "pre-line" }}>
        {
          "MakerDAO is a  decentralized autonomous organization (DAO) responsible for maintaining the Maker protocol. The Maker Protocol allows users to mint DAI - decentralized stablecoin pegged to the US dollar - in return for collateral.\n\nRune Christensen, a Danish Entrepreneur, created MakerDAO in 2014[1]. Over the next few years, MakerDAO's governance went from the centralized stewardship of the Maker Foundation to fully 100% decentralized.\n\nIn this course, we will learn how the Maker Foundation and the community laid down the elements of decentralization and how our DAO has incorporated various innovations to ensure robust governance. Here is an overview of everything you will learn:"
        }
      </Typography>
    </Box>
  );
};

export default AboutMission;
