import { withProtectedUser } from "@hoc/routes";
import { submitCourse } from "@lib/course";

const DUMMY_COURSE = {
  title: "Course 1",
  description:
    "Magna et eu enim velit sit et reprehenderit commodo exercitation.",
  level: "beginner",
  topic: "MakerDAO",
  brand: "Meta Analysis",
  duration: 30,
  markdown: "### Hello this is a markdown value",
  documents: ["XQg5Kc8gZxd3IQ3yResU"],
  thumbnail:
    "https://prod-discovery.edx-cdn.org/media/course/image/0e575a39-da1e-4e33-bb3b-e96cc6ffc58e-8372a9a276c1.png",
};

const NewCourse = ({ user, profile }) => {
  const handleCourseSubmit = async (data) => {
    const res = await submitCourse(profile.id, data);

    console.log(res);
  };

  return (
    <div>
      <div>{JSON.stringify(DUMMY_COURSE)}</div>
      <button onClick={() => handleCourseSubmit(DUMMY_COURSE)}>
        submit course
      </button>
    </div>
  );
};

export default NewCourse;

export const getServerSideProps = withProtectedUser();
