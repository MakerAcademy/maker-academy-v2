import { auth } from "@config/firebase";
import {
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";

const handler = async (req, res) => {
  const { email, password } = req.body;

  console.log("INSIDE");

  if (!email || !password)
    return res.status(500).json({ error: "Invalid Email or Password" });

  try {
    await setPersistence(auth, browserSessionPersistence);

    const response = await signInWithEmailAndPassword(auth, email, password);

    return res.status(200).json({
      user: response.user,
      success: true,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Unexpected error." });
  }
};

export default handler;
