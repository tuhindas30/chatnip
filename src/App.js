import "materialize-css/dist/css/materialize.min.css";
import "./assets/css/global.css";
import { Routes, Route } from "react-router-dom";

import Signin from "./views/Signin";
function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Signin />}></Route>
			</Routes>
		</>
	);
}

export default App;
