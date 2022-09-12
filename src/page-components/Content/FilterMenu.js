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
  Hidden,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { createSlug } from "@utils/markdown";
import useTranslation from "next-translate/useTranslation";
import Router, { useRouter } from "next/router";
import { useEffect, useReducer, useRef, useState } from "react";
import FilterTooltip from "./FilterTooltip";

const buildUrl = (filters, _type) => {
  const { contentType, categories, category, difficulty, author, searchTerm } =
    filters;
  let _url = "/content";

  // Type
  if (!!_type) {
    const _start = _url.endsWith("/content") ? "?" : "&";
    _url += `${_start}contentType=${encodeURIComponent(_type)}`;
  } else if (!!contentType && contentType !== "all") {
    const _start = _url.endsWith("/content") ? "?" : "&";
    _url += `${_start}contentType=${encodeURIComponent(contentType)}`;
  }

  // Categories
  if (categories?.length && !searchTerm) {
    const _start = _url.endsWith("/content") ? "?" : "&";
    _url += `${_start}categories=${encodeURIComponent(categories.join(","))}`;
  }

  // Difficulty
  if (difficulty) {
    const _start = _url.endsWith("/content") ? "?" : "&";
    _url += `${_start}difficulty=${encodeURIComponent(difficulty)}`;
  }

  // Author
  if (author) {
    const _start = _url.endsWith("/content") ? "?" : "&";
    _url += `${_start}author=${encodeURIComponent(author)}`;
  }

  // Search Term
  if (searchTerm) {
    const _start = _url.endsWith("/content") ? "?" : "&";
    _url += `${_start}searchTerm=${createSlug(searchTerm)}`;
  }

  // Category
  if (category && searchTerm) {
    const _start = _url.endsWith("/content") ? "?" : "&";
    _url += `${_start}category=${encodeURIComponent(category)}`;
  }

  return _url;
};

const typeBtnCommonStyles = (theme, active) => {
  return {
    color: "inherit",
    height: 40,
    px: 2,
    fontSize: "1rem",
    borderRadius: "12px",
    backgroundColor: active
      ? theme.palette.primary.main
      : theme.palette.grey.grey1,
    color: active ? theme.palette.common.white : "inherit",
    "&: hover": {
      color: theme.palette.common.white,
    },
  };
};

const StyledSearch = ({ value, dispatch, ...other }) => {
  const [isActive, setIsActive] = useState(false);

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
        // placeholder="Search"
        value={value}
        onChange={(e) => {
          dispatch({
            type: "CHANGE",
            field: "searchTerm",
            payload: e.target.value,
          });
        }}
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
        {...other}
      />
    </Box>
  );
};

const StyledChip = ({ name, label, slug, filters, dispatch, toggle }) => {
  const { query } = useRouter();

  //   console.log(filters);
  const selected = filters?.includes?.(slug) || filters === slug;

  const handleClick = () => {
    dispatch({
      type: toggle ? "TOGGLE" : selected ? "REMOVE" : "ADD",
      field: name,
      payload: slug,
    });
  };

  return (
    <Box
      sx={{
        mr: 1,
        mb: 1,
        borderRadius: 1,
        backgroundColor: "grey.grey2",
        cursor: "pointer",
        "& :hover": { backgroundColor: "grey.grey1" },
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
      category: query.category || "",
    };
  }

  return {
    contentType: "all",
    categories: [],
    difficulty: null,
    author: null,
    searchTerm: "",
    category: "",
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
      return initialFilters(action.query);

    default:
      return state;
  }
};

const FilterMenu = () => {
  const theme = useTheme();
  const { query } = useRouter();
  const [filters, dispatch] = useReducer(reducer, initialFilters(query));
  const [filterOpen, setFilterOpen] = useState(false);
  const openFilterBtnRef = useRef();

  const { t } = useTranslation("content");

  // console.log(filters);

  useEffect(() => {
    dispatch({ type: "RESET", query });
  }, [query]);

  const triggerFilterDrawer = () => {
    setFilterOpen(!filterOpen);
  };

  const handleApplyFilter = (_type) => {
    const _url = buildUrl(filters, _type);
    // console.log(_url);
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
        payload: _type,
      });
    }
  };

  return (
    <Box sx={{ py: 2, background: theme.palette.background.gradient1 }}>
      <Container
        maxWidth="lg"
        sx={{
          [theme.breakpoints.up("md")]: {
            px: 8,
          },
          [theme.breakpoints.up("lg")]: {
            px: 3,
          },
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          {/* Left side */}
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography sx={{ pr: 2 }}>Type:</Typography>

            {/* all */}
            <Button
              variant="contained"
              disableElevation
              sx={typeBtnCommonStyles(
                theme,
                filters?.contentType === "all" || !filters?.contentType
              )}
              onClick={() => handleTypeChange("all")}
            >
              {t("all")}
            </Button>

            {/* documents */}
            <Button
              variant="contained"
              disableElevation
              sx={typeBtnCommonStyles(
                theme,
                filters?.contentType === "documents"
              )}
              onClick={() => handleTypeChange("documents")}
            >
              {t("articles")}
            </Button>

            {/* courses */}
            <Button
              variant="contained"
              disableElevation
              sx={typeBtnCommonStyles(
                theme,
                filters?.contentType === "courses"
              )}
              onClick={() => handleTypeChange("courses")}
            >
              {t("courses")}
            </Button>

            <Hidden smDown>
              {filterOpen && (
                <StyledSearch
                  value={filters?.searchTerm || ""}
                  dispatch={dispatch}
                  placeholder={t("search")}
                />
              )}
            </Hidden>
          </Stack>

          {/* Right side */}
          <Button
            ref={openFilterBtnRef}
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
            <Hidden smUp>
              <Grid item xs={12}>
                <StyledSearch
                  placeholder={t("search")}
                  value={filters?.searchTerm || ""}
                  dispatch={dispatch}
                />
              </Grid>
            </Hidden>

            {/* Categories */}
            <Grid item xs={12} md={7}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                {!filters?.searchTerm ? t("categories") : t("category")}:
              </Typography>

              {filters?.searchTerm ? (
                <Stack direction="row" flexWrap="wrap">
                  {CONTENT_CATEGORIES.map((item, i) => (
                    <StyledChip
                      name="category"
                      label={t(item)}
                      slug={item}
                      key={i}
                      filters={filters?.category}
                      dispatch={dispatch}
                      toggle
                    />
                  ))}
                </Stack>
              ) : (
                <Stack direction="row" flexWrap="wrap">
                  {CONTENT_CATEGORIES.map((item, i) => (
                    <StyledChip
                      name="categories"
                      label={t(item)}
                      slug={item}
                      key={i}
                      filters={filters?.categories}
                      dispatch={dispatch}
                      toggle={!!filters?.searchTerm}
                    />
                  ))}
                </Stack>
              )}
            </Grid>

            <Grid item xs={12} md={5}>
              <Stack spacing={3}>
                {/* Difficulty */}
                <Box>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    {t("difficulty")}:
                  </Typography>

                  <Stack direction="row" flexWrap="wrap">
                    {CONTENT_DIFFICULTY_LEVELS.map((item, i) => (
                      <StyledChip
                        name="difficulty"
                        label={t(item)}
                        slug={item}
                        key={i}
                        filters={filters?.difficulty}
                        dispatch={dispatch}
                        toggle
                      />
                    ))}
                  </Stack>
                </Box>

                {/* Creator */}
                <Box>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    {t("creator")}:
                  </Typography>

                  <Stack direction="row" flexWrap="wrap">
                    {BRANDS.map((item, i) => (
                      <StyledChip
                        name="author"
                        label={t(item)}
                        slug={item}
                        key={i}
                        filters={filters?.author}
                        dispatch={dispatch}
                        toggle
                      />
                    ))}
                  </Stack>
                </Box>
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
            <GreenButton size="small" onClick={() => handleApplyFilter()}>
              {t("apply_filters")}
            </GreenButton>

            <GreenButton
              variant="outlined"
              size="small"
              onClick={() => dispatch({ type: "RESET" })}
            >
              {t("clear_filters")}
            </GreenButton>
          </Stack>
        </Collapse>
      </Container>

      <FilterTooltip openFilterBtnRef={openFilterBtnRef} />
    </Box>
  );
};

export default FilterMenu;
