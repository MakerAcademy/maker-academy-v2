import EditRequestCard from "@components/cards/EditRequestCard";
import DashboardPaper from "@components/DashboardPaper";
import { useAppSelector } from "@hooks/useRedux";
import { getUserEditRequests } from "@lib/editrequests";
import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const DUMMY_REQUESTS = [
  ...new Array(6).fill(null).map((_, i) => ({
    _id: i,
    thumbnail:
      "https://blog.makerdao.com/wp-content/uploads/2019/11/Product-blue-scaled.jpg",
    title: "Test Title",
    shortDescription:
      "Pariatur pariatur ut incididunt pariatur nulla excepteur dolor ipsum sint cillum officia deserunt ipsum.",
    contentType: i % 2 === 0 ? "documents" : "courses",
  })),
];

const EditRequests = () => {
  const [data, setData] = useState(null);

  const { profile } = useAppSelector((state) => state.profile);

  useEffect(() => {
    getUserEditRequests(profile?.id).then(setData);
  }, []);

  return (
    <DashboardPaper>
      <Typography sx={{ mb: 3 }}>Edit Requests</Typography>

      <Grid container spacing={4}>
        {data &&
          data.map((item, i) => (
            <Grid item key={i} xs={12} md={4} lg={3}>
              <EditRequestCard
                thumbnail="https://blog.makerdao.com/wp-content/uploads/2019/11/Product-blue-scaled.jpg"
                {...item}
              />
            </Grid>
          ))}
      </Grid>
    </DashboardPaper>
  );
};

export default EditRequests;
