import { withUser } from "@hoc/routes";
import Auth from "@page-components/Auth";

const Register = () => {
  return <Auth />;
};

export default Register;

export const getServerSideProps = withUser(null, { hideIfUserExists: true });
