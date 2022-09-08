import { withProtectedUser } from "@hoc/routes";
import { listenContacts } from "@lib/user";
import ContactsTable from "@page-components/Admin/ContactsTable";
import { useEffect, useState } from "react";

const Admin = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const unsub = listenContacts(setData);
    return () => unsub();
  }, []);

  return (
    <div>
      <ContactsTable data={data} />
    </div>
  );
};

export default Admin;

export const getServerSideProps = withProtectedUser(null, { trustLevel: 4 });
