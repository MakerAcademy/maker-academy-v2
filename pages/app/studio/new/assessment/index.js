import { withProtectedUser } from "@hoc/routes";
import React from "react";

const Assessment = () => {
  return <div>Assessment</div>;
};

export default Assessment;

export const getServerSideProps = withProtectedUser();
