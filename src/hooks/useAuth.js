import React, { useState, useEffect, useContext, createContext } from "react";
import firebase, { auth } from "../firebase";
const authContext = createContext();
// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const _auth = useProvideAuth();
  return <authContext.Provider value={_auth}>{children}</authContext.Provider>;
}
// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};
// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [isLoading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.

  function signInWithGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    return auth.signInWithPopup(provider);
  }

  function signInWithGitHub() {
    var provider = new firebase.auth.GithubAuthProvider();
    return auth.signInWithPopup(provider);
  }

  const signout = () => {
    return auth.signOut();
  };

  const formatUser = (user) => ({
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    photoUrl: user.photoURL,
  });

  const handleUser = (rawUser) => {
    setLoading(true);
    if (rawUser) {
      const formattedUser = formatUser(rawUser);
      setUser(formattedUser);
      setLoading(false);
    } else {
      setUser(false);
      setLoading(false);
    }
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(handleUser);
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);
  // Return the user object and auth methods
  return {
    isLoading,
    user,
    signInWithGoogle,
    signInWithGitHub,
    signout,
  };
}
