import { withProtectedUser } from "@hoc/routes";
import React from "react";

const Dashboard = () => {
  return <div>Dashboard</div>;
};

export default Dashboard;

export const getServerSideProps = withProtectedUser();
