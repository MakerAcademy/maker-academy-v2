import { withProtectedUser } from "@hoc/routes";

const Dashboard = () => {
  return <div>Dashboard</div>;
};

export default Dashboard;

export const getServerSideProps = withProtectedUser();
