import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import {
  DiscordIcon,
  ForumIcon,
  MAIcon,
  TwitterIcon,
} from "@page-components/Home/images";
import Image from "next/image";
import React from "react";

const SocialButton = ({ icon, text, color }) => (
  <Button sx={{ textTransform: "inherit" }}>
    <Stack spacing={0.5} justifyContent="center" alignItems="center">
      <Box sx={{ height: "100%", width: 55 }}>
        <Image
          src={icon}
          alt={text}
          layout="responsive"
          objectFit="contain"
          height="60px"
          width="100%"
        />
      </Box>
      <Typography variant="body2" sx={{ color, fontWeight: 600 }}>
        {text}
      </Typography>
    </Stack>
  </Button>
);

const Section4 = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Box sx={{ backgroundColor: "primary.grey1", p: { xs: 4, md: 6 } }}>
        <Stack
          spacing={4}
          justifyContent="center"
          alignItems="center"
          sx={{ textAlign: "center" }}
        >
          <Typography variant="h2" sx={{ color: "text.title" }}>
            Learn. Contribute. Innovate.
          </Typography>

          <Typography sx={{ maxWidth: 920 }}>
            Your one-stop guide to all things MakerDAO. Learn more about Maker,
            chat with the team, others in the community, and have your say in
            shaping the future if decentralized finance.
          </Typography>

          <Stack
            direction="row"
            justifyContent="center"
            spacing={{ xs: 2, sm: 4, md: 5 }}
            sx={{ pt: 2 }}
            flexWrap="wrap"
          >
            <SocialButton text="Discord" icon={DiscordIcon} color="#7289DA" />
            <SocialButton text="Forum" icon={ForumIcon} color="text.title" />
            <SocialButton text="Twitter" icon={TwitterIcon} color="#4AA1EC" />
            <SocialButton text="Join" icon={MAIcon} color="text.primary" />
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
};

export default Section4;
