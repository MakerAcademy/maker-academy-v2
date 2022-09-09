import GreenButton from "@components/buttons/GreenButton";
import LanguageMenu from "@components/buttons/LanguageButton";
import ThemeSwitch from "@components/buttons/ThemeSwitch";
import { useAppSelector } from "@hooks/useRedux";
import { handleSignOut } from "@lib/auth";
import {
  Avatar,
  Divider,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import Router from "next/router";
import { useState } from "react";

const ActionButtons = () => {
  const theme = useTheme();
  const [userAnchorEl, setUserAnchorEl] = useState(null);
  const { user } = useAppSelector((state) => state.user);
  const { profile } = useAppSelector((state) => state.profile);
  const isAdmin = user?.trustLevel >= 3;
  const { t } = useTranslation("common");

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      alignItems="center"
      spacing={{ xs: 2, md: 3 }}
    >
      <LanguageMenu sx={{ color: theme.palette.text.main }} />

      <ThemeSwitch />

      {user && (
        <Tooltip title={t("account")}>
          <IconButton onClick={(e) => setUserAnchorEl(e.currentTarget)}>
            <Avatar
              // sx={{ width: 32, height: 32 }}
              src={user?.displayImage}
            />
          </IconButton>
        </Tooltip>
      )}

      {!user && (
        <Link href="/login">
          <GreenButton size="small">{t("login")}</GreenButton>
        </Link>
      )}

      {!!userAnchorEl && (
        <Menu
          anchorEl={userAnchorEl}
          id="account-menu"
          open={!!userAnchorEl}
          onClose={() => setUserAnchorEl(null)}
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
          <MenuItem sx={{ pointerEvents: "none", minWidth: 180 }}>
            <Stack>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, color: "text.title" }}
              >
                {profile?.firstName} {profile?.lastName}
              </Typography>
              <Typography variant="body2">{t("admin")}</Typography>
            </Stack>
          </MenuItem>

          <Divider />

          <MenuItem
            onClick={() => {
              setUserAnchorEl(null);
              Router.push("/app/studio");
            }}
          >
            <Typography variant="body2">{t("creator_studio")}</Typography>
          </MenuItem>

          <MenuItem
            onClick={() => {
              setUserAnchorEl(null);
              Router.push("/app/settings");
            }}
          >
            <Typography variant="body2">{t("profile")}</Typography>
          </MenuItem>

          {isAdmin && (
            <MenuItem
              onClick={() => {
                setUserAnchorEl(null);
                Router.push("/app/admin/pending_content");
              }}
            >
              <Typography variant="body2">{t("admin")}</Typography>
            </MenuItem>
          )}

          <Divider />

          <MenuItem
            onClick={() => {
              setUserAnchorEl(null);
              handleSignOut();
            }}
          >
            <Typography variant="body2">{t("logout")}</Typography>
          </MenuItem>
        </Menu>
      )}
    </Stack>
  );
};

export default ActionButtons;
