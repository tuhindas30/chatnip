import Navbar from "../components/Navbar";
import Feed from "../components/Feed";
import "../assets/css/dashboard.css";

const Dashboard = () => {
	return (
		<>
			<Navbar />
			<div className="dashboard--container">
				<Feed />
			</div>
		</>
	);
};

export default Dashboard;
