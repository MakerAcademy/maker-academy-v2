import ProfileBanner from "@components/ProfileBanner";
import { getContact } from "@lib/user";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Breadcrumbs, Container, Link, Typography } from "@mui/material";

const breadcrumbs = [
  <Link underline="hover" key="1" href="/">
    Home
  </Link>,
  <Link underline="hover" key="2" href="/users">
    Users
  </Link>,
];

const User = ({ user }) => {
  const name =
    user?.firstName || user?.lastName
      ? `${user?.firstName} ${user?.lastName}`
      : user?.email?.split("@")?.[0];

  return (
    <Container sx={{ py: 5 }}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        sx={{ mb: 5 }}
      >
        {breadcrumbs}
        <Typography key="3" color="text.primary">
          {name}
        </Typography>
      </Breadcrumbs>

      <ProfileBanner {...user} name={name} sx={{ mb: { xs: 5, md: 8 } }} />
    </Container>
  );
};

export default User;

export async function getServerSideProps(context) {
  try {
    const _id = context.params.id;

    const doc = await getContact(_id);

    if (!doc?.id) {
      return { redirect: { destination: "/users" } };
    }

    return {
      props: {
        user: JSON.parse(JSON.stringify(doc)),
      },
    };
  } catch (error) {
    console.log(1, error);
    return { redirect: { destination: "/users" } };
  }
}
