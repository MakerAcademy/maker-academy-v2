import {
  Box,
  Link,
  ListItem,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material";
import {
  createSlug,
  createTitle,
  extractHeadingsFromMd,
  getLevel,
  parseDepths,
} from "@utils/markdown";
import Router, { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { default as ReactScrollSpy } from "react-scrollspy";

const ScrollSpy = ({ title, firstItem = {}, markdown }) => {
  const [data, setData] = useState([]);
  const [slugs, setSlugs] = useState([]);
  const theme = useTheme();
  const router = useRouter();
  const [tabValue, setTabValue] = useState(slugs[0]);

  // Generate all Ids from markdown headings
  useMemo(() => {
    if (markdown) {
      const headers = extractHeadingsFromMd(markdown);
      const _ids = headers?.reduce((acc, header) => {
        const title = createTitle(header);
        const slug = createSlug(title);
        const level = getLevel(header);
        return [...acc, { title, slug, level }];
      }, []);

      const _temp2 = parseDepths(_ids || []);

      // const _temp3 = addChapters(_temp2 || []);

      const _data = [...(_temp2 || [])];

      setData(_data);
    }
  }, [markdown]);

  useMemo(() => {
    if (data.length) {
      const _slugs = data?.map((item) => item.slug) || [];
      setTabValue(_slugs[0]);
      setSlugs(_slugs);
    }
  }, [data]);

  return (
    <Box
      sx={{
        height: "100%",
        minWidth: 10,
        [theme.breakpoints.up("md")]: {
          width: 240,
        },
        [theme.breakpoints.up("lg")]: {
          width: 260,
        },
      }}
    >
      <Box
        sx={{
          position: "sticky",
          top: 10,
          width: "inherit",
        }}
      >
        {title && (
          <Typography variant="h5" sx={{ mb: -2 }}>
            {title}
          </Typography>
        )}

        <ReactScrollSpy
          items={[...slugs]}
          currentClassName="isCurrent"
          onUpdate={(el) => el && setTabValue(el.id)}
          style={{ marginLeft: 0, paddingLeft: 0 }}
        >
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={tabValue}
            onChange={(e, v) => {
              Router.push(`#${v}`);
              setTabValue(v);
            }}
            TabIndicatorProps={{ sx: { backgroundColor: "text.primary" } }}
            sx={{ borderRight: 1, borderColor: "divider", maxHeight: "80vh" }}
          >
            {data?.map((item, i) => {
              const ml = item.depth > 0 ? item.depth + 2 : 0;

              const isSelected = item.slug === tabValue;

              return (
                <Tab
                  key={i}
                  value={item.slug}
                  sx={{ px: 0, py: 0.1, minHeight: 45 }}
                  label={
                    <ListItem
                      sx={{
                        pl: 0,
                        pr: 3,
                        py: 0,
                        ml,
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          lineHeight: 1.2,
                          color: isSelected ? "text.primary" : "grey.grey4",
                          fontWeight: isSelected ? 400 : 300,
                        }}
                      >
                        {item.depth === 0 ? "•" : "⁃"}&nbsp;&nbsp;{item.title}
                      </Typography>
                    </ListItem>
                  }
                />
              );
            })}
          </Tabs>
        </ReactScrollSpy>
      </Box>
    </Box>
  );

  return (
    <Box
      sx={{
        height: "100%",
        minWidth: 10,
        "& ul": { paddingLeft: 0 },
        [theme.breakpoints.up("md")]: {
          width: 240,
        },
        [theme.breakpoints.up("lg")]: {
          width: 260,
        },
      }}
    >
      <Box
        sx={{
          position: "sticky",
          top: 10,
          width: "inherit",
        }}
      >
        {title && (
          <Typography variant="h5" sx={{ mb: 2 }}>
            {title}
          </Typography>
        )}

        <Box
          id="xyz"
          sx={{
            color: theme.palette.text.disabled,
            mt: -2,
            maxHeight: "80vh",
            overflowY: "scroll",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            [theme.breakpoints.up("md")]: {
              pb: 5,
            },
            "& .isCurrent > div": {
              borderLeft: `3px solid ${theme.palette.primary.main}`,
              color: theme.palette.text.default,
            },

            "& .isCurrent > div > p": {
              color: "text.primary",
            },
          }}
        >
          <ReactScrollSpy items={[...slugs]} currentClassName="isCurrent">
            {data?.map((item, i) => {
              const ml = item.depth > 0 ? item.depth + 1.5 : 0;

              return (
                <Link
                  href={`#${item.slug}`}
                  color="inherit"
                  underline="none"
                  key={i}
                >
                  <ListItem
                    button
                    sx={{
                      py: 0.8,
                      ml,
                    }}
                  >
                    <Typography variant="body2" sx={{ lineHeight: 1.1 }}>
                      {item.title}
                    </Typography>
                  </ListItem>
                </Link>
              );
            })}
          </ReactScrollSpy>
        </Box>
      </Box>
    </Box>
  );
};

export default ScrollSpy;
