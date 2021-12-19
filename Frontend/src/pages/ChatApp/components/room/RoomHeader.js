import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import OpenZoom from "../InfoBar/OpenZoom";
import Badge from "@material-ui/core/Badge";
import { Button } from "@material-ui/core";
import { firebaseApp } from "../../firebase";

function RoomHeader({
  roomName,
  roomId,
  seed,
  showDate,
  handleCloseInfo,
  avatar,
  OpenOrClosePost,
  handleOpenFile,
  handleOpenMember,
  OpenInfo,
  zoomLink,
}) {
  const [Open, setOpen] = useState(false);
  const RoomRef = firebaseApp.database().ref("rooms");
  const [Update, setUpdate] = useState(0);

  useEffect(() => {
    RoomRef.child(roomId)
      .child("messageUpdate")
      .on("value", (snap) => {
        setUpdate(snap.val());
      });
  }, [roomId]);

  const handleClose = () => {
    setOpen(!Open);
  };

  const openZoom = () => {
    if(zoomLink===undefined) setOpen(!Open);
    else window.open(zoomLink)
  }

  return (
    <div style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}>
      <div className="room__header">
        <Avatar src={avatar} alt="Group Avatar" />
        <div className="room__headerInfo">
          <h5 style={{ color: "white", marginBottom: "0px" }}>{roomName}</h5>
          {Update > 0 && <p>{showDate(Update)}</p>}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Badge
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            badgeContent=""
            style={{ fontSize: "10px" }}
            color={zoomLink === "" || zoomLink === undefined
                    ? "white"
                    : "secondary"}
            
            variant="dot"
          >
            <i
              className="fas fa-video"
              style={{
                marginRight: "15px",
                fontSize: "18px",
                color:
                  zoomLink === "" || zoomLink === undefined
                    ? "white"
                    : "rgb(0, 132, 255)",
                cursor: "pointer",
              }}
              onClick={openZoom}
            ></i>
          </Badge>

          <i
            className="fas fa-info-circle"
            style={{
              fontSize: "18px",
              color: OpenInfo ? "rgb(0, 132, 255) " : "white",
              cursor: "pointer",
            }}
            onClick={handleCloseInfo}
          ></i>
        </div>
        <OpenZoom open={Open} handleClose={handleClose} roomId={roomId} />
      </div>
      <div style={{ display: "flex" }}>
        <Button
          style={{ color: "white", textTransform: "capitalize", border: "0px" }}
          onClick={OpenOrClosePost}
        >
          Announcements
        </Button>
        <Button
          style={{
            color: "rgb(0, 132, 255)",
            textTransform: "capitalize",
            borderBottom: "1px solid rgb(0, 132, 255)",
          }}
        >
          Chat
        </Button>
        <Button
          style={{ color: "white", textTransform: "capitalize" }}
          onClick={handleOpenFile}
        >
          Files
        </Button>
        <Button
          style={{ color: "white", textTransform: "capitalize" }}
          onClick={handleOpenMember}
        >
          Members
        </Button>
      </div>
    </div>
  );
}

export default RoomHeader;
