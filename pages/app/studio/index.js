import { withProtectedUser } from "@hoc/routes";
import { useAppDispatch } from "@hooks/useRedux";
import { fetchUserContent } from "@redux/slices/contentSlice";
import React, { useEffect, useState } from "react";

const CreatorStudio = () => {
  const [content, setContent] = useState(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserContent()).then(({ payload }) =>
      setContent(payload?.result)
    );
  }, []);

  return (
    <div>
      {content &&
        content.map(({ contentType, title, id }, i) => (
          <p key={id}>
            {i}: {title} {contentType} {id}
          </p>
        ))}
    </div>
  );
};

export default CreatorStudio;

export const getServerSideProps = withProtectedUser();
