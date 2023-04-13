"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { GoogleAuthProvider, onIdTokenChanged, signInAnonymously, signInWithPopup, updateProfile } from "firebase/auth";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { removeCookie, setCookie } from "tiny-cookie";

import { auth } from "@/firebase/firebase";
import { createUserWithId, docToUser, isExistingUser, updateUser, userCollection } from "@/firebase/utils/userUtils";

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
          const isExist = await isExistingUser(user.uid);
          if (isExist) {
            await updateUser(user.uid, {
              displayName: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
            });
          } else {
            await createUserWithId(user.uid, {
              displayName: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
            });
          }
          const userRef = doc(userCollection, user.uid);
          const userSnap = await getDoc(userRef);
          setUser(docToUser(userSnap));
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
  }, [user?.uid]);

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

  const googleSignIn = async (onSuccess) => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      onSuccess && onSuccess();
    } catch (e) {
      console.log(e);
    }
  };

  const anonymousSignIn = async (displayName, onSuccess) => {
    try {
      await signInAnonymously(auth);
      await updateProfile(auth.currentUser, { displayName });
      onSuccess && onSuccess();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut, googleSignIn, anonymousSignIn }}>
      {children}
    </AuthContext.Provider>
  );
};
