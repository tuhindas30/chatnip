import { useEffect } from "react";
import { useNavigate } from "react-router";
import "../assets/css/signin.css";
import useRequireAuth from "../hooks/useRequiredAuth";

const SignIn = () => {
  const auth = useRequireAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (auth.user) {
      navigate("/dash", { replace: true });
    }
  }, [auth.user]);
  if (auth.user === null) return <div>Loading....</div>;
  const handleGoogleAuthClick = async () => {
    try {
      await auth.signInWithGoogle();
    } catch (error) {
      console.log(error);
    }
  };

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
            <button className="waves-effect waves-light btn-large">
              <i className="bi bi-github left"></i>
              Login with GitHub
            </button>
          </div>
          <div className="login--button">
            <button className="waves-effect waves-light btn-large">
              <i className="bi bi-twitter left"></i>
              Login with Twitter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
