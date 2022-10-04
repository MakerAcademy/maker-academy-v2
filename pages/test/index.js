import { withAdminDb } from "@hoc/routes";

const Test = () => {
  const handleClick = async () => {
    // try {
    //   const q = await getDoc(doc(db, `test/9UNtMnxLOHqI8TCWWhR6`));
    //   console.log(q.data?.());
    // } catch (error) {
    //   console.log(error);
    //   return error;
    // }
  };

  return (
    <div>
      <button onClick={handleClick}>Click</button>
    </div>
  );
};

export default Test;

export const getServerSideProps = withAdminDb(async (context, { db }) => {
  // console.log(db);

  const course = await db
    .collection("test")
    .get()
    .then((snap) => {
      let arr = [];
      snap.docs.map((doc) => arr.push(doc.data()));

      return arr;
    });

  console.log(course);

  return {
    props: {},
  };
});
