import TranslateIcon from "@mui/icons-material/Translate";
import {
  Button,
  IconButton,
  Stack,
  Menu,
  MenuItem,
  Typography,
  Tooltip,
  useTheme,
} from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import React, { useState } from "react";
import setLanguage from "next-translate/setLanguage";
import ReactCountryFlag from "react-country-flag";

const LOCALES = [
  { code: "en", name: "English", flag: "US" },
  { code: "fr", name: "Français", flag: "FR" },
  { code: "es", name: "Español", flag: "ES" },
  { code: "ru", name: "Pyccкий", flag: "RU" },
  { code: "ar", name: "العربية", flag: "SA" },
  { code: "zh", name: "中文", flag: "CN" },
  { code: "hi", name: "हिन्दी", flag: "IN" },
  { code: "sw", name: "Kiswahili", flag: "TZ" },
];

export const handleLanguageChange = async (lang, router, pathname) => {
  await setLanguage(lang);
  if (router && pathname) {
    await router.replace(pathname, pathname, { locale: lang });
  }

  return null;
};

const LanguageMenu = ({ fullWidth, sx = {}, ...other }) => {
  const theme = useTheme();
  const [langAnchor, setLangAnchor] = useState(null);

  const { t, lang } = useTranslation("common");

  return (
    <>
      {fullWidth && (
        <Button
          sx={{ textTransform: "inherit", color: "inherit" }}
          onClick={(e) => setLangAnchor(e.currentTarget)}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
            spacing={1}
            sx={{ width: "100%" }}
          >
            <Typography>{t("change_language")}</Typography>
            <TranslateIcon
              fontSize="small"
              sx={{
                color: theme.palette.text.primary,
              }}
            />
          </Stack>
        </Button>
      )}

      {!fullWidth && (
        <Tooltip title={t("change_language")}>
          <IconButton
            size="large"
            onClick={(e) => setLangAnchor(e.currentTarget)}
            color="inherit"
            sx={{ ...sx }}
            {...other}
          >
            <TranslateIcon
              sx={{
                color: theme.palette.text.primary,
              }}
            />
          </IconButton>
        </Tooltip>
      )}

      <Menu
        anchorEl={langAnchor}
        keepMounted
        open={Boolean(langAnchor)}
        onClose={() => setLangAnchor(null)}
        // onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            borderRadius: 3,
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.1))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {LOCALES.map(({ code, name, flag }) => (
          <MenuItem
            onClick={() => handleLanguageChange(code)}
            key={code}
            selected={code === lang}
            sx={{
              width: 155,
            }}
          >
            <ReactCountryFlag
              countryCode={flag}
              style={{
                fontSize: "1.1em",
                borderRadius: "6px",
              }}
              svg
            />

            <Typography variant="body2" sx={{ ml: 1.5 }}>
              {name}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default LanguageMenu;
