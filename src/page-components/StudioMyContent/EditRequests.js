import EditRequestCard from "@components/cards/EditRequestCard";
import DashboardPaper from "@components/DashboardPaper";
import { Grid, Typography } from "@mui/material";
import React from "react";

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
  return (
    <DashboardPaper>
      <Typography sx={{ mb: 2 }}>Edit Requests</Typography>

      <Grid container spacing={4}>
        {DUMMY_REQUESTS.map((item) => (
          <Grid item key={item.id} xs={12} md={4} lg={3}>
            <EditRequestCard {...item} />
          </Grid>
        ))}
      </Grid>
    </DashboardPaper>
  );
};

export default EditRequests;
