import EditRequestCard from "@components/cards/EditRequestCard";
import DashboardPaper from "@components/DashboardPaper";
import { useAppSelector } from "@hooks/useRedux";
import { listenUserEditRequests } from "@lib/editrequests";
import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const EditRequests = () => {
  const [data, setData] = useState(null);

  const { profile } = useAppSelector((state) => state.profile);

  useEffect(() => {
    if (profile?.id) {
      const unsub = listenUserEditRequests(profile?.id, setData);

      return () => unsub();
    }
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
