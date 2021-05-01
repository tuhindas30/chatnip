import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize";
import "./assets/css/global.css";
import { Routes, Route } from "react-router-dom";
import SignIn from "./views/SignIn";
import Dashboard from "./views/Dashboard";

const App = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<SignIn />}></Route>
				<Route path="/dash" element={<Dashboard />}></Route>
			</Routes>
		</>
	);
};

export default App;
