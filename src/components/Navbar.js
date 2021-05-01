import "../assets/css/navbar.css";

const Navbar = () => {
	return (
		<>
			<div className="navbar-fixed">
				<nav className="nav-extended">
					<div className="nav-wrapper">
						<a href className="brand-logo">
							ChatNip
						</a>
						<a href data-target="mobile-demo" className="sidenav-trigger">
							<i className="material-icons">menu</i>
						</a>
						<div id="nav-mobile" className="right hide-on-med-and-down">
							<i class="bi bi-person-circle"></i>
						</div>
					</div>
				</nav>
			</div>

			<div className="sidenav" id="mobile-demo">
				<i class="bi bi-person-circle"></i>
			</div>
		</>
	);
};

export default Navbar;
