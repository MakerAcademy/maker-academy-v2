import { withUser } from "@hoc/routes";
import { handleRegister } from "@lib/auth";
import Link from "next/link";
import { useState } from "react";

const Register = () => {
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

      <button onClick={() => handleRegister(email, password)}>Register</button>
    </div>
  );
};

export default Register;

export const getServerSideProps = withUser(null, { hideIfUserExists: true });
