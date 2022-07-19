import GreenButton from "@components/buttons/GreenButton";
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
import Router, { useRouter } from "next/router";
import { useReducer, useState } from "react";

const typeBtnCommonStyles = {
  color: "inherit",
  height: 40,
  px: 2,
  fontSize: "1rem",
  borderRadius: "12px",
};

const StyledSearch = () => {
  const [isActive, setIsActive] = useState(false);

  //   if (!isActive) {
  //     return (
  //       <Button
  //         onClick={() => setIsActive(true)}
  //         sx={(theme) => ({
  //           width: 40,
  //           height: 40,
  //           minWidth: 40,
  //           backgroundColor: theme.palette.primary.grey1,

  //           color: "inherit",
  //           borderRadius: "12px",
  //           cursor: "pointer",
  //         })}
  //       >
  //         <SearchIcon fontSize="small" />
  //       </Button>
  //     );
  //   }

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
          ml: 1,
          width: isActive ? 350 : 120,
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
      />
    </Box>
  );
};

const StyledChip = ({ name, label, filters, dispatch, toggle }) => {
  const { query } = useRouter();

  //   console.log(filters);
  const selected = filters?.includes?.(label) || filters === label;

  const handleClick = () => {
    dispatch({
      type: toggle ? "TOGGLE" : selected ? "REMOVE" : "ADD",
      field: name,
      payload: label,
    });
  };

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
      onClick={handleClick}
    >
      <Stack
        direction="row"
        alignItems="center"
        spacing={0.5}
        sx={{
          px: 1,
          py: 0.7,
        }}
      >
        <Typography
          sx={{
            fontSize: "1rem",
          }}
        >
          {label}
        </Typography>

        {selected ? (
          <DoneIcon sx={{ fontSize: 16 }} />
        ) : (
          <AddIcon sx={{ fontSize: 16 }} />
        )}
      </Stack>
    </Box>
  );
};

const initialFilters = (query) => {
  if (query) {
    return {
      contentType: query.contentType || "all",
      categories: query.categories?.split(",") || [],
      difficulty: query.difficulty,
      author: query.author,
      searchTerm: query.searchTerm || "",
    };
  }

  return {
    contentType: "all",
    categories: [],
    difficulty: null,
    author: null,
    searchTerm: "",
  };
};

const reducer = (state, action) => {
  const _key = action.field;

  switch (action.type) {
    case "ADD":
      return {
        ...state,
        [_key]: [...state[_key], action.payload],
      };
    case "REMOVE":
      return {
        ...state,
        [_key]: state[_key].filter((i) => i !== action.payload),
      };
    case "CHANGE":
      return {
        ...state,
        [action.field]: action.payload,
      };
    case "TOGGLE":
      return {
        ...state,
        [action.field]:
          state[action.field] === action.payload ? null : action.payload,
      };
    case "RESET":
      return initialFilters();

    default:
      return state;
  }
};

const FilterMenu = () => {
  const theme = useTheme();
  const { query } = useRouter();
  const [filters, dispatch] = useReducer(reducer, initialFilters(query));
  const [filterOpen, setFilterOpen] = useState(false);

  const { t } = useTranslation();

  const triggerFilterDrawer = () => {
    setFilterOpen(!filterOpen);
  };

  const handleApplyFilter = (_type) => {
    const { contentType, categories, difficulty, author, searchTerm } = filters;
    let _url = "/content";

    // Type
    if (!!_type && _type !== "all") {
      const _start = _url.endsWith("/content") ? "?" : "&";
      _url += `${_start}contentType=${_type}`;
    } else if (!!contentType && contentType !== "all") {
      const _start = _url.endsWith("/content") ? "?" : "&";
      _url += `${_start}contentType=${contentType}`;
    }

    // Categories
    if (categories?.length) {
      const _start = _url.endsWith("/content") ? "?" : "&";
      _url += `${_start}categories=${categories.join("%2C")}`;
    }

    // Difficulty
    if (difficulty) {
      const _start = _url.endsWith("/content") ? "?" : "&";
      _url += `${_start}difficulty=${difficulty}`;
    }

    // Author
    if (author) {
      const _start = _url.endsWith("/content") ? "?" : "&";
      _url += `${_start}author=${author}`;
    }

    Router.push(_url);
  };

  const handleTypeChange = (_type) => {
    // dispatch({
    //   type: "CHANGE",
    //   field: "contentType",
    //   payload: _type == "all" ? null : _type,
    // });

    if (!filterOpen) {
      handleApplyFilter(_type);
    } else {
      dispatch({
        type: "CHANGE",
        field: "contentType",
        payload: _type == "all" ? null : _type,
      });
    }
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
                backgroundColor:
                  filters?.contentType === "all" || !filters?.contentType
                    ? theme.palette.primary.main
                    : theme.palette.primary.grey1,
              }}
              onClick={() => handleTypeChange("all")}
            >
              All
            </Button>

            <Button
              sx={{
                ...typeBtnCommonStyles,
                backgroundColor:
                  filters?.contentType === "documents"
                    ? theme.palette.primary.main
                    : theme.palette.primary.grey1,
              }}
              onClick={() => handleTypeChange("documents")}
            >
              Articles
            </Button>

            <Button
              sx={{
                ...typeBtnCommonStyles,
                backgroundColor:
                  filters?.contentType === "courses"
                    ? theme.palette.primary.main
                    : theme.palette.primary.grey1,
              }}
              onClick={() => handleTypeChange("courses")}
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
                  <StyledChip
                    name="categories"
                    label={item}
                    key={i}
                    filters={filters?.categories}
                    dispatch={dispatch}
                  />
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
                  <StyledChip
                    name="difficulty"
                    label={item}
                    key={i}
                    filters={filters?.difficulty}
                    dispatch={dispatch}
                    toggle
                  />
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
                  <StyledChip
                    name="author"
                    label={item}
                    key={i}
                    filters={filters?.author}
                    dispatch={dispatch}
                    toggle
                  />
                ))}
              </Stack>
            </Grid>
          </Grid>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            spacing={2}
            sx={{ pb: 1 }}
          >
            <GreenButton size="small" onClick={handleApplyFilter}>
              Apply Filter
            </GreenButton>

            <GreenButton
              variant="outlined"
              size="small"
              onClick={() => dispatch({ type: "RESET" })}
            >
              Clear Filter
            </GreenButton>
          </Stack>
        </Collapse>
      </Container>
    </Box>
  );
};

export default FilterMenu;
