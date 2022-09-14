import { useAppSelector } from "@hooks/useRedux";
import ArrowDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowUpIcon from "@mui/icons-material/ArrowDropUp";
import {
  Box,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const MenuItems = ({ items = [] }) => {
  const { user } = useAppSelector((state) => state.user);
  const theme = useTheme();
  const router = useRouter();
  const { pathname } = router;
  const { t } = useTranslation("dashboard");

  const [activeLink, setActiveLink] = useState(-1);
  const [activeSubLink, setActiveSubLink] = useState(-1);
  const [collapseItem, setCollapseItem] = useState(null);

  useEffect(() => {
    // Get Active links
    const linkIdx = items.findIndex((item) => item.link === pathname);
    setActiveLink(linkIdx);
    setActiveSubLink(-1);

    if (linkIdx === -1) {
      items.map(({ nestedItems }, i) => {
        const _found = nestedItems?.findIndex(
          (subItem) => subItem.link === pathname
        );
        if (_found > -1) {
          setActiveLink(i);
          setActiveSubLink(_found);
        }
      });
    }
  }, [pathname]);

  useEffect(() => {
    // Set collapsed item
    if (activeLink > 0 && items[activeLink]?.nestedItems) {
      setCollapseItem(activeLink);
    }
  }, [activeLink]);

  const handleCollapse = (e, i) => {
    e.stopPropagation();

    if (collapseItem === i) {
      setCollapseItem(null);
    } else {
      setCollapseItem(i);
    }
  };

  return (
    <Box>
      <List disablePadding>
        {items.map((item, i) => {
          const isActiveLink = activeLink === i;
          const isGranted = item.trustLevel
            ? user?.trustLevel >= item.trustLevel
            : true;

          return (
            <React.Fragment key={i}>
              {isGranted && (
                <ListItem
                  button
                  sx={{
                    pl: 4,
                    fontWeight: 300,

                    ...(isActiveLink
                      ? {
                          color: theme.palette.primary.main,
                          borderRight: `3px solid ${theme.palette.primary.main}`,
                          fontWeight: 500,
                          backgroundColor: alpha(
                            theme.palette.primary.main,
                            theme.palette.action.selectedOpacity
                          ),
                        }
                      : {}),

                    ...(isActiveLink && activeSubLink > -1
                      ? { fontWeight: 300, backgroundColor: "transparent" }
                      : {}),
                  }}
                  secondaryAction={
                    <>
                      {item.nestedItems && (
                        <>
                          {collapseItem === i ? (
                            <ArrowUpIcon fontSize="small" />
                          ) : (
                            <ArrowDownIcon fontSize="small" />
                          )}
                        </>
                      )}
                    </>
                  }
                  onClick={(e) =>
                    item.nestedItems
                      ? handleCollapse(e, i)
                      : item.link &&
                        pathname !== item.link &&
                        router.push(item.link)
                  }
                >
                  <ListItemIcon sx={{ minWidth: 0, mr: 2 }}>
                    <item.icon
                      sx={{
                        fontSize: 22,
                        transition: theme.transitions.create("transform"),
                        ...(isActiveLink
                          ? {
                              transform: "scale(1.1)",
                              color: theme.palette.primary.main,
                            }
                          : {}),
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    disableTypography
                    primary={t(item.text)}
                    sx={{ typography: "body2" }}
                  />
                </ListItem>
              )}

              {item.nestedItems && isGranted && (
                <Collapse in={collapseItem === i}>
                  <List disablePadding>
                    {item.nestedItems.map((subItem, j) => {
                      const isActiveSubLink = activeSubLink === j;
                      const isSubGranted = subItem.trustLevel
                        ? user?.trustLevel >= subItem.trustLevel
                        : true;

                      if (!isSubGranted) return null;

                      return (
                        <Link href={subItem.link} key={j}>
                          <ListItem
                            button
                            sx={{
                              ...theme.typography.body1,
                              pl: 11,
                              fontWeight: 300,

                              ...(isActiveSubLink
                                ? {
                                    color: theme.palette.primary.main,
                                    fontWeight: 500,
                                    backgroundColor: alpha(
                                      theme.palette.primary.main,
                                      theme.palette.action.selectedOpacity
                                    ),
                                  }
                                : {}),
                            }}
                          >
                            <ListItemText
                              disableTypography
                              primary={t(subItem.text)}
                              sx={{ typography: "body2" }}
                            />
                          </ListItem>
                        </Link>
                      );
                    })}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          );
        })}
      </List>
    </Box>
  );
};

export default MenuItems;
