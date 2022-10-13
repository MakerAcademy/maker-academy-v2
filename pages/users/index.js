import UsersBannerDark from "@assets/images/backgrounds/users-banner-dark.png";
import UsersBannerLight from "@assets/images/backgrounds/users-banner-light.png";
import GreenButton from "@components/buttons/GreenButton";
import ProfileCard from "@components/cards/ProfileCard";
import Title from "@components/Title";
import { CONTACT_ROLES } from "@constants/index";
import useDebounce from "@hooks/useDebounce";
import { useAppDispatch, useAppSelector } from "@hooks/useRedux";
import useScrollPosition from "@hooks/useScrollPosition";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Container,
  Grid,
  InputAdornment,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { fetchProfilesData } from "@redux/slices/profilesSlice";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useEffect, useState } from "react";

const StyledSearch = (props) => {
  return (
    <Box
      sx={{
        ".MuiFilledInput-root": {
          borderRadius: "12px !important",
        },
        ":focus-within > .MuiFormControl-root": {
          width: "350px !important",
        },
      }}
    >
      <TextField
        hiddenLabel
        variant="filled"
        size="small"
        sx={(theme) => ({
          ml: 1,
          width: 120,
          height: 40,
          transition: theme.transitions.create("width"),
          //   "& input::placeholder": {
          //     fontSize: "1rem",
          //   },
        })}
        InputProps={{
          disableUnderline: true,
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
        }}
        {...props}
      />
    </Box>
  );
};

const breadcrumbs = [
  <Link underline="hover" key="1" href="/" passHref>
    Home
  </Link>,
  <Typography key="3" color="text.primary">
    Users
  </Typography>,
];

const Profiles = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [userRoleFilter, setUserRoleFilter] = useState("show_all");
  const scrollPosition = useScrollPosition();
  const dispatch = useAppDispatch();
  const {
    profiles,
    filter,
    loading,
    order,
    pageSize,
    firstVisible,
    reachedLast,
    empty,
    lastVisible,
  } = useAppSelector((state) => state.profiles);
  const { t } = useTranslation("users");

  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  useEffect(() => {
    if (!!anchorEl) {
      setAnchorEl(null);
    }
  }, [scrollPosition]);

  const fetchQueries = {
    searchTerm: searchTerm,
    limit: 12,
    role: userRoleFilter === "show_all" ? null : userRoleFilter,
  };

  useEffect(() => {
    dispatch(fetchProfilesData(fetchQueries));
  }, [debouncedSearch, userRoleFilter]);

  const fetchMoreProfiles = () => {
    dispatch(fetchProfilesData({ merge: true, ...fetchQueries }));
  };

  const handleMenuSelect = (item) => {
    setUserRoleFilter(item);
    setAnchorEl(null);
  };

  return (
    <Container sx={{ py: 5 }} maxWidth="lg">
      {/* <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        sx={{ mb: 3 }}
      >
        {breadcrumbs}
      </Breadcrumbs> */}

      {/* Banner */}
      <Box sx={{ position: "relative", width: "100%", mb: 5, height: 220 }}>
        <img
          src={isDark ? UsersBannerDark : UsersBannerLight}
          alt={"Maker Academy Content Banner"}
          style={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
            borderRadius: 20,
          }}
        />

        <Box
          sx={{
            position: "absolute",
            top: "25%",
            transform: "translate(50%, 0%)",
          }}
        >
          <Stack
            spacing={2}
            // justifyContent="center"
            // alignItems="center"
            // sx={{ p: { xs: 4, md: 8 } }}
          >
            <Title
              variant={{ xs: "h4", md: "h2" }}
              sx={{ fontWeight: "600!important" }}
            >
              {t("search_users")}
            </Title>

            <Typography>Explore Maker Academy Users</Typography>
          </Stack>
        </Box>
      </Box>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 3 }}
      >
        <StyledSearch
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search.."
        />

        <Button
          onClick={(e) => setAnchorEl(e.currentTarget)}
          sx={{ textTransform: "inherit", height: 48, borderRadius: "12px" }}
        >
          <Typography
            sx={{ fontWeight: 500, color: "grey.grey7" }}
            variant="body2"
          >
            Role: {t(userRoleFilter)}
          </Typography>

          {!!anchorEl ? (
            <KeyboardArrowUpIcon fontSize="small" sx={{ ml: 1 }} />
          ) : (
            <KeyboardArrowDownIcon fontSize="small" sx={{ ml: 1 }} />
          )}
        </Button>
      </Stack>

      <Grid container spacing={3}>
        {profiles?.map?.((item, i) => (
          <Grid item key={i} xs={12} sm={6} md={4} lg={3}>
            <ProfileCard {...item} />
          </Grid>
        ))}
      </Grid>

      <Stack
        width="100%"
        alignItems="center"
        justifyContent="center"
        sx={{ mt: { xs: 5, md: 10 } }}
      >
        {loading && <Title variant="h6"> {t("loading")}... </Title>}

        {!loading && !empty && !reachedLast && (
          <GreenButton
            variant="outlined"
            size="small"
            onClick={fetchMoreProfiles}
          >
            {t("load_more")}
          </GreenButton>
        )}

        {empty && <Title variant="h6">{t("no_data")}</Title>}
      </Stack>

      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
        disableScrollLock={true}
      >
        <MenuItem onClick={() => handleMenuSelect("show_all")}>
          {t("show_all")}
        </MenuItem>

        {CONTACT_ROLES.map(({ name }) => (
          <MenuItem key={name} onClick={() => handleMenuSelect(name)}>
            {t(name)}
          </MenuItem>
        ))}
      </Menu>
    </Container>
  );
};

export default Profiles;
