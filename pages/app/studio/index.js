import { withProtectedUser } from "@hoc/routes";
import React from "react";

const CreatorStudio = () => {
  return <div>CreatorStudio</div>;
};

export default CreatorStudio;

export const getServerSideProps = withProtectedUser();
