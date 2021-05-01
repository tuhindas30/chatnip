import "../assets/css/room.css";

const Room = () => {
	return (
		<>
			<div className="dashboard--container">
				<div className="room--container">
					<div className="room--header">
						<div className="room--title">Room</div>
						<small>
							<span style={{ color: "var(--color-primary-200)" }}>with</span>{" "}
							<span className="room--admin">R44LQ72U7Q6I</span>
						</small>
					</div>
					<div className="room-chat-window">
						<div className="chat-message--container">
							<div className="chat-user-avatar">
								<i className="bi bi-person-circle"></i>
							</div>
							<div className="chat-message">Hello</div>
						</div>
						<div className="chat-message--container">
							<div className="chat-user-avatar">
								<i className="bi bi-person-circle"></i>
							</div>
							<div className="chat-message">Hi</div>
						</div>
						<div className="chat-message--container">
							<div className="chat-user-avatar">
								<i className="bi bi-person-circle"></i>
							</div>
							<div className="chat-message">Hey</div>
						</div>
						<div className="chat-message--container">
							<div className="chat-user-avatar">
								<i className="bi bi-person-circle"></i>
							</div>
							<div className="chat-message">Nice to talk</div>
						</div>
						<div className="chat-message--container">
							<div className="chat-user-avatar">
								<i className="bi bi-person-circle"></i>
							</div>
							<div className="chat-message">Yup</div>
						</div>
						<div className="chat-message--container">
							<div className="chat-user-avatar">
								<i className="bi bi-person-circle"></i>
							</div>
							<div className="chat-message">Bye</div>
						</div>
						<div className="chat-message--container">
							<div className="chat-user-avatar">
								<i className="bi bi-person-circle"></i>
							</div>
							<div className="chat-message">Bye</div>
						</div>
						<div className="chat-message--container">
							<div className="chat-user-avatar">
								<i className="bi bi-person-circle"></i>
							</div>
							<div className="chat-message">Bye</div>
						</div>
					</div>
					<div className="room--footer">
						<div className="input-message">
							<div className="row">
								<form className="col s12">
									<div className="row">
										<div className="input-field col s6">
											<i className="material-icons prefix">mode_edit</i>
											<textarea
												id="icon_prefix2"
												className="materialize-textarea"></textarea>
											<label for="icon_prefix2">Message</label>
										</div>
									</div>
								</form>
							</div>
						</div>
						<div className="footer--button">
							<button className="btn waves-effect waves-light" name="action">
								Send
								<i className="bi bi-arrow-right-circle-fill right"></i>
							</button>
						</div>
						<div className="footer--button">
							<button className="btn waves-effect waves-light" name="action">
								Leave
								<i className="bi bi-box-arrow-right right"></i>
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default Room;
