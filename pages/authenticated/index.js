import { withProtectedUser } from "@hoc/routes";

const Authenticated = () => {
  return <div>You can access this page!</div>;
};

export const getServerSideProps = withProtectedUser(null, { trustLevel: 2 });

export default Authenticated;
