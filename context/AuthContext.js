'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '@/firebase';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userDataObj, setUserDataObj] = useState({});
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
      .then(toast('Logged In Successfully'))
      .catch(toast('Error Logging In'));
  }

  function logout() {
    setCurrentUser(null);
    setUserDataObj(null);
    return signOut(auth);
  }

  useEffect(() => {
    return onAuthStateChanged(auth, async (user) => {
      try {
        setLoading(true);
        setCurrentUser(user);
        if (!user) {
          console.log('No User');
          return;
        }
        console.log('Fetching Data');
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        let firebaseData = {};
        if (docSnap.exists()) {
          console.log('Found Data');
          firebaseData = docSnap.data();
          console.log(firebaseData);
        }
        setUserDataObj(firebaseData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    });
  }, []);

  const value = {
    currentUser,
    userDataObj,
    setUserDataObj,
    signup,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
