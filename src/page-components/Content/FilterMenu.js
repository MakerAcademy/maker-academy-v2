import {
  BRANDS,
  CONTENT_CATEGORIES,
  CONTENT_DIFFICULTY_LEVELS,
} from "@constants/";
import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Chip,
  Collapse,
  Container,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import { useState } from "react";

const typeBtnCommonStyles = {
  color: "inherit",
  height: 40,
  px: 2,
  fontSize: 14,
  borderRadius: "12px",
};

const StyledSearch = () => {
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
        placeholder="Search"
        sx={(theme) => ({
          m: 1,
          width: "110px",
          height: 40,
          transition: theme.transitions.create("width"),
          "& input::placeholder": {
            fontSize: 14,
          },
        })}
        InputProps={{
          disableUnderline: true,
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

const StyledChip = ({ label, selected }) => {
  return (
    <Box
      sx={{
        mr: 1,
        mb: 1,
        borderRadius: 1,
        backgroundColor: "primary.grey2",
        cursor: "pointer",
        "& :hover": { backgroundColor: "primary.grey1" },
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        spacing={0.5}
        sx={{
          px: 1,
          py: 0.5,
        }}
      >
        <Typography variant="body2">{label}</Typography>

        {selected ? (
          <DoneIcon sx={{ fontSize: 16 }} />
        ) : (
          <AddIcon sx={{ fontSize: 16 }} />
        )}
      </Stack>
    </Box>
  );
};

const FilterMenu = () => {
  const theme = useTheme();
  const [filterOpen, setFilterOpen] = useState(false);

  const { t } = useTranslation();

  const triggerFilterDrawer = () => {
    setFilterOpen(!filterOpen);
  };

  return (
    <Box sx={{ py: 2, background: theme.palette.background.gradient1 }}>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          {/* Left side */}
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography sx={{ pr: 2 }}>Type:</Typography>

            <Button
              sx={{
                ...typeBtnCommonStyles,
                backgroundColor: theme.palette.primary.main,
              }}
            >
              All
            </Button>

            <Button
              sx={{
                ...typeBtnCommonStyles,
                backgroundColor: theme.palette.primary.grey1,
              }}
            >
              Articles
            </Button>

            <Button
              sx={{
                ...typeBtnCommonStyles,
                backgroundColor: theme.palette.primary.grey1,
              }}
            >
              Courses
            </Button>

            <StyledSearch />
          </Stack>

          {/* Right side */}
          <Button
            onClick={triggerFilterDrawer}
            color="inherit"
            sx={{ textTransform: "inherit" }}
          >
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <Typography>
                {filterOpen ? t("close_filter") : t("open_filter")}
              </Typography>

              {filterOpen ? (
                <KeyboardArrowUpIcon sx={{ fontSize: 16 }} />
              ) : (
                <KeyboardArrowDownIcon sx={{ fontSize: 16 }} />
              )}
            </Stack>
          </Button>
        </Stack>

        <Collapse in={filterOpen} timeout="auto" unmountOnExit>
          <Grid container spacing={5} sx={{ py: 5 }}>
            {/* Categories */}
            <Grid item xs={12} md={4}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Categories:
              </Typography>

              <Stack direction="row" flexWrap="wrap">
                {CONTENT_CATEGORIES.map((item, i) => (
                  <StyledChip label={item} key={i} />
                ))}
              </Stack>
            </Grid>

            {/* Difficulty */}
            <Grid item xs={12} md={4}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Difficulty:
              </Typography>

              <Stack direction="row" flexWrap="wrap">
                {CONTENT_DIFFICULTY_LEVELS.map((item, i) => (
                  <StyledChip label={item} key={i} />
                ))}
              </Stack>
            </Grid>

            {/* Creator */}
            <Grid item xs={12} md={4}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Creator:
              </Typography>

              <Stack direction="row" flexWrap="wrap">
                {BRANDS.map((item, i) => (
                  <StyledChip label={item} key={i} />
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Collapse>
      </Container>
    </Box>
  );
};

export default FilterMenu;
