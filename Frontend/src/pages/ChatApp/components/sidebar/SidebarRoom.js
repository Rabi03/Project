/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useContext, useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import { useHistory, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import db from "../../firebase";
import { firebaseApp } from "../../firebase";
import firebase from "firebase";
import { AuthContext } from "../../../../Context/Auth";
import Context from "../../../../components/Context/Context";

const SidebarRoom = ({ id, roomName, roomPic, handleUpdate, handleRoomID }) => {
  const history = useHistory();
  const { roomId } = useParams([]);

  const userRef = firebaseApp.database().ref("users");
  const RoomRef = firebaseApp.database().ref("rooms").child(id);
  const [seed, setSeed] = useState("");
  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState({});
  const [UpdateTime, setUpdateTime] = useState(0);
  const [notification, setNotification] = useState(false);

  const getRoom = () => {
    RoomRef.child("messages").on("child_added", (snap) => {
      setMessage(snap.val());
      handleUpdate(snap.val());
    });
  };

  useEffect(() => {
    if (id) {
      getRoom();
    }
  }, [id]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  useEffect(() => {
    userRef
      .child(user.id)
      .child("lastVisited")
      .child(id)
      .on("value", (snap) => {
        if (snap.val() < message.timestamp && roomId !== id) {
          setNotification(true);
        } else setNotification(false);
      });

    userRef
      .child(user.id)
      .child("rooms")
      .child(id)
      .child("messageUpdate")
      .set(firebase.database.ServerValue.TIMESTAMP);
  }, [id, message]);

  const roomClick = () => {
    setLastVisited(user.id, id);
    history.push(`/rooms/${id}`);
    handleRoomID(id);
  };

  const setLastVisited = (id, channel) => {
    const lastVisited = userRef.child(id).child("lastVisited").child(channel);
    lastVisited.set(firebase.database.ServerValue.TIMESTAMP);
    lastVisited.onDisconnect().set(firebase.database.ServerValue.TIMESTAMP);
  };

  return (
    <div className='sidebar__Room' onClick={roomClick}>
      <div
        className='sidebar__RoomContainer'
        style={{
          backgroundColor: id === roomId ? "rgba(56, 88, 152, 0.2)" : "",
        }}
      >
        <Avatar src={roomPic} alt='Group Avatar' />
        <div className='sidebar__RoomInfo'>
          <h2 style={{ color: "white" }}>{roomName}</h2>
          <div
            style={{
              display: "flex",
              paddingBottom: "0px",
            }}
          >
            <p
              style={{
                marginBottom: "0px",
                marginTop: "0px",
                color: notification ? "cyan" : "white",
              }}
            >
              {message.name && `${message.name}:`}
            </p>

            <p
              className='text-short'
              style={{
                marginLeft: "5px",
                marginBottom: "0px",
                marginTop: "0px",
                width: "120px",
                color: notification ? "cyan" : "white",
              }}
            >
              {!message.name && "Start the Project"}
              {message &&
                (message.image
                  ? "Share an image"
                  : message.file
                  ? "Share a file"
                  : message?.message)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

SidebarRoom.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
};

export default SidebarRoom;
