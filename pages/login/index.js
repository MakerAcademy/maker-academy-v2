import { withUser } from "@hoc/routes";
import { handleGoogleLogin, handleLogin } from "@lib/auth";
import Link from "next/link";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <Link href="/">
        <a>Go back to home page</a>
      </Link>

      <br />

      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={"Email"}
      />

      <input
        type={"password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder={"Password"}
      />

      <button onClick={() => handleLogin(email, password)}>Log in</button>

      <br />

      <button onClick={handleGoogleLogin}>Log in with google</button>
    </div>
  );
};

export default Login;

export const getServerSideProps = withUser(null, { hideIfUserExists: true });
