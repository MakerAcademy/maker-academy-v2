import { withProtectedUser } from "@hoc/routes";
import { Box } from "@mui/material";
import CourseProgress from "@page-components/Dashboard/CourseProgress";
import LikedDocuments from "@page-components/Dashboard/LikedDocuments";

const Dashboard = () => {
  return (
    <Box>
      <Box sx={{ mb: 5 }}>
        <CourseProgress />
      </Box>

      <LikedDocuments />
    </Box>
  );
};

export default Dashboard;

export const getServerSideProps = withProtectedUser();
