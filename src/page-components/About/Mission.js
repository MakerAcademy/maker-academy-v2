import Title from "@components/Title";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import StrategyImage from "@assets/images/misc/strategy.png";
import MissionBannerDark from "@assets/images/backgrounds/mission-banner-dark.png";
import MissionBannerLight from "@assets/images/backgrounds/mission-banner-light.png";

const AboutMission = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <>
      {/* Banner */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          mb: 5,
          height: 220,
          borderRadius: "20px",
          "& img": {
            objectPosition: "right",
            [theme.breakpoints.up("sm")]: {
              objectPosition: "left",
            },
          },
        }}
      >
        <img
          src={isDark ? MissionBannerDark : MissionBannerLight}
          alt={"Maker Academy Content Banner"}
          style={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
            borderRadius: "inherit",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            top: "38%",
            transform: "translate(22%, 0%)",
            [theme.breakpoints.up("sm")]: {
              top: "45%",
            },
          }}
        >
          <Title variant="h2">Our Mission</Title>
        </Box>
      </Box>

      <Stack spacing={7} sx={{ whiteSpace: "pre-line" }}>
        {/* Mission */}
        <Box>
          <Title variant={{ xs: "h4", md: "h3" }} sx={{ mb: 3 }}>
            Mission
          </Title>

          {/* <Title variant="h5" sx={{ mb: { xs: 2, md: 3 } }}>
        Introduction
      </Title> */}

          <Typography>
            {
              "Maker Academy increases the proficiency of current/potential MakerDAO contributors and justifies the public adoption of MakerDAO's products by facilitating the production of expert-curated content."
            }
          </Typography>
        </Box>

        {/* Vision */}
        <Box>
          {/* Title and intro */}
          <>
            <Title variant={{ xs: "h4", md: "h3" }} sx={{ mb: 3 }}>
              Vision
            </Title>

            <Typography sx={{ mb: 4 }}>
              {
                "Maker Academy will strive to be the go-to source of education regarding MakerDAO. Learners of MakerDAO need no longer be presented with a conflicting, fragmented, and unorganized body of information."
              }
            </Typography>
          </>

          {/* Highest Quality Content */}
          <>
            <Title variant="h6" sx={{ mb: 2 }}>
              Highest Quality Content
            </Title>

            <ul>
              <li>
                <Typography>
                  The educational content produced by Maker Academy will be
                  regarded as the most trusted source of information by core
                  units and the DeFi community as a whole.
                </Typography>
              </li>

              <li>
                The content will have the widest impact since there will be
                content tailored for all relevant audiences.
              </li>

              <li>
                Exceptionally clear and concise content, accomplished by
                following the highest standards of communication and pedagogy,
                will allow users to rapidly grow their knowledge and compress
                their learning curve.
              </li>
            </ul>
          </>

          {/* Assistance in Onboarding Pipelines */}
          <>
            <Title variant="h6" sx={{ mb: 2 }}>
              Assistance in Onboarding Pipelines
            </Title>

            <ul>
              <li>
                <Typography>
                  Maker Academy will leverage its active community of MakerDAO
                  learners to create a funnel into the onboarding process for
                  the incubation program, core unit teams, the grants program,
                  and other ways of contribution towards MakerDAO.
                </Typography>
              </li>

              <li>
                Through working with core units to establish onboarding
                material, Maker Academy will rapidly turn new hires into
                contributors that are integrated with their team and work.
              </li>
            </ul>
          </>

          {/* Identification & Allocation of Work */}
          <>
            <Title variant="h6" sx={{ mb: 2 }}>
              {"Identification & Allocation of Work"}
            </Title>

            <ul>
              <li>
                <Typography>
                  Through the continuous analysis of MakerDAO required to
                  produce educational content, Maker Academy will be a large
                  source of producing research questions for all kinds of
                  contributors to investigate.
                </Typography>
              </li>

              <li>
                Maker Academy will assist core units with their work by
                formatting it into clearly defined projects, such as bounties or
                grant projects, that Maker Academy's learners can complete as a
                part of their education.
              </li>
            </ul>
          </>

          {/* Unification of Information */}
          <>
            <Title variant="h6" sx={{ mb: 2 }}>
              {"Unification of Information"}
            </Title>

            <ul>
              <li>
                <Typography>
                  Maker Academy will encourage knowledge sharing amongst the
                  core units in order to aggregate their documentation, new
                  discoveries, and other relevant information in one easy to
                  find place.
                </Typography>
              </li>
            </ul>
          </>
        </Box>

        {/* Strategy */}
        <Box>
          {/* Title and intro */}
          <>
            <Title variant={{ xs: "h4", md: "h3" }} sx={{ mb: 3 }}>
              Strategy
            </Title>

            <Typography sx={{ mb: 3 }}>
              {
                "Maker Academy's vision has many facets—all centered around educating various audiences about MakerDAO. In order to be scalable, Maker Academy will not produce this content by itself, but rather facilitate the educational relationship between learners and experts. To accomplish this, Maker Academy will build and maintain an educational platform that incentivizes learners to learn and experts to produce content. However, even though experts are knowledgeable about their domain, teaching/communicating their domain requires a different expertise. Maker Academy's team of pedagogists/communicators provide this expertise. Additionally, the Maker Academy team will use this expertise to structure the experts' content into curricula for the learners, giving them a streamlined path to their educational goals."
              }
            </Typography>

            <img
              src={StrategyImage}
              alt="Strategy"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />

            <Typography sx={{ mt: 2, mb: 3 }}>
              {
                "Although content will be developed for all relevant audiences, the Maker Academy Team will cater to certain audiences that benefit MakerDAO the most, by ensuring that the relevant educational content is produced for these audiences. To start with, Maker Academy has selected MakerDAO contributors as the first audience to ensure educational content is created for. This audience can be broken down into many subunits, the main ones being new core units, current core unit team members, grantees, and delegates."
              }
            </Typography>
          </>

          {/* Educational Platform */}
          <>
            <Title variant="h6" sx={{ mb: 2 }}>
              {"Educational Platform"}
            </Title>

            <Typography sx={{ mb: 4 }}>
              {
                "Maker Academy will use a website as its educational platform. However, in the future, this could evolve to more presentation mediums."
              }
            </Typography>
          </>

          {/* Incentives */}
          <>
            <Typography sx={{ mb: 2, fontWeight: 600 }}>
              {"Incentives"}
            </Typography>

            <Typography sx={{ mb: 4 }}>
              {
                "When core units develop onboarding material with the help of the Maker Academy Team, they will receive a direct benefit—more knowledgeable new hires. However, besides this instance, most experts will not receive any benefits (besides recognition) when communicating their knowledge. To fix this problem, Maker Academy will continuously explore different incentives for experts. Maker Academy will potentially start by trial-running a monetary incentive—giving DAI to experts for producing content.\n\nMaker Academy will incentivize learners to join our platform by clearly demonstrating the path from learning to contributing and making it highly accessible."
              }
            </Typography>
          </>

          {/* Quality-Control */}
          <>
            <Typography sx={{ mb: 2, fontWeight: 600 }}>
              {"Quality-Control"}
            </Typography>

            <Typography sx={{ mb: 4 }}>
              {
                "A high quality of educational content will be incentivized by the Maker Academy Team. We initially plan to very thoroughly review all educational content posted by external content creators in order to set an example for the sight. Afterwards, we plan on reviewing content to the extent that Maker Academy has time, always ensuring that content is at least appropriate. To incentivize high quality content, we will tag content that passes Maker Academy standards and prioritize that content to the reader and possibly offer other rewards as well."
              }
            </Typography>
          </>

          {/* Content Structure */}
          <>
            <Typography sx={{ mb: 2, fontWeight: 600 }}>
              {"Content Structure"}
            </Typography>

            <Typography sx={{ mb: 4 }}>
              {
                "Most education will be implemented through courses. Courses have the advantage of being able to increase an audience's knowledge to a great extent, as opposed to an article, conference, tweet, etc. Courses will vary in level of depth. If an audience's motivation does not require a low-level understanding of some process, then a high-level description will be given, and vice-versa. For example, an audience motivated to understand the budgeting of MakerDAO will need to know how governance works, but will not need to understand how it is implemented through smart contracts. This structure will be planned and implemented by the Maker Academy Team.\n\nAdditionally, Maker Academy plans to offer certificates for the completion of different programs. These programs will contain a sequential ordering of content that takes the user from some base level of knowledge to achieving a high enough understanding to make some kind of contribution."
              }
            </Typography>
          </>

          {/* Success Metrics */}
          <>
            <Typography sx={{ mb: 2, fontWeight: 600 }}>
              {"Success Metrics"}
            </Typography>

            <Typography sx={{ mb: 4 }}>
              {
                "Maker Academy's platform plans to keep track of and store all kinds of different analytics. Some of these metrics may not be used in any kind of success measurement, but they could be in the future. To start, we plan to measure the success of the platform itself by measuring trends in the amount of users, amount of content produced, and amount of content consumed. Additionally, we also plan on having an optional questionnaire users can submit in order to review the platform."
              }
            </Typography>
          </>

          {/* Onboarding Educational Content */}
          <>
            <Title variant="h6" sx={{ mb: 2 }}>
              {"Onboarding Educational Content"}
            </Title>

            <Typography sx={{ mb: 4 }}>
              {
                "The Maker Academy Team will analyze each core unit, determining which topics are needed to be understood in order to be a successful employee. Then, outlines of reusable courses will be constructed and communicated to the core units. Then, experts (most likely the core units) will produce the material with the help of the Maker Academy Team. The onboarding material will be available to current core unit members, new hires, and future hires."
              }
            </Typography>
          </>

          {/* Success Metrics */}
          <>
            <Typography sx={{ mb: 2, fontWeight: 600 }}>
              {"Success Metrics"}
            </Typography>

            <Typography sx={{ mb: 4 }}>
              {
                "Since the educational platform's success metrics already track participation/involvement, success metrics for onboarding material will be based on the effectiveness of the education. Maker Academy plans to assist with the onboarding pipeline and keep track of users throughout the learning and contribution process. The turnover rates will be a major success metric."
              }
            </Typography>
          </>
        </Box>

        {/* Addemdum */}
        <Box>
          {/* Title and intro */}
          <Title variant={{ xs: "h4", md: "h3" }} sx={{ mb: 3 }}>
            Addendum
          </Title>

          <Title variant="h6" sx={{ mb: 2 }}>
            {"Expected Challenges, Effects, & Solutions"}
          </Title>

          <Box
            sx={{
              "& li": {
                mt: 2,
              },
            }}
          >
            <ol>
              <li>
                <Typography sx={{ "& span": { fontWeight: 500 } }}>
                  <span>Challenge:</span> Other core unit's have the power to
                  lack or neglect communication with Maker Academy as a result
                  of the decentralized business structure.
                  <br />
                  <span>Effect:</span> The development of educational material
                  related to other core units may be slow.
                  <br />
                  <span>Solution:</span> Maker Academy will decrease barriers of
                  communication with other core units by making communication
                  efficient and providing incentives to communicate. Efficient
                  communication will be carried out through an asynchronous
                  workflow and limiting communication to only what is necessary.
                  Maker Academy will incentivize core units to communicate with
                  it through adding more contribution projects for learners that
                  directly impact these core units.
                </Typography>
              </li>

              <li>
                <Typography sx={{ "& span": { fontWeight: 500 } }}>
                  <span>Challenge:</span> There is constant and rapid evolution
                  of both the technology and the ideas behind MakerDAO and DeFi.
                  <br />
                  <span>Effect:</span> Maker Academy's content may become
                  outdated and even incorrect
                  <br />
                  <span>Solution:</span> Maker Academy will have a large
                  community of content producers with a quick process of making
                  corrections to content. Additionally, educational content will
                  be designed in a way where principles are more emphasized than
                  applications of those principles (this is how to build a car
                  VS this is how Tesla builds cars). This lowers the chances of
                  producing content at risk of becoming outdated. However,
                  concretes/applications are necessary sometimes, and, as a
                  result, they will cleary be identified as being subject to
                  change.
                </Typography>
              </li>

              <li>
                <Typography sx={{ "& span": { fontWeight: 500 } }}>
                  <span>Challenge:</span> Estimating the impact educating an
                  audience will have on MakerDAO is difficult.
                  <br />
                  <span>Effect:</span> Maker Academy's prioritization of which
                  audiences to educate over others may be incorrect.
                  <br />
                  <span>Solution:</span> Maker Academy will consult the opinions
                  of other core units after conducting its own analysis, to
                  ensure as correct prioritization as possible.
                </Typography>
              </li>

              <li>
                <Typography sx={{ "& span": { fontWeight: 500 } }}>
                  <span>Challenge:</span> It is hard to measure how well an
                  audience was educated by MakerDAO.
                  <br />
                  <span>Effect:</span> Maker Academy may not properly adjust its
                  implementation of education in order to be the most effective.
                  <br />
                  <span>Solution:</span> Tests, contribution projects, and other
                  metrics will be tracked to try creating the most objective
                  representation of how much an audience has learned.
                </Typography>
              </li>

              <li>
                <Typography sx={{ "& span": { fontWeight: 500 } }}>
                  <span>Challenge:</span> Potential users may ignore the
                  educational content produced by Maker Academy.
                  <br />
                  <span>Effect:</span> Maker Academy's overall mission fails
                  because no one is getting educated.
                  <br />
                  <span>Solution:</span> Maker Academy will provide many
                  incentives to learn the material, such as a shortcut to being
                  hired, being paid for small contributions, and giving
                  certificates for completed courses that learners can use on
                  their resume.
                </Typography>
              </li>
            </ol>
          </Box>
        </Box>
      </Stack>
    </>
  );
};

export default AboutMission;
