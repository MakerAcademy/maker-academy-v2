import { withUser } from "@hoc/routes";
import Auth from "@page-components/Auth";

const Login = () => {
  return <Auth />;
};

export default Login;

export const getServerSideProps = withUser(null, { hideIfUserExists: true });
