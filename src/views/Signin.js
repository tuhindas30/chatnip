import "../assets/css/signin.css";

const Signin = () => {
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
						<a className="waves-effect waves-light btn-large" href>
							<i className="bi bi-google left"></i>
							Login with Google
						</a>
					</div>
					<div className="login--button">
						<a className="waves-effect waves-light btn-large" href>
							<i className="bi bi-github left"></i>
							Login with GitHub
						</a>
					</div>
					<div className="login--button">
						<a className="waves-effect waves-light btn-large" href>
							<i className="bi bi-twitter left"></i>
							Login with Twitter
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Signin;
