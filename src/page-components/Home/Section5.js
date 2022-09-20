import Title from "@components/Title";
import { useAppSelector } from "@hooks/useRedux";
import {
  Box,
  Container,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import { Fade } from "react-awesome-reveal";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { BlurSection3 } from "./images";
import { useState } from "react";
import { validateEmail } from "@utils/helperFunctions";
import { submitHomepageEmail } from "@lib/homepage";

const Section5 = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const disabled = submitted || !validateEmail(email);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateEmail(email)) {
      await submitHomepageEmail(email).then(() => {
        setSubmitted(true);
      });
    }
  };

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
          position: "relative",
          borderRadius: "16px",
          filter: "drop-shadow(0px 2px 10px rgba(24, 39, 75, 0.05))",
          background: isDark
            ? theme.palette.background.gradient1
            : theme.palette.grey.grey1,
          overflow: "hidden",
        }}
      >
        <img
          loading="lazy"
          src={BlurSection3}
          alt="Blur 3"
          style={{
            position: "absolute",
            zIndex: -1,
            objectPosition: "left",
            objectFit: "contain",
            filter: "blur(20px)",
          }}
        />

        <Stack
          spacing={3}
          justifyContent="center"
          alignItems="center"
          sx={{ textAlign: "center", p: { xs: 4, md: 9 } }}
        >
          <Fade triggerOnce>
            <Title variant="h2" sx={{ color: "text.title" }}>
              {t("section5_learn_contribute_innovate")}
            </Title>
          </Fade>

          <Fade delay={100} triggerOnce>
            <Typography sx={{ maxWidth: 920, pb: 1, fontWeight: 500 }}>
              {t("section5_description")}
            </Typography>
          </Fade>

          <Box sx={{ width: "100%" }}>
            <form onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                value={email}
                onChange={handleChange}
                disabled={!!submitted}
                sx={{
                  maxWidth: 450,
                  height: 46,
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "primary.main",
                    },
                    "& fieldset": {
                      borderColor: "text.invert",
                    },
                  },
                }}
                placeholder={t("section5_enter_your_email")}
                hiddenLabel
                InputProps={{
                  sx: {
                    bgcolor: "text.invert",
                    boxShadow:
                      "0px 1px 2px rgba(50, 50, 71, 0.08), 0px 0px 1px rgba(50, 50, 71, 0.2)",
                    borderRadius: "6px",
                  },
                  // disableUnderline,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        type="submit"
                        disabled={disabled}
                      >
                        <ArrowForwardIcon fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                helperText={submitted && "Thank you for submitting your email!"}
              />
            </form>
          </Box>
        </Stack>
      </Box>
    </Container>
  );
};

export default Section5;
