import { getContact } from "@lib/user";
import { Container } from "@mui/material";

const User = ({ user }) => {
  return <Container sx={{ py: 5 }}>{user.email}</Container>;
};

export default User;

export async function getServerSideProps(context) {
  try {
    const id = context.params.id;

    const doc = await getContact(id);

    if (!doc.id) {
      return { redirect: { destination: "/profiles" } };
    }

    return {
      props: {
        user: JSON.parse(JSON.stringify(doc)),
      },
    };
  } catch (error) {
    console.log(1, error);
    return { redirect: { destination: "/profiles" } };
  }
}
