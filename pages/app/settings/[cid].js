import { withProtectedUser } from "@hoc/routes";
import { useAppDispatch, useAppSelector } from "@hooks/useRedux";
import { listenOneProfile } from "@lib/profile";
import { updateContact } from "@lib/user";
import useTranslation from "next-translate/useTranslation";
import dynamic from "next/dynamic";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";

const ProfileForm = dynamic(() => import("@components/forms/ProfileForm"), {
  ssr: false,
});

const Profile = ({ profileId }) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const unsub = listenOneProfile(profileId, setProfile);
    return () => unsub();
  }, []);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  if (!profile || !profileId) return null;

  const handleProfileSubmit = async (data) => {
    const res = await updateContact(profileId, data).then(() => {
      enqueueSnackbar("Updated!", {
        variant: "success",
        autoHideDuration: 2000,
      });
    });
  };

  return <ProfileForm values={profile} handleSubmit={handleProfileSubmit} />;
};

export default Profile;

export const getServerSideProps = withProtectedUser(
  async (context, { user, profile }) => {
    const profileId = context.params.cid;

    if (user?.trustLevel < 4 && profileId !== profile.id) {
      return { redirect: { destination: `/app/settings/${profile.id}` } };
    }

    return {
      props: { profileId },
    };
  }
);
