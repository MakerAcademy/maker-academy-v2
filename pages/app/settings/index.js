import { withProtectedUser } from "@hoc/routes";
import React from "react";

const Profile = () => {
  return <div>Profile</div>;
};

export default Profile;

export const getServerSideProps = withProtectedUser(
  async (context, { user, profile }) => {
    return { redirect: { destination: `/app/settings/${profile.id}` } };
  }
);
