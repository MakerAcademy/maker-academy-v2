import Title from "@components/Title";
import { useAppSelector } from "@hooks/useRedux";
import {
  Box,
  Button,
  Container,
  Stack,
  Tooltip,
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
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import { Bounce, Fade } from "react-awesome-reveal";

const SocialButton = ({
  icon,
  text,
  color,
  tooltip,
  delay = 0,
  href,
  newTab,
}) => (
  <Tooltip title={tooltip}>
    <Button
      sx={{ textTransform: "inherit" }}
      href={href}
      target={newTab ? "_blank" : "_self"}
    >
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
  </Tooltip>
);

const Section4 = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const { profile } = useAppSelector((state) => state.profile);

  const { t } = useTranslation("home");

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
              {t("section4_learn_contribute_innovate")}
            </Title>
          </Fade>

          <Fade delay={100} triggerOnce>
            <Typography sx={{ maxWidth: 920 }}>
              {t("section4_description")}
            </Typography>
          </Fade>

          <Stack
            direction="row"
            justifyContent="center"
            spacing={{ xs: 2, sm: 4, md: 5 }}
            sx={{ pt: 2 }}
            flexWrap="wrap"
          >
            <SocialButton
              text="Discord"
              icon={DiscordIcon}
              color="#7289DA"
              href={"https://discord.gg/FAQWbM5p"}
              newTab
              tooltip={"Join Our Discord Channel"}
            />

            {/* <SocialButton
              text={t("section4_forum")}
              icon={ForumIcon}
              color="text.title"
              delay={50}
            /> */}

            <SocialButton
              text="Twitter"
              icon={TwitterIcon}
              color="#4AA1EC"
              delay={100}
              href={"https://discord.gg/FAQWbM5p"}
              newTab
              tooltip={"Check out our Twitter page"}
            />

            <SocialButton
              text={t("section4_join")}
              icon={isDark ? MAWhiteIcon : MAIcon}
              color="text.primary"
              delay={150}
              href={profile?.id ? "/content" : "/login"}
              tooltip={"Sign up to the Maker platform"}
            />
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
};

export default Section4;
