import TranslateIcon from "@mui/icons-material/Translate";
import { IconButton, Menu, MenuItem } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import React, { useState } from "react";

const LOCALES = [
  { code: "en", name: "English" },
  { code: "fr", name: "Français" },
  { code: "es", name: "Español" },
  { code: "ru", name: "Pyccкий" },
  { code: "ar", name: "العربية" },
  { code: "zh", name: "中文" },
  { code: "hi", name: "हिन्दी" },
  { code: "sw", name: "Kiswahili" },
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
        PaperProps={{ sx: { width: 135 } }}
      >
        {LOCALES.map(({ code, name }) => (
          <MenuItem
            onClick={() => handleLanguageChange(code)}
            key={code}
            selected={code === lang}
          >
            {name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default LanguageMenu;
