import "../assets/css/feed.css";

const Feed = () => {
	return (
		<>
			<div className="feed--container">
				<div className="feed--header">
					<div className="feed--title">Your feed</div>
					<div className="feed--button">
						<a class="waves-effect waves-light btn" href>
							New room
						</a>
					</div>
				</div>
				<div className="feed-rooms--container">
					<div className="feed--room">
						<div className="room-flex">
							<div className="room--title">The Callback guys</div>
							<div className="room--moderators">Tuhin Das, Joyan Serrao</div>
						</div>
						<div className="room-members-live-count">
							<span className="live--indicator">
								<i className="bi bi-circle-fill"></i>
							</span>
							<span className="member--count">2 </span>
						</div>
					</div>
					<div className="feed--room">
						<div className="room-flex">
							<div className="room--title">The Callback guys</div>
							<div className="room--moderators">Tuhin Das, Joyan Serrao</div>
						</div>
						<div className="room-members-live-count">
							<span className="live--indicator">
								<i className="bi bi-circle-fill"></i>
							</span>
							<span className="member--count">2 </span>
						</div>
					</div>
					<div className="feed--room">
						<div className="room-flex">
							<div className="room--title">The Callback guys</div>
							<div className="room--moderators">Tuhin Das, Joyan Serrao</div>
						</div>
						<div className="room-members-live-count">
							<span className="live--indicator">
								<i className="bi bi-circle-fill"></i>
							</span>
							<span className="member--count">2 </span>
						</div>
					</div>
					<div className="feed--room">
						<div className="room-flex">
							<div className="room--title">The Callback guys</div>
							<div className="room--moderators">Tuhin Das, Joyan Serrao</div>
						</div>
						<div className="room-members-live-count">
							<span className="live--indicator">
								<i className="bi bi-circle-fill"></i>
							</span>
							<span className="member--count">2 </span>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Feed;
