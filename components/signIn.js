"use client";

import { useEffect } from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup, updateCurrentUser } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import firebase_app from "../config";

export default function SignIn() {
  const auth = getAuth(firebase_app);
  const [user] = useAuthState(auth);

  const googleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider);
    } catch (e) {
      console.log(e);
    }
  };
  console.log(user);

  useEffect(() => console.log(auth.currentUser));

  if (auth.currentUser) {
    console.log(auth.currentUser);
    return <button onClick={() => auth.signOut()}>{auth.currentUser.displayName}</button>;
  }
  return <button onClick={googleSignIn}>Sign In</button>;
}
