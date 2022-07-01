import React, { useState } from "react";

const CourseCarriculum = () => {
  const [carriculums, setCarriculums] = useState([]);

  const addCarriculumSection = (name, description) => {
    setCarriculums((old) => [
      ...old,
      {
        name: "Introduction",
        description:
          "Minim minim fugiat mollit qui exercitation enim et et esse exercitation aliquip tempor elit.",
        documents: [],
      },
    ]);
  };

  const addDocumentToCarriculum = (i) => {
    setCarriculums((old) => {
      old[i] = { ...old[i], documents };
    });
  };

  return <div>CourseCarriculum</div>;
};

export default CourseCarriculum;
