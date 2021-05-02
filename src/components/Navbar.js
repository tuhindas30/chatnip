import { Link } from "react-router-dom";
import "../assets/css/navbar.css";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const { user, signout } = useAuth();
  console.log({ user });
  return (
    <>
      <nav className="nav-extended">
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo">
            ChatNip
          </Link>
          {/* <a href="#" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </a> */}
          <div className="right hide-on-med-and-down">
            <div className="user--avatar">
              {user?.photoUrl ? (
                <img src={user.photoUrl} alt={user.name} className="circle" />
              ) : (
                <i className="bi bi-person-circle"></i>
              )}
            </div>
            {user && (
              <button
                className="waves-effect waves-light btn signout--btn"
                onClick={signout}>
                Signout
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* <div>
        {user?.photoUrl ? (
          <img src={user.photoUrl} alt={user.name} />
        ) : (
          <i className="bi bi-person-circle"></i>
        )}
        <button onClick={signout}>Signout</button>
      </div> */}
    </>
  );
};

export default Navbar;
