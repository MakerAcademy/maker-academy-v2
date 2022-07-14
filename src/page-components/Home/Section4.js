import Title from "@components/Title";
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import {
  DiscordIcon,
  ForumIcon,
  MAIcon,
  MAWhiteIcon,
  TwitterIcon,
} from "@page-components/Home/images";
import Image from "next/image";
import { Bounce, Fade } from "react-awesome-reveal";

const SocialButton = ({ icon, text, color, delay = 0 }) => (
  <Button sx={{ textTransform: "inherit" }}>
    <Bounce delay={delay} triggerOnce>
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
    </Bounce>
  </Button>
);

const Section4 = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 5,
        [theme.breakpoints.up("md")]: {
          px: 10,
        },
        [theme.breakpoints.up("lg")]: {
          px: 3,
        },
      }}
    >
      <Box
        sx={{
          borderRadius: 2,
          background: isDark
            ? theme.palette.background.gradient1
            : theme.palette.primary.grey1,
          p: { xs: 4, md: 6 },
        }}
      >
        <Stack
          spacing={4}
          justifyContent="center"
          alignItems="center"
          sx={{ textAlign: "center" }}
        >
          <Fade triggerOnce>
            <Title variant="h2" sx={{ color: "text.title" }}>
              Learn. Contribute. Innovate.
            </Title>
          </Fade>

          <Fade delay={100} triggerOnce>
            <Typography sx={{ maxWidth: 920 }}>
              Your one-stop guide to all things MakerDAO. Learn more about
              Maker, chat with the team, others in the community, and have your
              say in shaping the future if decentralized finance.
            </Typography>
          </Fade>

          <Stack
            direction="row"
            justifyContent="center"
            spacing={{ xs: 2, sm: 4, md: 5 }}
            sx={{ pt: 2 }}
            flexWrap="wrap"
          >
            <SocialButton text="Discord" icon={DiscordIcon} color="#7289DA" />
            <SocialButton
              text="Forum"
              icon={ForumIcon}
              color="text.title"
              delay={50}
            />
            <SocialButton
              text="Twitter"
              icon={TwitterIcon}
              color="#4AA1EC"
              delay={100}
            />
            <SocialButton
              text="Join"
              icon={isDark ? MAWhiteIcon : MAIcon}
              color="text.primary"
              delay={150}
            />
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
};

export default Section4;
