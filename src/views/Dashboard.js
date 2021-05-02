import Feed from "../components/Feed";
import "../assets/css/dashboard.css";
import "../assets/css/modal.css";
import useRequireAuth from "../hooks/useRequiredAuth";
import { useState } from "react";
import firebase, { firestore } from "../firebase";
import { useNavigate } from "react-router-dom";
import useFirestoreQuery from "../hooks/useFirestoreQuery";

const Dashboard = () => {
  const [showModal, setModal] = useState(false);
  const [showJoinModal, setJoinModal] = useState(false);
  const [topic, setTopic] = useState("");
  const [roomId, setRoomId] = useState("");
  const auth = useRequireAuth();
  const navigate = useNavigate();
  const roomCollectionRef = firestore.collection("rooms");

  const { data } = useFirestoreQuery(
    roomCollectionRef.orderBy("createdAt", "desc").limit(25)
  );

  const handleCreateRoom = async () => {
    const { uid } = auth.user;
    try {
      await roomCollectionRef.add({
        topic: topic,
        ownerId: uid,
        members: [uid],
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
      navigate(`/room/${data && data[0].id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToRoom = async () => {
    navigate(`/room/${roomId}`);
    try {
      await roomCollectionRef
        .doc(roomId)
        .update({
          members: firebase.firestore.FieldValue.arrayUnion(auth.user.uid),
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalClose = () => {
    setModal(false);
    setTopic("");
  };

  const handleJoinModalClose = () => {
    setJoinModal(false);
    setRoomId("");
  };
  if (!auth.user) return <div>Loading....</div>;
  return (
    <div className="dashboard--container">
      {showModal && (
        <div id="modal1" className="modal">
          <div className="modal-content">
            <h4>New Room</h4>
            <p style={{ color: "var(--color-primary-300)" }}>
              Fill the following fields to start a new room
            </p>
            <div class="input-field inline">
              <input
                onChange={(e) => setTopic(e.target.value)}
                id="email_inline"
                type="text"
              />
              <label for="email_inline">Topic</label>
            </div>
          </div>
          <div className="modal-footer">
            <button
              onClick={handleModalClose}
              className="modal-close waves-effect waves-green btn-flat">
              Close
            </button>
            <button
              onClick={handleCreateRoom}
              className="modal-close waves-effect waves-green btn-flat">
              Create
            </button>
          </div>
        </div>
      )}
      {showJoinModal && (
        <div id="modal1" className="modal">
          <div className="modal-content">
            <h4>Join Room</h4>
            <p style={{ color: "var(--color-primary-300)" }}>
              Enter your Room ID
            </p>
            <div class="input-field inline">
              <input
                onChange={(e) => setRoomId(e.target.value)}
                id="email_inline"
                type="text"
              />
              <label for="email_inline">Room ID</label>
            </div>
          </div>
          <div className="modal-footer">
            <button
              onClick={handleJoinModalClose}
              className="modal-close waves-effect waves-green btn-flat">
              Close
            </button>
            <button
              onClick={handleAddToRoom}
              className="modal-close waves-effect waves-green btn-flat">
              Join
            </button>
          </div>
        </div>
      )}
      <div className="feed--container">
        <div className="feed--header">
          <div className="feed--title">Your feed</div>
          <div className="feed--button">
            <button
              onClick={() => setJoinModal(true)}
              className="waves-effect waves-light btn">
              Join room
            </button>
            <button
              onClick={() => setModal(true)}
              className="waves-effect waves-light btn">
              New room
            </button>
          </div>
        </div>
        <Feed uid={auth.user?.uid} />
      </div>
    </div>
  );
};

export default Dashboard;
