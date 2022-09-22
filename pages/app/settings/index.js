import { withProtectedUser } from "@hoc/routes";
import { useAppDispatch, useAppSelector } from "@hooks/useRedux";
import { updateContact } from "@lib/user";
import useTranslation from "next-translate/useTranslation";
import dynamic from "next/dynamic";
import { useSnackbar } from "notistack";
import { useState } from "react";

const ProfileForm = dynamic(() => import("@components/forms/ProfileForm"), {
  ssr: false,
});

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

  return <ProfileForm values={profile} handleSubmit={handleProfileSubmit} />;
};

export default Profile;

export const getServerSideProps = withProtectedUser();
