import TranslateIcon from "@mui/icons-material/Translate";
import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
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

const LanguageMenu = ({ sx = {}, ...other }) => {
  const [langAnchor, setLangAnchor] = useState(null);

  const { t, lang } = useTranslation();

  return (
    <>
      <IconButton
        size="large"
        onClick={(e) => setLangAnchor(e.currentTarget)}
        color="inherit"
        sx={{ ...sx }}
        {...other}
      >
        <TranslateIcon />
      </IconButton>

      <Menu
        anchorEl={langAnchor}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(langAnchor)}
        onClose={() => setLangAnchor(null)}
        PaperProps={{ sx: { width: 155 } }}
      >
        {LOCALES.map(({ code, name, flag }) => (
          <MenuItem
            onClick={() => handleLanguageChange(code)}
            key={code}
            selected={code === lang}
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
