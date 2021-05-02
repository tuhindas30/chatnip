import { Link } from "react-router-dom";
import "../assets/css/feed.css";
import { firestore } from "../firebase";
import useFirestoreQuery from "../hooks/useFirestoreQuery";

const Feed = ({ uid }) => {
  const roomsCollectionRef = firestore
    .collection("rooms")
    .where("members", "array-contains", uid);

  const { data, status } = useFirestoreQuery(roomsCollectionRef);

  const handleDeleteRoom = async (roomId) => {
    try {
      await firestore.collection("rooms").doc(roomId).delete();
    } catch (error) {
      console.log(error);
    }
  };

  if (status === "loading") return <div>Loading...</div>;
  return (
    <div className="feed-rooms--container">
      {Array.isArray(data) &&
        data.map((room) => (
          <div className="feed--room">
            <Link key={room.id} to={`/room/${room.id}`}>
              <div>
                <div className="room--title">{room.topic}</div>
                <div className="room--moderators">
                  {room.members.join(", ")}
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
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Feed;
