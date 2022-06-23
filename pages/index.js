import ThemeToggle from "@components/buttons/ThemeSwitch";
import { useAppSelector } from "@hooks/useRedux";
import { activeTheme } from "@redux/slices/themeSlice";
import Link from "next/link";
import { useSelector } from "react-redux";
import { handleSignOut } from "@lib/auth";

const Home = () => {
  const theme = useSelector(activeTheme);
  const { user } = useAppSelector((state) => state.user);
  const { profile } = useAppSelector((state) => state.profile);

  return (
    <div style={{ padding: "20px" }}>
      <p>User</p>
      {user && <p>{JSON.stringify(user)}</p>}

      {user && <button onClick={handleSignOut}>Sign out</button>}

      <br />
      <br />

      <p>Profile</p>
      {profile && <p>{JSON.stringify(profile)}</p>}

      <br />
      <br />

      <p>Theme</p>
      <p>{theme}</p>
      <ThemeToggle />

      <br />
      <br />

      {!user && (
        <>
          <Link href="/login">
            <button>Login</button>
          </Link>

          <Link href="/register">
            <button>Register</button>
          </Link>
        </>
      )}
    </div>
  );
};

export default Home;

// export const getStaticProps = async (context) => {

// }
