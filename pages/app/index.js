import { withProtectedUser } from "@hoc/routes";
import { Box } from "@mui/material";
import Banners from "@page-components/Dashboard/Banners";

const Dashboard = () => {
  return (
    <Box>
      <Box sx={{ mb: 5 }}>
        <Banners />
      </Box>
      Coming soon ...
    </Box>
  );
};

export default Dashboard;

export const getServerSideProps = withProtectedUser();
