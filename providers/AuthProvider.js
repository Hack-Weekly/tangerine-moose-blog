"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

import { auth } from "@/firebase/firebase";
import { Collections, getCollection } from "@/firebase/firestore";

export const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(true);
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
      // TODO: remove for prod
      // console.log(user);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const credential = await signInWithPopup(auth, provider);
      const userCollection = getCollection(Collections.Users);
      const userDoc = doc(userCollection, credential.user.uid);

      // TODO: move this to a function
      // check if document exists
      const docSnap = await getDoc(userDoc);
      if (docSnap.exists()) {
        await setDoc(
          userDoc,
          {
            displayName: credential.user.displayName,
            email: credential.user.email,
          },
          { merge: true },
        );
      } else {
        await setDoc(userDoc, {
          uid: credential.user.uid,
          displayName: credential.user.displayName,
          email: credential.user.email,
          createdAt: serverTimestamp(),
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (e) {
      console.log(e);
    }
  };

  return <AuthContext.Provider value={{ user, loading, signIn, signOut }}>{children}</AuthContext.Provider>;
};
