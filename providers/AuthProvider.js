"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { GoogleAuthProvider, onIdTokenChanged, signInWithPopup } from "firebase/auth";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { removeCookie, setCookie } from "tiny-cookie";

import { auth } from "@/firebase/firebase";
import { createUserWithId, docToUser, updateUser, userCollection } from "@/firebase/utils/userUtils";

export const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      setLoading(true);
      if (user) {
        try {
          const token = await user.getIdToken();
          setCookie("token", token, { secure: true });
          const userRef = doc(userCollection, user.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            await updateUser(user.uid, {
              email: user.email,
              photoURL: user.photoURL,
            });
            setUser(docToUser(userSnap));
          } else {
            await createUserWithId(user.uid, {
              displayName: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
            });
            setUser({ uid: user.uid, displayName: user.displayName, email: user.email, photoURL: user.photoURL });
          }
        } catch (e) {
          console.log(e);
        }
      } else {
        setUser(null);
        removeCookie("token");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    const { uid } = user;
    const unsubscribeUser = onSnapshot(doc(userCollection, uid), (doc) => {
      if (doc.exists()) {
        setUser(docToUser(doc));
      } else {
        setUser(null);
      }
    });

    return () => unsubscribeUser();
  }, [user, user?.uid]);

  const signIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
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
