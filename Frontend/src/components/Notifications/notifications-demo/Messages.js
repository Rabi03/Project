/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { gql, useQuery } from "@apollo/client";

import Moment from "react-moment";

import s from "./ListGroup.module.scss"; // eslint-disable-line
import ContantLoader from "./ContantLoader";
import { AuthContext } from "../../../Context/Auth";
import MessageCard from "./MessageCard";

export default function Messages({ handleNotification }) {
  const [messages, setMessages] = useState([]);
  const { user } = useContext(AuthContext);

  const {
    loading,
    error,
    data: User,
  } = useQuery(GET_ROOMS, {
    onError(err) {
      console.log(err);
    },
    variables: { username: user.username },
  });

  if (loading) return <ContantLoader />;
  else
    return (
      <ListGroup className={[s.listGroup, "thin-scroll"].join(" ")}>
        {User.getUserByUsername.rooms.map((room, index) => (
          <MessageCard
            key={index}
            id={room.roomId}
            roomName={room.roomName}
            roomPic={room.roomPic}
            activeRooms={User.getUserByUsername.activeRooms}
            handleNotification={handleNotification}
          />
        ))}
      </ListGroup>
    );
}

const GET_ROOMS = gql`
  query getUserByUsername($username: String!) {
    getUserByUsername(username: $username) {
      rooms {
        roomId
        roomName
        roomPic
      }
      activeRooms
    }
  }
`;
