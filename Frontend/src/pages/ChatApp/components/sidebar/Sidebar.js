/* eslint-disable react-hooks/rules-of-hooks */
import { lazy, Suspense, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../Context/Auth";
import db from "../../firebase";
import { firebaseApp } from "../../firebase";
import { gql, useQuery } from "@apollo/client";
import Loading from "../animations/Loading";

const SidebarRoom = lazy(() => import("./SidebarRoom"));
const SidebarHeader = lazy(() => import("./SidebarHeader"));

export default function Sidebar({ handleRoomID }) {
  const { user } = useContext(AuthContext);
  const [Update, setUpdate] = useState({});
  const userRef = firebaseApp.database().ref("users");
  const [rooms, setRooms] = useState([]);
  // const {
  //   loading,
  //   error,
  //   data: User,
  // } = useQuery(GET_ROOMS, {
  //   onError(err) {
  //     console.log(err);
  //   },
  //   variables: { username: user.username },
  // });
  // if (loading) return <div></div>;

  useEffect(() => {
    userRef
      .child(user.id)
      .child("rooms")
      .orderByChild("messageUpdate")
      .on("value", (snap) => {
        setRooms(snap.val());
      });
  }, [user, Update]);

  const GetRooms = () => {
    let roomKeys = Object.keys(rooms);

    return roomKeys.map((room, index) => (
      <SidebarRoom
        key={index}
        id={room}
        roomName={rooms[room].roomName}
        roomPic={rooms[room].roomPic}
        handleRoomID={handleRoomID}
        handleUpdate={(message) => setUpdate(message)}
      />
    ));
  };

  return (
    <div className='sidebar'>
      <SidebarHeader />
      <Suspense fallback={<Loading />}>
        <div className='sidebar__rooms'>{rooms && GetRooms()}</div>
      </Suspense>
    </div>
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
