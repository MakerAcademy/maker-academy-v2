import { NAVBAR_HEIGHT_MOBILE } from "@constants/";
import { Box, Button, Container, Tab, Tabs, useTheme } from "@mui/material";
import AboutAcademyProposal from "@page-components/About/AcademyProposal";
import AboutBacklog from "@page-components/About/Backlog";
import AboutBudget from "@page-components/About/Budget";
import AboutMission from "@page-components/About/Mission";
import AboutStatusUpdates from "@page-components/About/StatusUpdates";
import AboutTeam from "@page-components/About/Team";
import { BlurSection1, BlurSection2 } from "@page-components/Home/images";
import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const routes = [
  { name: "mission", link: "/about/mission" },
  { name: "budget", link: "/about/budget" },
  { name: "academy_proposals", link: "/about/academy_proposals" },
  { name: "backlog", link: "/about/backlog" },
  { name: "status_updates", link: "/about/status_updates" },
  { name: "team", link: "/about/team" },
];

const AboutUs = () => {
  const { asPath } = useRouter();

  const [tabValue, setTabValue] = useState(asPath);
  const theme = useTheme();

  useEffect(() => {
    setTabValue(asPath);
  }, [asPath]);

  useEffect(() => {
    Router.push(tabValue, undefined, { shallow: true });
  }, [tabValue]);

  const Empty = () => <></>;
  const RenderedComponent = AboutUs.type[tabValue] || Empty;

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        // backgroundColor: "red",
        minHeight: "100vh",
      }}
    >
      {/* Background images */}
      <img
        loading="lazy"
        src={BlurSection1}
        alt="Blur 1"
        style={{
          maxWidth: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      />

      <img
        loading="lazy"
        src={BlurSection2}
        alt="Blur 1"
        style={{
          maxWidth: "100%",
          position: "absolute",
          bottom: 0,
          right: 0,
          zIndex: -1,
        }}
      />

      <Container
        maxWidth="md"
        sx={{
          //   bgcolor: "red",
          pt: `${NAVBAR_HEIGHT_MOBILE}px`,
          [theme.breakpoints.up("md")]: {
            px: 10,
            minHeight: 750, //remove
          },
          [theme.breakpoints.up("lg")]: {
            pt: `calc(${NAVBAR_HEIGHT_MOBILE}px + 50px)`,
            px: 3,
          },
        }}
      >
        <Tabs
          variant="scrollable"
          TabIndicatorProps={{ style: { display: "none" } }}
          value={tabValue}
          onChange={(e, v) => setTabValue(v)}
        >
          {routes.map((item) => {
            return (
              <Tab
                key={item.link}
                value={item.link}
                label={item.name}
                sx={{
                  mx: 1,
                  bgcolor: "primary.grey1",
                  borderRadius: "12px",
                  "&.Mui-selected": {
                    color: "text.invert",
                    bgcolor: "primary.grey8",
                  },
                }}
              />
            );
          })}
        </Tabs>

        <Box sx={{ my: 5 }}>
          <RenderedComponent />
        </Box>
      </Container>
    </Box>
  );
};

AboutUs.type = {
  "/about/mission": AboutMission,
  "/about/budget": AboutBudget,
  "/about/academy_proposals": AboutAcademyProposal,
  "/about/backlog": AboutBacklog,
  "/about/status_updates": AboutStatusUpdates,
  "/about/team": AboutTeam,
};

export default AboutUs;
