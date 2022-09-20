import OpenBook from "@assets/images/icons/open-book.png";
import GreenButton from "@components/buttons/GreenButton";
import { DASHBOARD_SIDE_DRAWER_WIDTH } from "@constants/";
import { useAppDispatch, useAppSelector } from "@hooks/useRedux";
import AccountCircleIcon from "@mui/icons-material/AccountCircleOutlined";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import DashboardIcon from "@mui/icons-material/DashboardOutlined";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideoOutlined";
import GTranslateOutlinedIcon from "@mui/icons-material/GTranslateOutlined";
import {
  Avatar,
  Box,
  Drawer,
  Hidden,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { setGlobalState } from "@redux/slices/globalSlice";
import { FullLogoBlack, FullLogoWhite } from "@utils/images";
import Link from "next/link";
import MenuItems from "./MenuItems";
import useTranslation from "next-translate/useTranslation";

const MENU_ITEMS = [
  {
    link: "/app",
    trustLevel: 1,
    text: "dashboard",
    icon: DashboardIcon,
  },
  {
    trustLevel: 2,
    text: "creator_studio",
    link: "/app/studio",
    icon: OndemandVideoIcon,
    // nestedItems: [
    //   {
    //     link: "/app/studio",
    //     trustLevel: 2,
    //     text: "my_content",
    //   },
    //   {
    //     link: "/app/studio/new/document",
    //     trustLevel: 2,
    //     text: "new_document",
    //   },
    //   {
    //     link: "/app/studio/new/course",
    //     trustLevel: 2,
    //     text: "new_course",
    //   },
    //   {
    //     link: "/app/studio/new/assessment",
    //     trustLevel: 2,
    //     text: "new_assessment",
    //   },
    // ],
  },
  {
    link: "/app/admin",
    trustLevel: 4,
    text: "admin",
    icon: AdminPanelSettingsIcon,
    nestedItems: [
      {
        link: "/app/admin/pending_content",
        trustLevel: 4,
        text: "pending_content",
        icon: GTranslateOutlinedIcon,
      },
      {
        link: "/app/admin/published_content",
        trustLevel: 4,
        text: "published_content",
        icon: GTranslateOutlinedIcon,
      },
      {
        link: "/app/admin/users",
        trustLevel: 4,
        text: "users",
        icon: GTranslateOutlinedIcon,
      },
      {
        link: "/app/admin/contacts",
        trustLevel: 4,
        text: "contacts",
        icon: GTranslateOutlinedIcon,
      },
      {
        link: "/app/admin/locales",
        trustLevel: 4,
        text: "locales",
        icon: GTranslateOutlinedIcon,
      },
    ],
  },

  {
    link: "/app/settings",
    trustLevel: 1,
    text: "settings",
    icon: AccountCircleIcon,
  },
];

const UpgradeBox = () => (
  <Box sx={{ px: 2.5, pb: 3 }}>
    <Stack
      alignItems="center"
      spacing={1}
      sx={{
        p: 2.5,
        borderRadius: 2,
        position: "relative",
        bgcolor: "grey.grey1",
      }}
    >
      <img
        src={OpenBook}
        alt="Open Book Icon"
        style={{ width: 160, objectFit: "contain" }}
      />

      <Typography variant="body2" sx={{ fontWeight: 600, pt: 1 }}>
        New to Maker Academy?
      </Typography>

      <Typography variant="body2" sx={{ pb: 3 }}>
        Please check our docs
      </Typography>

      <GreenButton variant="contained" size="small">
        Documentation
      </GreenButton>
    </Stack>
  </Box>
);

const Content = () => {
  const { profile } = useAppSelector((state) => state.profile);
  const theme = useTheme();

  const { t } = useTranslation("common");

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Logo */}
      <Link href="/">
        <Box sx={{ px: 2.5, py: 3, cursor: "pointer" }}>
          <img
            loading="lazy"
            src={theme.palette.mode === "dark" ? FullLogoWhite : FullLogoBlack}
            alt={"Maker Academy Logo"}
            style={{
              height: 40,
              objectFit: "contain",
              cursor: "pointer",
              zIndex: 999,
            }}
          />
          {/* <img
            alt="Maker Academy Logo"
            src=""
            style={{ maxHeight: "50px", width: "100%", objectFit: "contain" }}
          /> */}
        </Box>
      </Link>

      {/* Account */}
      <Box sx={{ mb: 3, mx: 2.5 }}>
        <Link href="#" style={{ textDecoration: "none" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              borderRadius: "24px",
              px: 2,
              py: 1.5,
              bgcolor: "grey.grey1",
            }}
          >
            <Avatar
              src={profile?.profilePicture}
              alt="photoURL"
              sx={{ height: "40px", width: "40px" }}
            />

            <Box sx={{ ml: 1 }}>
              <Typography
                variant="body2"
                sx={{ fontWeight: 300, color: "grey.grey6" }}
              >
                {t(profile?.role)}
              </Typography>

              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {profile?.firstName} {profile?.lastName}
              </Typography>
            </Box>
          </Box>
        </Link>
      </Box>

      {/* Menu Items */}
      <MenuItems items={MENU_ITEMS} />

      <Box sx={{ flexGrow: 1 }} />

      {/* Upgrade */}
      <UpgradeBox />
    </Box>
  );
};

const DashboardSidebar = () => {
  const { global } = useAppSelector((state) => state.global);
  const { drawerMenuOpen } = global;
  const dispatch = useAppDispatch();

  const theme = useTheme();

  const handleDrawerToggle = () => {
    dispatch(setGlobalState({ drawerMenuOpen: !drawerMenuOpen }));
  };

  return (
    <Box
      sx={{
        [theme.breakpoints.up("lg")]: {
          flexShrink: 0,
          width: drawerMenuOpen ? DASHBOARD_SIDE_DRAWER_WIDTH : 0,
        },
      }}
    >
      <Hidden lgUp>
        <Drawer
          open={drawerMenuOpen}
          onClose={handleDrawerToggle}
          PaperProps={{
            sx: { width: DASHBOARD_SIDE_DRAWER_WIDTH },
          }}
        >
          <Content />
        </Drawer>
      </Hidden>

      <Hidden lgDown>
        <Drawer
          open={drawerMenuOpen}
          variant="persistent"
          PaperProps={{
            sx: {
              width: DASHBOARD_SIDE_DRAWER_WIDTH,
              bgcolor: "background.main",
            },
          }}
        >
          <Content />
        </Drawer>
      </Hidden>
    </Box>
  );
};

export default DashboardSidebar;
