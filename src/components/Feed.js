import { Link } from "react-router-dom";
import "../assets/css/feed.css";
import { firestore } from "../firebase";
import useFirestoreQuery from "../hooks/useFirestoreQuery";
import PropagateLoader from "react-spinners/PropagateLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Feed = ({ uid }) => {
  const roomsCollectionRef = firestore
    .collection("rooms")
    .where("members", "array-contains", uid);

  const { data, status } = useFirestoreQuery(roomsCollectionRef);

  const handleDeleteRoom = async (roomId) => {
    try {
      await firestore.collection("rooms").doc(roomId).delete();
      toast.dark("Room deleted", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (status === "loading")
    return (
      <div className="loader">
        <PropagateLoader loading={true} size={15} color="var(--color-accent)" />
      </div>
    );

  return (
    <div className="feed-rooms--container">
      <ToastContainer />
      {Array.isArray(data) &&
        data.map((room) => (
          <div key={room.id} className="feed--room">
            <Link
              to={`/room/${room.id}`}
              style={{ color: "var(--color-accent)" }}>
              <div>
                <div className="room--title">{room.topic}</div>
                <div className="room--moderators">
                  Members: {room.members.join(", ")}
                </div>
              </div>
            </Link>
            <div className="room-members-live-count">
              <span className="live--indicator">
                <i className="bi bi-circle-fill"></i>
              </span>
              <span className="member--count">{room.members.length} </span>
              <button
                onClick={() => handleDeleteRoom(room.id)}
                className="btn waves-effect waves-light"
                name="action">
                <i className="bi bi-trash"></i>
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Feed;
