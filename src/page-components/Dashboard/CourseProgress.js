import ContentCard from "@components/cards/ContentCard";
import DashboardPaper from "@components/DashboardPaper";
import { withProtectedUser } from "@hoc/routes";
import { getDashboardUserContent } from "@lib/content";
import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const CourseProgress = ({ user, profile }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getDashboardUserContent({
      contentType: "course",
      docIds: profile?.enrolledCourses,
    }).then((res) => {
      setData(res);
    });
  }, []);

  return (
    <DashboardPaper>
      <Typography sx={{ fontWeight: 500, mb: 3 }}>Course Progress</Typography>

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

export default CourseProgress;

export const getServerSideProps = withProtectedUser();
