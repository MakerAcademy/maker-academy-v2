import { withProtectedUser } from "@hoc/routes";
import { useAppDispatch } from "@hooks/useRedux";
import { approveRejectContent } from "@lib/content";
import { fetchPendingContent } from "@redux/slices/contentSlice";
import React, { useEffect, useState } from "react";

const Admin = () => {
  const [pendingContent, setPendingContent] = useState(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPendingContent()).then(({ payload }) =>
      setPendingContent(payload?.result)
    );
  }, []);

  const handleAccept = (id) => {
    approveRejectContent({ id, approve: true }).then(
      ({ success }) =>
        success && setPendingContent((old) => old.filter((i) => i.id !== id))
    );
  };

  const handleReject = (id) => {
    approveRejectContent({ id, approve: false }).then(
      ({ success }) =>
        success && setPendingContent((old) => old.filter((i) => i.id !== id))
    );
  };

  return (
    <div>
      Pending Content
      <div>
        {pendingContent &&
          pendingContent.map(({ contentType, title, id }, i) => (
            <div key={id}>
              <p>
                {i}: {title} {contentType} {id}
              </p>

              <button onClick={() => handleAccept(id)}>Accept</button>
              <button onClick={() => handleReject(id)}>Reject</button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Admin;

export const getServerSideProps = withProtectedUser(null, { trustLevel: 4 });
