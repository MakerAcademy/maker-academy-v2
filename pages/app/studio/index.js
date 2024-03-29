import { withProtectedUser } from "@hoc/routes";
import { Box } from "@mui/material";
import Banners from "@page-components/StudioMyContent/Banners";
import ContentTable from "@page-components/StudioMyContent/ContentTable";
import DraftTable from "@page-components/StudioMyContent/DraftTable";
import EditRequests from "@page-components/StudioMyContent/EditRequests";

const CreatorStudio = () => {
  return (
    <Box>
      <Box sx={{ mb: 5 }}>
        <Banners />
      </Box>

      <ContentTable />

      <DraftTable />

      <EditRequests />
    </Box>
  );
};

export default CreatorStudio;

export const getServerSideProps = withProtectedUser();
