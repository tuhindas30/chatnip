import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import firebase, { firestore } from "../firebase";
import ScrollToBottom from "react-scroll-to-bottom";
import useFirestoreQuery from "../hooks/useFirestoreQuery";
import useRequireAuth from "../hooks/useRequiredAuth";
import PuffLoader from "react-spinners/PuffLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assets/css/room.css";

const Room = () => {
  const auth = useRequireAuth();
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const roomCollectionRef = firestore.collection("rooms");
  const { data: roomData } = useFirestoreQuery(
    roomCollectionRef.orderBy("createdAt", "desc").limit(25)
  );
  const roomObj = roomData && roomData.find((item) => item?.id === roomId);
  const conversationCollectionRef = firestore
    .collection("rooms")
    .doc(roomId)
    .collection("conversations");

  const { data, status } = useFirestoreQuery(
    conversationCollectionRef.orderBy("createdAt").limit(25)
  );

  const handleMessageSubmit = async () => {
    const { uid, photoUrl } = auth.user;
    try {
      await conversationCollectionRef.add({
        content: message,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        photoUrl,
        uid,
      });
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleLeaveRoom = async () => {
    try {
      await roomCollectionRef.doc(roomId).update({
        members: firebase.firestore.FieldValue.arrayRemove(auth.user.uid),
      });
    } catch (error) {
      console.log(error);
    }
    navigate("/dash");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleMessageSubmit();
  };

  const handleCopyRoomId = () => {
    navigator.clipboard.writeText(roomId);
    toast.dark("Room ID copied to clipboard", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
    });
  };

  if (!auth.user)
    return (
      <div className="loader">
        <PuffLoader loading={true} size={50} color="var(--color-accent)" />
      </div>
    );
  if (status === "loading")
    return (
      <div className="loader">
        <PuffLoader loading={true} size={100} color="var(--color-accent)" />
      </div>
    );

  return (
    <>
      <div className="dashboard--container">
        <ToastContainer />
        <div className="room--container">
          <div className="room--header">
            <div className="room--title">{roomObj?.topic}</div>
            <small>
              <span style={{ color: "var(--color-primary-200)" }}>with</span>{" "}
              <span className="room--admin">{roomObj?.ownerId}</span>
            </small>
          </div>
          <ScrollToBottom className="room-chat-window">
            {Array.isArray(data) &&
              data.map((chat) => (
                <div
                  className={`chat-message--container ${
                    chat.uid === auth.user.uid && "sent"
                  }`}>
                  <div className="chat-user-avatar">
                    {chat?.photoUrl ? (
                      <img
                        src={chat.photoUrl}
                        alt="avatar"
                        className="circle"
                      />
                    ) : (
                      <i className="bi bi-person-circle"></i>
                    )}
                  </div>
                  <div className="chat-message">{chat.content}</div>
                </div>
              ))}
          </ScrollToBottom>
          <div className="room--footer">
            <div className="input-message">
              <div className="input-field">
                <i className="material-icons prefix">mode_edit</i>
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter your message"
                  className="materialize-textarea"></input>
              </div>
            </div>
            <div className="footer--button">
              <button
                onClick={() => handleMessageSubmit(auth.user.uid)}
                className="btn waves-effect waves-light"
                name="action">
                <i className="bi bi-caret-right-fill"></i>
              </button>
              <button
                onClick={handleCopyRoomId}
                className="btn waves-effect"
                name="action">
                <i className="bi bi-clipboard"></i>
              </button>
              {roomObj?.ownerId === auth.user.uid ? (
                <Link to="/" className="btn waves-effect waves-light">
                  Back
                </Link>
              ) : (
                <button
                  onClick={handleLeaveRoom}
                  className="btn waves-effect "
                  name="action">
                  Leave
                  <i className="bi bi-box-arrow-right right"></i>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Room;
