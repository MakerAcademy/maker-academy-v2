import GreenButton from "@components/buttons/GreenButton";
import LanguageMenu from "@components/buttons/LanguageButton";
import ThemeSwitch from "@components/buttons/ThemeSwitch";
import { useAppSelector } from "@hooks/useRedux";
import { handleSignOut } from "@lib/auth";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  Avatar,
  IconButton,
  Link,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import Router from "next/router";
import { useState } from "react";

const ActionButtons = ({ theme }) => {
  const [userAnchorEl, setUserAnchorEl] = useState(null);
  const { user } = useAppSelector((state) => state.user);
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
        <Tooltip title="Account">
          <IconButton onClick={(e) => setUserAnchorEl(e.currentTarget)}>
            <Avatar
              // sx={{ width: 32, height: 32 }}
              src={user.displayImage}
            />
          </IconButton>
        </Tooltip>
      )}

      {!user && (
        <Link href="/login">
          <GreenButton size="small">Login</GreenButton>
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
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
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
          <MenuItem
            onClick={() => {
              setUserAnchorEl(null);
              Router.push("/app/studio");
            }}
          >
            <ListItemIcon>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="body2">{t("my_account")}</Typography>
          </MenuItem>

          {isAdmin && (
            <MenuItem
              onClick={() => {
                setUserAnchorEl(null);
                Router.push("/app/admin");
              }}
            >
              <ListItemIcon>
                <AdminPanelSettingsOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="body2">{t("admin")}</Typography>
            </MenuItem>
          )}

          <MenuItem
            onClick={() => {
              setUserAnchorEl(null);
              Router.push("/app/studio");
            }}
          >
            <ListItemIcon>
              <OndemandVideoIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="body2">{t("creator_studio")}</Typography>
          </MenuItem>

          <MenuItem
            onClick={() => {
              setUserAnchorEl(null);
              handleSignOut();
            }}
          >
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="body2">{t("logout")}</Typography>
          </MenuItem>
        </Menu>
      )}
    </Stack>
  );
};

export default ActionButtons;
