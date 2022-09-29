import { NAVBAR_HEIGHT_MOBILE } from "@constants/";
import AssignmentIcon from "@mui/icons-material/Assignment";
import BarChartIcon from "@mui/icons-material/BarChart";
import CampaignIcon from "@mui/icons-material/Campaign";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import StarIcon from "@mui/icons-material/Star";
import {
  Box,
  Container,
  Stack,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material";
import AboutAcademyProposal from "@page-components/About/AcademyProposal";
import AboutBacklog from "@page-components/About/Backlog";
import AboutBudget from "@page-components/About/Budget";
import AboutMission from "@page-components/About/Mission";
import AboutPrivacyPolicy from "@page-components/About/PrivacyPolicy";
import AboutStatusUpdates from "@page-components/About/StatusUpdates";
import AboutTeam from "@page-components/About/Team";
import { BlurSection1, BlurSection2 } from "@page-components/Home/images";
import useTranslation from "next-translate/useTranslation";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SecurityIcon from '@mui/icons-material/Security';

const routes = [
  { name: "mission", link: "/about/mission", icon: StarIcon },
  { name: "budget", link: "/about/budget", icon: BarChartIcon },
  // {
  //   name: "academy_proposals",
  //   link: "/about/academy_proposals",
  //   icon: CreateNewFolderIcon,
  // },
  { name: "backlog", link: "/about/backlog", icon: AssignmentIcon },
  {
    name: "status_updates",
    link: "/about/status_updates",
    icon: CampaignIcon,
  },
  { name: "team", link: "/about/team", icon: Diversity3Icon },
  { name: "privacy_policy", link: "/about/privacy_policy", icon: SecurityIcon },
];

const AboutUs = () => {
  const { asPath } = useRouter();
  const { t } = useTranslation("about");

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
                // label={t(item.name)}
                label={
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <item.icon sx={{ fontSize: 20 }} />
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {t(item.name)}
                    </Typography>
                  </Stack>
                }
                sx={{
                  mx: 1,
                  bgcolor: "grey.grey1",
                  borderRadius: "12px",
                  "&.Mui-selected": {
                    color: "text.invert",
                    bgcolor: "grey.grey8",
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
  "/about/privacy_policy": AboutPrivacyPolicy,
};

export default AboutUs;
