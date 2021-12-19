/* eslint-disable import/newline-after-import */
/* eslint-disable react/prop-types */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/button-has-type */
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { firebaseApp } from "../../firebase";
import {AuthContext} from '../../../../Context/Auth'
import { useMutation,gql } from "@apollo/client";
export default function InfoOption({ id,admin }) {
  const [Open, setOpen] = useState(false);
  const history = useHistory();
  const {user}=useContext(AuthContext)


  const [leaveRoom,{loading}]=useMutation(LEAVE_ROOM,{
    variables:{userId:user.id,roomId:id}
  })

  const handleDeleteProject = (e) => {
    e.preventDefault();
    const deleteConfirmation = window.confirm("Are you Sure ?");
    if (deleteConfirmation) {
      leaveRoom()
      firebaseApp
        .database()
        .ref("rooms")
        .child(id)
        .remove()
        .then(() =>{})
        .catch((event) => console.error("Error removing document: ", event));
        firebaseApp.database()
        .ref("users")
        .child(user.id)
        .child('rooms')
        .child(id).remove()

        firebaseApp
        .database()
        .ref("groups")
        .child(id)
        .remove()
        .then(() => history.push("/"))
        .catch((event) => console.error("Error removing document: ", event));

       
    }

    setOpen(false);
  };

  const handleLeaveProject = async (e) => {
    e.preventDefault();
    const deleteConfirmation = window.confirm("Are you Sure ?");
    if (deleteConfirmation) {
      leaveRoom()
      firebaseApp.database()
        .ref("users")
        .child(user.id)
        .child('rooms')
        .child(id).remove()

        firebaseApp
        .database()
        .ref("groups")
        .child(id)
        .child(user.id)
        .remove().then(() => history.push("/"))
    }
  };

  return (
    <div style={{ padding: "0px 8px", marginTop: "5px" }}>
      <button
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          border: "0px",
          cursor: "pointer",
          backgroundColor: "#132c33 ",
          color: "white",
        }}
        onClick={() => setOpen(!Open)}
      >
        <h6>Privacy & Support</h6>
        <i
          className={["fas", Open ? "fa-angle-down" : "fa-angle-left"].join(
            " "
          )}
          style={{ fontSize: "20px" }}
        ></i>
      </button>
      {Open && (
        <div>
          {user.username === admin? (
            <button
              style={{
                padding: "8px",
                marginTop: "5px",
                backgroundColor: "#7554a0",
                border: "0px",
                borderRadius: "5px",
                color: "white",
                cursor: "pointer",
                width: "100%",
              }}
              onClick={handleDeleteProject}
            >
              <i className='fas fa-trash' style={{ marginRight: "5px" }}></i>
              Delete the project
            </button>
          ) : (
            <button
              style={{
                padding: "8px",
                marginTop: "5px",
                backgroundColor: "#7554a0",
                border: "0px",
                borderRadius: "5px",
                color: "white",
                cursor: "pointer",
                width: "100%",
              }}
              onClick={handleLeaveProject}
            >
              <i
                className='fas fa-sign-out-alt'
                style={{ marginRight: "5px" }}
              ></i>
              Leave the project
            </button>
          )}
        </div>
      )}
    </div>
  );
}


const LEAVE_ROOM=gql`

mutation leaveRoom($userId:ID!,$roomId:String!){
  leaveRoom(userId:$userId,roomId:$roomId)
}

`;
