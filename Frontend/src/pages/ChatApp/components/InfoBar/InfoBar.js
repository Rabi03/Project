/* eslint-disable react/prop-types */
import React, { useEffect,useState } from "react";
import InfoBarHader from "./InfoBarHader";
import InfoUserSettings from "./InfoUserSettings";
import InfoFile from "./InfoFile";
import {firebaseApp} from '../../firebase'

export default function InfoBar({ roomName, roomId, data }) {
  const groupRef=firebaseApp.database().ref("groups")
  const [members,setMembers]=useState([])

  useEffect(()=>{
    groupRef.child(roomId).on("value",snap=>setMembers(snap.val()))
    groupRef.child(roomId).on("child_added",s=>{
      groupRef.child(roomId).on("value",snap=>setMembers(snap.val()))
    })
  },[roomId])

  const memberKey=members?Object.keys(members):[]
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: "0.35",
        overflow: "scroll",
        backgroundColor: "#132c33",
      }}
    >
      <InfoBarHader roomName={roomName} avatar={data.avatar} github={data.githubLink} details={data.details} />
      <InfoUserSettings id={roomId} memberKey={memberKey} members={members} admin={data.admin} />
      <InfoFile data={data} />
    </div>
  );
}
