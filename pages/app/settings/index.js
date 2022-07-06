import DashboardPaper from "@components/DashboardPaper";
import { useAppDispatch, useAppSelector } from "@hooks/useRedux";
import { updateContact } from "@lib/user";
import { Box, Tab, Tabs } from "@mui/material";
import { updateUserProfile } from "@redux/slices/profileSlice";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

const ProfileForm = dynamic(
  () => import("@components/forms/Settings/ProfileForm"),
  {
    ssr: false,
  }
);

const SocialsForm = dynamic(
  () => import("@components/forms/Settings/SocialsForm"),
  {
    ssr: false,
  }
);

const Profile = () => {
  const dispatch = useAppDispatch();
  const { profile } = useAppSelector((state) => state.profile);
  const { user } = useAppSelector((state) => state.user);

  const [tabValue, setTabValue] = useState(0);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleProfileSubmit = async (data) => {
    const res = await updateContact(profile.id, data).then(() => {
      dispatch(updateUserProfile());
    });
  };

  return (
    <DashboardPaper>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tabValue} onChange={handleChange}>
          <Tab label="Profile" sx={{ textTransform: "inherit" }} />
          <Tab label="Social Media" sx={{ textTransform: "inherit" }} />
          <Tab label="Password" sx={{ textTransform: "inherit" }} />
          <Tab label="Personal Data" sx={{ textTransform: "inherit" }} />
        </Tabs>
      </Box>

      <Box sx={{ mt: 3 }}>
        {tabValue === 0 && (
          <ProfileForm values={profile} handleSubmit={handleProfileSubmit} />
        )}

        {tabValue === 1 && (
          <SocialsForm values={profile} handleSubmit={handleProfileSubmit} />
        )}
      </Box>
    </DashboardPaper>
  );
};

export default Profile;
