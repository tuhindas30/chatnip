import { Link } from "react-router-dom";
import "../assets/css/navbar.css";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const { user, signout } = useAuth();
  return (
    <>
      <div className="navbar-fixed">
        <nav className="nav-extended">
          <div className="nav-wrapper">
            <Link to="/" className="brand-logo">
              ChatNip
            </Link>
            {/* <a href="#" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </a> */}
            <div id="nav-mobile" className="right hide-on-med-and-down">
              {user?.photoUrl ? (
                <img src={user.photoUrl} alt={user.name} />
              ) : (
                <i className="bi bi-person-circle"></i>
              )}
              <button onClick={signout}>Signout</button>
            </div>
          </div>
        </nav>
      </div>

      <div className="sidenav" id="mobile-demo">
        {user?.photoUrl ? (
          <img src={user.photoUrl} alt={user.name} />
        ) : (
          <i className="bi bi-person-circle"></i>
        )}
        <button onClick={signout}>Signout</button>
      </div>
    </>
  );
};

export default Navbar;
