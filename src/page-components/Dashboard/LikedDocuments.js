import ContentCard from "@components/cards/ContentCard";
import DashboardPaper from "@components/DashboardPaper";
import { withProtectedUser } from "@hoc/routes";
import { useAppSelector } from "@hooks/useRedux";
import { getDashboardUserContent } from "@lib/content";
import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const LikedDocuments = () => {
  const [data, setData] = useState(null);

  const { profile } = useAppSelector((state) => state.profile);

  useEffect(() => {
    getDashboardUserContent({
      contentType: "document",
      docIds: profile?.readDocuments,
    }).then((res) => {
      setData(res);
    });
  }, []);

  return (
    <DashboardPaper>
      <Typography sx={{ fontWeight: 500, mb: 3 }}>Liked Articles</Typography>

      <Grid container spacing={4}>
        {data?.length > 0 &&
          data.map((item, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <ContentCard {...item} />
            </Grid>
          ))}
      </Grid>
    </DashboardPaper>
  );
};

export default LikedDocuments;

export const getServerSideProps = withProtectedUser();
