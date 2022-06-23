import { DASHBOARD_SIDE_DRAWER_WIDTH } from "@constants/";
import { useAppDispatch, useAppSelector } from "@hooks/useRedux";
import AccountCircleIcon from "@mui/icons-material/AccountCircleOutlined";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import DashboardIcon from "@mui/icons-material/DashboardOutlined";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideoOutlined";
import {
  Avatar,
  Box,
  Button,
  Drawer,
  Hidden,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { setGlobalState } from "@redux/slices/globalSlice";
import Link from "next/link";
import MenuItems from "./MenuItems";

const MENU_ITEMS = [
  {
    link: "/dashboard",
    grants: [],
    text: "dashboard",
    icon: DashboardIcon,
  },
  {
    link: "/app/studio",
    grants: [],
    text: "creator_studio",
    icon: OndemandVideoIcon,
  },
  {
    link: "/app/admin",
    grants: [],
    text: "admin",
    icon: AdminPanelSettingsIcon,
  },
  {
    grants: [],
    text: "my_account",
    icon: AccountCircleIcon,
    nestedItems: [
      {
        link: "/app/profile",
        grants: [],
        text: "profile",
      },
      {
        link: "/app/account",
        grants: [],
        text: "account",
      },
    ],
  },
];

const userProfile = {
  photoURL: "",
  firstName: "Salman",
  lastName: "Fazal",
  title: "Student",
};

const UpgradeBox = () => (
  <Box sx={{ px: 2.5, pb: 3 }}>
    <Stack
      alignItems="center"
      spacing={2}
      sx={{
        p: 2.5,
        borderRadius: 2,
        position: "relative",
        bgcolor: "grey.200",
      }}
    >
      <Typography variant="h6">Get more?</Typography>
      <Typography>From only $69</Typography>
      <Button variant="contained">Upgrade to pro</Button>
    </Stack>
  </Box>
);

const Content = () => {
  const theme = useTheme();

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
          <Typography variant="h4">
            Maker Academy
            <br />
            Logo
          </Typography>
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
              p: theme.spacing(2, 2.5),
              borderRadius: "12px",
              bgcolor: "grey.200",
            }}
          >
            <Avatar src={userProfile?.photoURL} alt="photoURL" />
            <Box sx={{ ml: 2 }}>
              <Typography variant="body2">
                {userProfile?.firstName} {userProfile?.lastName}
              </Typography>
              <Typography variant="body2">
                Status: {userProfile?.title}
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
              bgcolor: "background.default",
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
