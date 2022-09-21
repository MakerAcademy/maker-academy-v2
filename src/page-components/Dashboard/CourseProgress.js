import ContentCard from "@components/cards/ContentCard";
import DashboardPaper from "@components/DashboardPaper";
import { withProtectedUser } from "@hoc/routes";
import { useAppSelector } from "@hooks/useRedux";
import { getDashboardUserContent } from "@lib/content";
import { Grid, Typography } from "@mui/material";
import _ from "lodash";
import React, { useEffect, useState } from "react";

const CourseProgress = () => {
  const [data, setData] = useState(null);
  const { profile } = useAppSelector((state) => state.profile);

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
          data.map((item, i) => {
            const _alldocs = item.metadata?.allDocuments || [];
            const _intersection = _alldocs.filter(({ contentType, docId }) => {
              return (
                profile?.submittedAssessments?.includes(docId) ||
                profile?.readDocuments?.includes(docId)
              );
            });
            const percentage = parseInt(
              ((_intersection?.length || 0) / _alldocs?.length) * 100
            );

            return (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <ContentCard progress={percentage} {...item} />
              </Grid>
            );
          })}
      </Grid>
    </DashboardPaper>
  );
};

export default CourseProgress;

export const getServerSideProps = withProtectedUser();
