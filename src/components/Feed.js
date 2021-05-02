import { Link } from "react-router-dom";
import "../assets/css/feed.css";
import { firestore } from "../firebase";
import useFirestoreQuery from "../hooks/useFirestoreQuery";

const Feed = ({ uid }) => {
  const roomsCollectionRef = firestore.collection("rooms");
  // .where("members", "array-contains", uid);

  const { data, status } = useFirestoreQuery(roomsCollectionRef);

  if (status === "loading") return <div>Loading...</div>;
  return (
    <div className="feed-rooms--container">
      {Array.isArray(data) &&
        data.map((room) => (
          <Link key={room.id} to={`/room/${room.id}`} className="feed--room">
            <div className="room-flex">
              <div className="room--title">{room.topic}</div>
              <div className="room--moderators">{room.members.join(", ")}</div>
            </div>
            <div className="room-members-live-count">
              <span className="live--indicator">
                <i className="bi bi-circle-fill"></i>
              </span>
              <span className="member--count">{room.members.length} </span>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default Feed;
