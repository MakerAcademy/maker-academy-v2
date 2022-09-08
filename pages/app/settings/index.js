import DashboardPaper from "@components/DashboardPaper";
import { withProtectedUser } from "@hoc/routes";
import { useAppDispatch, useAppSelector } from "@hooks/useRedux";
import { uploadFile } from "@lib/storage";
import { updateContact } from "@lib/user";
import { Box, Tab, Tabs } from "@mui/material";
import { updateUserProfile } from "@redux/slices/contactSlice";
import { fileInObject } from "@utils/helperFunctions";
import useTranslation from "next-translate/useTranslation";
import dynamic from "next/dynamic";
import { useSnackbar } from "notistack";
import { useState } from "react";

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
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { t } = useTranslation("dashboard");

  const [tabValue, setTabValue] = useState(0);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleProfileSubmit = async (data) => {
    const res = await updateContact(profile?.id, data).then(() => {
      enqueueSnackbar("Updated!", {
        variant: "success",
        autoHideDuration: 2000,
      });
    });
  };

  return (
    <DashboardPaper>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tabValue} onChange={handleChange}>
          <Tab label={t("profile")} sx={{ textTransform: "inherit" }} />
          <Tab label={t("social_media")} sx={{ textTransform: "inherit" }} />
          <Tab label={t("password")} sx={{ textTransform: "inherit" }} />
          <Tab label={t("personal_data")} sx={{ textTransform: "inherit" }} />
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

export const getServerSideProps = withProtectedUser();
