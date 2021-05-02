import { useEffect } from "react";
import { useNavigate } from "react-router";
import "../assets/css/signin.css";
import useRequireAuth from "../hooks/useRequiredAuth";
import PropagateLoader from "react-spinners/PropagateLoader";

const SignIn = () => {
  const auth = useRequireAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (auth.user) {
      navigate("/dash", { replace: true });
    }
  }, [auth.user]);

  const handleGoogleAuthClick = async () => {
    try {
      await auth.signInWithGoogle();
    } catch (error) {
      console.log(error);
    }
  };

  const handleGitHubAuthClick = async () => {
    try {
      await auth.signInWithGitHub();
    } catch (error) {
      console.log(error);
    }
  };

  if (auth.user === null)
    return (
      <div className="loader">
        <PropagateLoader loading={true} size={15} color="var(--color-accent)" />
      </div>
    );

  return (
    <div className="signin--container">
      <div className="login-form--container">
        <div className="form--title">Welcome</div>
        <p>
          By logging in you accept our{" "}
          <span className="form--link">Privacy Policy</span> and{" "}
          <span className="form--link">Terms of Service</span>.
        </p>
        <div className="login-buttons--container">
          <div className="login--button">
            <button
              onClick={handleGoogleAuthClick}
              className="waves-effect waves-light btn-large">
              <i className="bi bi-google left"></i>
              Login with Google
            </button>
          </div>
          <div className="login--button">
            <button
              onClick={handleGitHubAuthClick}
              className="waves-effect waves-light btn-large">
              <i className="bi bi-github left"></i>
              Login with GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
