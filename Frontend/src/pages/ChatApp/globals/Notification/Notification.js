/* eslint-disable react-hooks/exhaustive-deps */
import react, { useContext, useEffect, useState } from "react";
import { firebaseApp } from "../../firebase";
import db from "../../firebase";
import { AuthContext } from "../../../../Context/Auth";
import Badge from "@material-ui/core/Badge";
import Context from "../../../../components/Context/Context";

export default function Notification({ NotificationRoom }) {
  const { user } = useContext(AuthContext);

  const [channelsVisitedState, setChannelsVisitedState] = useState({});
  const [notification, setNotification] = useState([]);
  const userRef = firebaseApp.database().ref("users");
  const UpdateRef = firebaseApp.database().ref("rooms");
  console.log(notification);

  useEffect(() => {
    if (user) {
      userRef
        .child(user.id)
        .child("lastVisited")
        .on("value", (snap) => {
          setChannelsVisitedState(snap.val());
        });

      let rooms = Object.keys(channelsVisitedState);

      rooms.forEach((room) => {
        UpdateRef.child(room)
          .child("messageUpdate")
          .on("value", (snap) => {
            if (channelsVisitedState[room] < snap.val()) {
              let newNot = notification.filter((n) => n !== room);
              newNot.push(room);
              setNotification(newNot);
            }
          });
      });
    }
  }, [NotificationRoom, user]);
  return (
    <Badge
      badgeContent={notification.length}
      color='error'
      style={{ fontSize: "18px" }}
    >
      <i class='fab fa-facebook-messenger'></i>
    </Badge>
  );
}
