import Feed from "../components/Feed";
import "../assets/css/dashboard.css";
import "../assets/css/modal.css";
import useRequireAuth from "../hooks/useRequiredAuth";
import { useState } from "react";
import { firestore } from "../firebase";

const Dashboard = () => {
  const [showModal, setModal] = useState(false);
  const [topic, setTopic] = useState("");
  const auth = useRequireAuth();

  const roomCollectionRef = firestore.collection("rooms");

  const handleCreateRoom = async () => {
    const { uid } = auth.user;
    await roomCollectionRef.add({
      topic: topic,
      //   members: [uid],
      owner: uid,
      members: [uid],
      //   guests: [],
    });
  };

  const handleModalClose = () => {
    setModal(false);
    setTopic("");
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
      <div className="feed--container">
        <div className="feed--header">
          <div className="feed--title">Your feed</div>
          <div className="feed--button">
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
