import { withProtectedUser } from "@hoc/routes";
import { submitDocument } from "@lib/document";
import React from "react";

const DUMMY_DOCUMENT = {
  title: "Title 1",
  description:
    "Magna et eu enim velit sit et reprehenderit commodo exercitation.",
  level: "beginner",
  topic: "MakerDAO",
  brand: "Meta Analysis",
  duration: 30,
  markdown: "### Hello this is a markdown value",
  private: false,
  thumbnail:
    "https://prod-discovery.edx-cdn.org/media/course/image/0e575a39-da1e-4e33-bb3b-e96cc6ffc58e-8372a9a276c1.png",
};

const NewDocument = ({ user, profile }) => {
  const handleDocumentSubmit = async (data) => {
    const res = await submitDocument(profile.id, data);

    console.log(res);
  };

  return (
    <div>
      <div>{JSON.stringify(DUMMY_DOCUMENT)}</div>
      <button onClick={() => handleDocumentSubmit(DUMMY_DOCUMENT)}>
        submit document
      </button>
    </div>
  );
};

export default NewDocument;

export const getServerSideProps = withProtectedUser();
