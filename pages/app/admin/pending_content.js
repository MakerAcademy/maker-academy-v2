import { withProtectedUser } from "@hoc/routes";
import { useAppDispatch } from "@hooks/useRedux";
import { listenPendingContent } from "@lib/content";
import PendingContentTable from "@page-components/Admin/PendingContentTable";
import { useEffect, useState } from "react";

const Admin = () => {
  const [pendingContent, setPendingContent] = useState(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsub = listenPendingContent(setPendingContent);
    return () => unsub();
  }, []);

  return (
    <div>
      <PendingContentTable data={pendingContent} />
    </div>
  );
};

export default Admin;

export const getServerSideProps = withProtectedUser(null, { trustLevel: 4 });
