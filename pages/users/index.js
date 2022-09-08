import GreenButton from "@components/buttons/GreenButton";
import ProfileCard from "@components/cards/ProfileCard";
import Title from "@components/Title";
import { useAppDispatch, useAppSelector } from "@hooks/useRedux";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Container, Grid, Stack, Typography } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { fetchProfilesData } from "@redux/slices/profilesSlice";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useEffect, useState } from "react";

const breadcrumbs = [
  <Link underline="hover" key="1" href="/" passHref>
    Home
  </Link>,
  <Typography key="3" color="text.primary">
    Users
  </Typography>,
];

const Profiles = () => {
  const [searchTerm, setSearchTerm] = useState("");
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
  const { t } = useTranslation("profiles");

  const fetchQueries = {
    searchTerm: searchTerm,
    limit: 20,
  };

  useEffect(() => {
    dispatch(fetchProfilesData(fetchQueries));
  }, []);

  const fetchMoreProfiles = () => {
    dispatch(fetchProfilesData({ merge: true, ...fetchQueries }));
  };

  return (
    <Container sx={{ py: 5 }} maxWidth="lg">
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        sx={{ mb: 5 }}
      >
        {breadcrumbs}
      </Breadcrumbs>

      {/* <Stack direction="row" alignItems="center" justifyContent="space-between">
        <TextField />
      </Stack> */}

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

        {empty && <Title variant="h6"> {t("no_data")} </Title>}
      </Stack>
    </Container>
  );
};

export default Profiles;
