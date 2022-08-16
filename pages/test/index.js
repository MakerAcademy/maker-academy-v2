import { db } from "@config/firebase";
import { cleanObject } from "@utils/helpers";
import { collection, doc, setDoc } from "firebase/firestore";
import React from "react";

const Test = () => {
  const handleClick = async () => {
    const answersRef = doc(
      db,
      "assessments",
      "BKaHx8nQKB3DlnTRmx1S",
      "answers",
      "answers"
    );
    const answersRes = await setDoc(answersRef, { answers: ["dsfds"] });
  };

  return (
    <div>
      <button onClick={handleClick}>Click</button>
    </div>
  );
};

export default Test;
