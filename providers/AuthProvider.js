"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { GoogleAuthProvider, onIdTokenChanged, signInWithPopup } from "firebase/auth";
import { removeCookie, setCookie } from "tiny-cookie";

import { auth } from "@/firebase/firebase";
import { createUser, isExistingUser, updateUser } from "@/firebase/utils/userUtils";

export const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      setLoading(true);
      if (user) {
        setUser(user);
        const token = await user.getIdToken();
        setCookie("token", token, { secure: true });
      } else {
        setUser(null);
        removeCookie("token");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const credential = await signInWithPopup(auth, provider);
      const isExists = await isExistingUser(credential.user.uid);

      if (isExists) {
        await updateUser(credential.user.uid, {
          email: credential.user.email,
          photoURL: credential.user.photoURL,
        });
      } else {
        await createUser(credential.user.uid, {
          id: credential.user.uid,
          displayName: credential.user.displayName,
          email: credential.user.email,
          photoURL: credential.user.photoURL,
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
