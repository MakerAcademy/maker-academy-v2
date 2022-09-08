import { withProtectedUser } from "@hoc/routes";
import { listenUsers } from "@lib/user";
import UsersTable from "@page-components/Admin/UsersTable";
import { useEffect, useState } from "react";

const Admin = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const unsub = listenUsers(setData);
    return () => unsub();
  }, []);

  return (
    <div>
      <UsersTable data={data} />
    </div>
  );
};

export default Admin;

export const getServerSideProps = withProtectedUser(null, { trustLevel: 4 });
