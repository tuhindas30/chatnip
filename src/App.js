import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize";
import "./assets/css/global.css";
import { Routes, Route } from "react-router-dom";
import SignIn from "./views/SignIn";
import Navbar from "./components/Navbar";
import Dashboard from "./views/Dashboard";
import Room from "./views/Room";

const App = () => {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path="/" element={<SignIn />}></Route>
				<Route path="/dash" element={<Dashboard />}></Route>
				<Route path="/room" element={<Room />}></Route>
			</Routes>
		</>
	);
};

export default App;
