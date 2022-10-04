import { withProtectedUser } from "@hoc/routes";
import { useAppDispatch } from "@hooks/useRedux";
import { listenPublishedContent } from "@lib/content";
import PublishedContentTable from "@page-components/Admin/PublishedContentTable";
import { useEffect, useState } from "react";

const Admin = () => {
  const [content, setContent] = useState(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsub = listenPublishedContent(setContent);
    return () => unsub();
  }, []);

  return (
    <div>
      <PublishedContentTable data={content} />
    </div>
  );
};

export default Admin;

export const getServerSideProps = withProtectedUser(null, { trustLevel: 4 });
