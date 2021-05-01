import { useEffect } from "react";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";

function useRequireAuth(redirectUrl = "/") {
  const auth = useAuth();
  const navigate = useNavigate();
  // If auth.user is false that means we're not
  // logged in and should redirect.
  useEffect(() => {
    if (auth.user === false) {
      navigate(redirectUrl);
    }
  }, [auth, navigate]);
  return auth;
}

export default useRequireAuth;
