import Title from "@components/Title";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import {
  Box,
  Button,
  Card,
  Grid,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { Fade } from "react-awesome-reveal";

const proposals = [
  {
    title: "Proposal 1",
    description:
      "MakerDAO is a  decentralized autonomous organization (DAO) responsible for maintaining the Maker protocol. The Maker Protocol allows users to mint DAI.",
  },
  {
    title: "Proposal 2",
    description:
      "MakerDAO is a  decentralized autonomous organization (DAO) responsible for maintaining the Maker protocol. The Maker Protocol allows users to mint DAI.",
  },
  {
    title: "Proposal 3",
    description:
      "MakerDAO is a  decentralized autonomous organization (DAO) responsible for maintaining the Maker protocol. The Maker Protocol allows users to mint DAI.",
  },
  {
    title: "Proposal 4",
    description:
      "MakerDAO is a  decentralized autonomous organization (DAO) responsible for maintaining the Maker protocol. The Maker Protocol allows users to mint DAI.",
  },
];

const ProposalCard = ({ title, description }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Fade triggerOnce style={{ height: "100%" }}>
      <Card
        elevation={0}
        sx={{
          zIndex: 999,
          height: "100%",
          p: { xs: 3, md: 4 },
          borderRadius: 3,
          background: theme.palette.background.gradient1,
          boxShadow: "0px 2px 10px rgba(24, 39, 75, 0.05)",
          "&:hover": {
            boxShadow: "0px 4px 10px rgba(24, 39, 75, 0.2)",
            transform: "scale(1.01)",
          },
        }}
      >
        <Stack
          spacing={2}
          justifyContent="space-between"
          sx={{ height: "100%" }}
        >
          <Stack spacing={2}>
            <Title variant={{ xs: "h5", lg: "h4" }} sx={{ fontSize: "32px" }}>
              {title}
            </Title>

            <Typography sx={{ whiteSpace: "pre-line" }}>
              {description}
            </Typography>
          </Stack>

          <Box>
            <Button>
              <Stack
                spacing={1}
                direction="row"
                alignItems="center"
                justifyContent="center"
                flexWrap={"wrap"}
              >
                <ArrowForwardOutlinedIcon />

                <Typography variant="body2" sx={{ height: 20 }}>
                  View Proposal
                </Typography>
              </Stack>
            </Button>
          </Box>
        </Stack>
      </Card>
    </Fade>
  );
};

const AboutAcademyProposal = () => {
  return (
    <Box>
      <Title variant={{ xs: "h4", md: "h3" }} sx={{ mb: { xs: 3, md: 5 } }}>
        Academy Proposals
      </Title>

      <Grid container spacing={5}>
        {proposals.map((item, i) => (
          <Grid item xs={12} md={6} key={i}>
            <ProposalCard {...item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AboutAcademyProposal;
