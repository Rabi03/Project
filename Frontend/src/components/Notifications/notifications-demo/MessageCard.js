import React, { useState, useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { AuthContext } from "../../../Context/Auth";
import Avatar from "@material-ui/core/Avatar";
import db from "../../../pages/ChatApp/firebase";
import { firebaseApp } from "../../../pages/ChatApp/firebase";
import firebase from "firebase";
import { ListGroupItem } from "reactstrap";
import s from "./ListGroup.module.scss";

export default function MessageCard({
  id,
  roomPic,
  roomName,
  handleNotification,
}) {
  const history = useHistory();

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
      handleNotification(snap.val());
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
        if (snap.val() < message.timestamp) {
          setNotification(true);
        } else setNotification(false);
      });
  }, [id, message]);

  const roomClick = (id) => {
    setLastVisited(user.id, id);
    history.push(`/rooms/${id}`);
  };

  const setLastVisited = (id, channel) => {
    const lastVisited = userRef.child(id).child("lastVisited").child(channel);
    lastVisited.set(firebase.database.ServerValue.TIMESTAMP);
    lastVisited.onDisconnect().set(firebase.database.ServerValue.TIMESTAMP);
  };

  return (
    <ListGroupItem
      key={id}
      className={[s.listGroupItem].join(" ")}
      onClick={() => roomClick(id)}
    >
      <span className={[s.notificationIcon, s.img_sm].join(" ")}>
        <img
          className='rounded-circle'
          src={roomPic}
          alt='...'
          width='40'
          height='40'
        />
        <i className='status status-bottom bg-success' />
      </span>
      {/* {chat.last_message.created && (
          <Moment className='text-link help float-right' fromNow>
            {chat.last_message.created}
          </Moment>
        )} */}

      <h6 className='m-0 fw-bold mb-1'>{roomName}</h6>
      <div
        style={{
          display: "flex",
          paddingBottom: "0px",
        }}
      >
        <p
          className='text-short m-0'
          style={{ fontSize: "12px", color: notification ? "cyan" : "white" }}
        >
          {message.name && `${message.name} : `}
        </p>
        <p
          className='text-short m-0'
          style={{
            fontSize: "12px",
            paddingLeft: "5px",
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
    </ListGroupItem>
  );
}
