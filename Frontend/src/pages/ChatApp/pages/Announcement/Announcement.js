import React, { useState, useEffect, useContext } from "react";
import { Button } from "@material-ui/core";
import s from "../../../dashboard/Dashboard.module.scss";
import PostForm from "./PostForm";
import OpenZoom from "../../components/InfoBar/OpenZoom";
import Info from "./Info";
import { AuthContext } from "../../../../Context/Auth";
import ShowPosts from "./ShowPosts";
import ProjectBrief from "../../components/InfoBar/ProjectBrief";
import moment from "moment";
import { Col, Row } from "reactstrap";
import { firebaseApp } from "../../firebase";
import { Link } from "react-router-dom";
import Badge from "@material-ui/core/Badge";

export default function Announcement({
  userImage,
  roomID,
  OpenOrCloseChat,
  roomName,
  OpenFile,
  handleOpenFile,
  handleOpenMember,
  memberOpen,
  OpenAccouncemnet,
  OpenOrClosePost,
  images,
  files,
  roomData,
}) {
  const { user } = useContext(AuthContext);
  const [OpenZoomModal, setOpenZoomModal] = useState(false);
  const [OpenPost, setOpenPost] = useState(false);
  const [showNav, setShowNavbar] = useState(false);
  const [OpenInfo, setOpenInfo] = useState(false);
  const [OpenDoc, setOpenDoc] = useState(true);
  const [OpenMedia, setOpenMedia] = useState(false);
  const groupRef = firebaseApp.database().ref("groups");
  const [members, setMembers] = useState([]);

  const fileKeys = files ? Object.keys(files) : [];
  const imageKeys = images ? Object.keys(images) : [];

  const handleOpenDoc = () => {
    setOpenDoc(true);
    setOpenMedia(false);
  };

  const handleOpenMedia = () => {
    setOpenDoc(false);
    setOpenMedia(true);
  };

  const showNavBar = (e) => {
    var scroll = e.target.scrollTop;
    if (scroll > 220) setShowNavbar(true);
    else setShowNavbar(false);
  };

  const tooglePostBox = () => {
    setOpenPost(true);
  };

  const openZoom = () => {
    if(roomData.zoomLink===undefined) setOpenZoomModal(!OpenZoomModal);
    else window.open(roomData.zoomLink)
  }

  useEffect(() => {
    groupRef.child(roomID).on("value", (snap) => setMembers(snap.val()));
  }, [roomID]);

  const memberKey = members ? Object.keys(members) : [];
  const handleClickOpen=() => setOpenInfo(true)
  const handleClose=() => setOpenInfo(false)

  return (
    <>
      <div
        style={{overflowY: "scroll" }}
        onScroll={showNavBar}
      >
        <img
          src={userImage}
          className="Announcement-image"
          alt=""
          style={{ width: "100%", height: "40%", objectFit: "cover" }}
        />
        <div className={`${showNav ? "showNav" : ""}`} style={{ zIndex: "40" }}>
          <div className="room__header">
            <div className="room__headerInfo" style={{ paddingLeft: "2px" }}>
              <h5 style={{ color: "white", marginBottom: "0px" }}>
                {roomName}
              </h5>
              <p style={{ fontSize: "15px" }}>1 Member</p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                marginTop: "0px",
              }}
            >
            <i
            className='fas fa-house-user'
            style={{
              color: "cyan",
              fontSize: "18px",
              marginRight: "15px",
              textDecoration: "none",
              display:'none'
            }}
          />
            <i
            className='fab fa-github'
            style={{
              color: "cyan",
              fontSize: "18px",
              marginRight: "15px",
              textDecoration: "none",
              display:'none'
            }}
          />
          <i
            role='button'
            className='fas fa-tasks'
            style={{
              color: "cyan",
              fontSize: "18px",
              marginRight: "15px",
              marginTop: "0px",
              cursor: "pointer",
              display:'none'
            }}
            onClick={handleClickOpen}
          />
              <Badge
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            badgeContent=""
            style={{ fontSize: "10px" }}
            color={roomData.zoomLink === "" || roomData.zoomLink === undefined
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
                  roomData.zoomLink === "" || roomData.zoomLink === undefined
                    ? "white"
                    : "rgb(0, 132, 255)",
                cursor: "pointer",
              }}
              onClick={openZoom}
            ></i>
          </Badge>

            </div>
            <OpenZoom
              open={OpenZoomModal}
              handleClose={() => setOpenZoomModal(!OpenZoomModal)}
              roomId={roomID}
            />
          </div>

          <div
            style={{
              display: "flex",
              borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
              width: "82%",
              justifyContent: "space-between",
            }}
            className="OpenAccouncemnet"
          >
            <div style={{ display: "flex" }}>
              <Button
                style={{
                  color: OpenAccouncemnet ? "rgb(0, 132, 255)" : "white",
                  textTransform: "capitalize",
                  borderBottom: OpenAccouncemnet
                    ? "1px solid rgb(0, 132, 255)"
                    : "0px",
                }}
                onClick={OpenOrClosePost}
              >
                Announcements
              </Button>
              <Button
                style={{ color: "white", textTransform: "capitalize" }}
                onClick={OpenOrCloseChat}
              >
                Chat
              </Button>
              <Button
                style={{
                  color: OpenFile ? "rgb(0, 132, 255)" : "white",
                  textTransform: "capitalize",
                  borderBottom: OpenFile ? "1px solid rgb(0, 132, 255)" : "0px",
                }}
                onClick={handleOpenFile}
              >
                Files
              </Button>
              <Button
                style={{
                  color: memberOpen ? "rgb(0, 132, 255)" : "white",
                  textTransform: "capitalize",
                  borderBottom: memberOpen ? "1px solid rgb(0, 132, 255)" : "0px",
                }}
                onClick={handleOpenMember}
              >
                Members
              </Button>
            </div>

            {showNav && (
              <div>
                <i
                  className="fab fa-github"
                  style={{
                    color: "cyan",
                    fontSize: "18px",
                    textDecoration: "none",
                    marginRight: "20px",
                    cursor: "pointer",
                  }}
                />
                <i
                  role="button"
                  className="fas fa-tasks"
                  style={{
                    color: "cyan",
                    fontSize: "18px",
                    // marginRight: "20px",
                    marginTop: "3px",
                    cursor: "pointer",
                  }}
                  onClick={() => setOpenInfo(!OpenInfo)}
                />
              </div>
            )}
          </div>
        </div>
        <div style={{ display: "flex" }}>
          {OpenAccouncemnet && (
            <div style={{ width: "40rem" }} className="Accouncemnet-card">
              <div
                className="card-body"
                style={{
                  display: "flex",
                  backgroundColor: "rgba(0,0,0,0.2)",
                  height: "70px",
                  margin: "15px",
                  borderRadius: "8px",
                }}
              >
                <img
                  className="rounded-circle"
                  src={user.photoUrl}
                  alt="..."
                  width="35"
                  height="35"
                />
                <div
                  style={{
                    overflow: "auto",
                    width: "100%",
                    marginLeft: "10px",
                  }}
                >
                  <button
                    className={`${s.form_control} ${s.form_control_sm}`}
                    onClick={() => tooglePostBox()}
                  >
                    What's on your mind? Share your idea.......
                  </button>
                </div>
              </div>
              <ShowPosts roomId={roomID} user={user} />
            </div>
          )}

          {OpenFile && (
            <div
              style={{
                padding: "15px",
                flex: "1",
                backgroundColor: "rgba(0,0,0,0.1)",
                margin: "20px",
                borderRadius: "10px",
              }}
            >
              <h6>Files</h6>
              <div
                style={{
                  display: "flex",
                  margin: "10px 5px",
                  marginBottom: "25px",
                }}
              >
                <Button
                  style={{
                    color: OpenDoc ? "rgb(0, 132, 255)" : "white",
                    textTransform: "capitalize",
                    borderBottom: OpenDoc
                      ? "1px solid rgb(0, 132, 255)"
                      : "0px",
                  }}
                  onClick={handleOpenDoc}
                >
                  Docs
                </Button>
                <Button
                  style={{
                    color: OpenMedia ? "rgb(0, 132, 255)" : "white",
                    textTransform: "capitalize",
                    borderBottom: OpenMedia
                      ? "1px solid rgb(0, 132, 255)"
                      : "0px",
                  }}
                  onClick={handleOpenMedia}
                >
                  Media
                </Button>
              </div>
              {OpenMedia && (
                <Row>
                  {imageKeys &&
                    imageKeys.map((img, index) => (
                      <Col lg={3} xl={2} xs={12}>
                        <img
                          key={index}
                          src={images[img]}
                          alt="message-attachment"
                          width="100"
                          height="90"
                          style={{
                            margin: "0px 2px",
                            border: "1px solid rgba(255,255,255,0.05)",
                          }}
                        />
                      </Col>
                    ))}
                </Row>
              )}

              {OpenDoc &&
                fileKeys &&
                fileKeys.map((file, index) => (
                  <div
                    key={index}
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div style={{ display: "flex" }}>
                      <i class="far fa-file-pdf"></i>
                      <h6 style={{ marginLeft: "5px" }}>
                        {files[file].filename}
                      </h6>
                    </div>
                    <i
                      class="fas fa-ellipsis-v"
                      style={{ cursor: "pointer" }}
                    ></i>
                  </div>
                ))}

              {((!images && !files) ||
                images.length === 0 ||
                files.length === 0) && <p>Keep all your files in one place</p>}
            </div>
          )}
          {memberOpen &&
            memberKey.map((m) => (
              <div
                key={m}
                style={{
                  padding: "15px",
                  flex: "1",
                  backgroundColor: "rgba(0,0,0,0.1)",
                  margin: "20px 40px",
                  borderRadius: "10px",
                  alignItems: "center"
                }}
              >
                <div style={{ display: "flex" }}>
                  <img
                    src={members[m].avatar}
                    alt=""
                    className="rounded-circle"
                    width="35"
                    height="35"
                  />
                  <div style={{ marginLeft:'10px'}}>
                    <Link to={`/profile/${members[m].userId}}`} style={{ marginBottom:'0px' }}>{members[m].name}</Link><span style={{fontSize:'7px',fontWeight:'bold',marginLeft:'6px'}}>{members[m].role}</span>
                    <p style={{ fontSize:'10px'}}>{members[m].profession}</p>
                  </div>
                  
                </div>
              </div>
            ))}

          <Info roomData={roomData} />
        </div>
        {OpenPost && (
          <PostForm
            user={user}
            roomID={roomID}
            OpenPost={OpenPost}
            tooglePostBox={tooglePostBox}
            userImage={userImage}
            handleOpenPost={() => setOpenPost(false)}
          />
        )}
        {OpenInfo && (
          <ProjectBrief
            open={OpenInfo}
            handleClickOpen={handleClickOpen}
            handleClose={handleClose}
            details={roomData.details}
          />
        )}
      </div>
    </>
  );
}
