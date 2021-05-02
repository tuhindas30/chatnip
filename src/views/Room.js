import { useEffect, useState } from "react";
import { useParams } from "react-router";
import "../assets/css/room.css";
import firebase, { firestore } from "../firebase";
import useFirestoreQuery from "../hooks/useFirestoreQuery";
import useRequireAuth from "../hooks/useRequiredAuth";

const Room = () => {
  const [raiseHand, setRaiseHand] = useState({ flag: false, userId: null });
  const auth = useRequireAuth();
  const { roomId } = useParams();
  const [message, setMessage] = useState("");

  const roomCollectionRef = firestore.collection("rooms");

  const { data: roomData } = useFirestoreQuery(
    roomCollectionRef.orderBy("createdAt", "desc").limit(25)
  );

  const roomObj = roomData?.find((item) => item.id === roomId);

  const conversationCollectionRef = firestore
    .collection("rooms")
    .doc(roomId)
    .collection("conversations");

  const { data } = useFirestoreQuery(
    conversationCollectionRef.orderBy("createdAt").limit(25)
  );

  const handleMessageSubmit = async () => {
    const { uid, photoUrl } = auth.user;
    await conversationCollectionRef.add({
      content: message,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      photoUrl,
      uid,
    });
    setMessage("");
  };

  const handleRaiseHand = (userId) => {
    setRaiseHand({ flag: true, userId: userId });
  };

  const handleUserAccept = async (userId) => {
    await roomCollectionRef
      .doc(roomId)
      .add({ members: [userId] }, { merge: true });
  };

  if (!auth.user) return <div>Loading....</div>;
  return (
    <>
      <div className="dashboard--container">
        {raiseHand.flag && (
          <div className="notification">
            <div>Username: {raiseHand.userId} wants to join</div>
            <button
              onClick={() => handleUserAccept(raiseHand.userId)}
              className="btn waves-effect waves-light"
              name="action">
              Accept
              <i className="bi bi-arrow-right-circle-fill right"></i>
            </button>
          </div>
        )}
        <div className="room--container">
          <div className="room--header">
            <div className="room--title">Room</div>
            <small>
              <span style={{ color: "var(--color-primary-200)" }}>with</span>{" "}
              <span className="room--admin">{auth.user.uid}</span>
            </small>
          </div>
          <div className="room-chat-window">
            {Array.isArray(data) &&
              data.map((chat) => (
                <div className="chat-message--container">
                  <div className="chat-user-avatar">
                    {chat?.photoUrl ? (
                      <img src={chat.photoUrl} alt="avatar" />
                    ) : (
                      <i className="bi bi-person-circle"></i>
                    )}
                  </div>
                  <div className="chat-message">{chat.content}</div>
                </div>
              ))}
          </div>
          <div className="room--footer">
            {roomObj?.members?.some((member) => member === auth.user.uid) ? (
              <>
                <div className="input-message">
                  <div className="input-field">
                    <i className="material-icons prefix">mode_edit</i>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      id="icon_prefix2"
                      className="materialize-textarea"></textarea>
                    <label htmlFor="icon_prefix2">Message</label>
                  </div>
                </div>
                <div className="footer--button">
                  <button
                    onClick={() => handleMessageSubmit(auth.user.uid)}
                    className="btn waves-effect waves-light"
                    name="action">
                    Send
                    <i className="bi bi-arrow-right-circle-fill right"></i>
                  </button>
                </div>
              </>
            ) : (
              <div className="footer--button">
                <button
                  onClick={handleRaiseHand}
                  className="btn waves-effect waves-light"
                  name="action">
                  Raise Hand
                  <i className="bi bi-arrow-right-circle-fill right"></i>
                </button>
              </div>
            )}
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
