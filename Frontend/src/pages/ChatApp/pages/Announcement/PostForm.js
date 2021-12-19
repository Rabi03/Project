import React, { useState } from "react";
import { Modal, ModalBody, ModalHeader, Button, Row, Col } from "reactstrap";
import { firebaseApp } from "../../firebase";
import firebase from "firebase/app";
import s from "../../../../components/Profile/Profile.module.scss";
import uid from 'uuid/dist/v4'

export default function PostForm({
  OpenPost,
  roomID,
  tooglePostBox,
  userImage,
  user,
  handleOpenPost,
}) {
  const [video, setVideo] = useState(false);
  const [showLink, setShowLink] = useState(false);
  const RoomRef = firebaseApp.database().ref("rooms").child(roomID);
  const storageRef=firebaseApp.storage().ref().child('chat/images/'+uid()+'.jpg')
  const [postInfo, setPostInfo] = useState({
    body: "",
    images: [],
    videoLink: "",
    Link: "",
    uid: user.id,
    userName: user.fName + " " + user.lName,
    userPic: user.photoUrl,
    createdAt: firebase.database.ServerValue.TIMESTAMP,
  });

  const { body, images, videoLink, Link } = postInfo;

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setPostInfo({ ...postInfo, [name]: value });
  };

  const handleImage = (e) => {
    const metadata = {
      contentType: 'image/jpeg',
    };
    const file = e.target.files[0];

    storageRef.put(file).then(function(result){
      storageRef.getDownloadURL().then(function(result){
        setPostInfo({ ...postInfo, ["images"]: [...images, result] });
      })
      .catch(err=>{
        console.log(err)
      }) 
  })
    .catch(err=>{
      console.log(err)
    })

  };

  const DeleteImage = (index,img) => {
    const newimages = [...images];
    newimages.splice(index, 1);
    setPostInfo({ ...postInfo, ["images"]: [...newimages] });
    firebaseApp.storage().refFromURL(img).delete()
  };

  const sendPost = () => {
    RoomRef.child("posts").push({
      ...postInfo,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendPost();
  };


  return (
    <Modal isOpen={OpenPost} toggle={tooglePostBox} className='post_box'>
      <div
        style={{
          marginBottom: "20px",
          backgroundColor: "transparent",
        }}
      >
        <h4 style={{ textAlign: "center" }}>Create a Post</h4>
        <i
          class='fas fa-times-circle'
          style={{
            position: "absolute",
            right: "0px",
            top: "2px",
            color: "white",
            cursor: "pointer",
            fontSize: "20px",
          }}
          onClick={handleOpenPost}
        ></i>
      </div>
      <ModalHeader
        toggle={tooglePostBox}
        style={{
          border: "0px",
          padding: "0px",
          paddingTop: "10px",
          paddingLeft: "10px",
          paddingRight: "10px",
        }}
      >
        <div style={{ display: "flex" }}>
          <span style={{ float: "left" }}>
            <img
              src={user.photoUrl}
              alt=''
              className='rounded-circle'
              width='40'
              height='40'
              style={{ objectFit: "cover" }}
            />
          </span>
          <h5 style={{ marginLeft: "5px" }}>
            <button
              style={{ textDecoration: "none", fontSize: "15px" }}
              className='btn-link'
            >
              {user.fName + " " + user.lName}
            </button>
            <p style={{ fontSize: "10px" }}>@{user.username}</p>
          </h5>
        </div>
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit}>
          <textarea
            required
            rows={3}
            placeholder=' Describe your idea...'
            style={{
              width: "100%",
              background: "#040620",
              height: "150px",
              border: "0px",
              color: "white",
            }}
            name='body'
            value={body}
            onChange={handleChange}
          />

          {images.length !== 0 && (
            <Row
              style={{
                display: "flex",
                width: "100%",
                overflow: "scroll",
                padding: "5px 30px",
                height: "150px",
              }}
            >
              {images.map((img, index) => (
                <Col lg={6} style={{ height: "100%", marginBottom: "10px" }}>
                  <i
                    class='fas fa-times-circle'
                    style={{
                      position: "absolute",
                      right: "22px",
                      top: "2px",
                      color: "rgba(0,0,0,0.8)",
                      backgroundColor: "#fff",
                      borderRadius: "20px",
                      border: "1px solid rgba(0,0,0,0.8)",
                      cursor: "pointer",
                    }}
                    onClick={() => DeleteImage(index,img)}
                  ></i>
                  <img
                    src={img}
                    alt=''
                    width='100%'
                    height='100%'
                    style={{ marginRight: "10px" }}
                  />
                </Col>
              ))}
            </Row>
          )}
          {video && (
            <div class='mb-3' style={{ padding: "10px" }}>
              <label for='exampleInputEmail1' class='form-label'>
                Create a Youtube video and share the link here.
              </label>
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type='text'
                  required
                  className={`${s.textFiled} ${s.textFiled_sm}`}
                  id='exampleInputEmail1'
                  aria-describedby='emailHelp'
                  style={{ width: "100%", marginRight: "12px" }}
                  name='videoLink'
                  autoComplete='off'
                  value={videoLink}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}
          {showLink && (
            <div class='mb-3' style={{ padding: "10px" }}>
              <label for='exampleInputEmail1' class='form-label'>
                Share any web or content link here.
              </label>
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type='text'
                  required
                  className={`${s.textFiled} ${s.textFiled_sm}`}
                  id='exampleInputEmail1'
                  aria-describedby='emailHelp'
                  style={{ width: "100%", marginRight: "12px" }}
                  name='Link'
                  autoComplete='off'
                  value={Link}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}
          <div className={`${s.addElement} row`}>
            <h5 style={{ marginLeft: "25px" }}>Add to Your Post</h5>
            <div style={{ paddingRight: "25px" }}>
              <label style={{ marginBottom: "0px" }}>
                <i
                  class='fas fa-image'
                  style={{
                    marginRight: "15px",
                    fontSize: "20px",
                    color: "#45BD62",
                    cursor: "pointer",
                  }}
                ></i>
                <input
                  type='file'
                  id='share_image'
                  style={{ display: "none" }}
                  name='images'
                  onChange={handleImage}
                />
              </label>
              <i
                class='fas fa-video'
                style={{
                  marginRight: "15px",
                  fontSize: "20px",
                  color: "#D32743",
                  cursor: "pointer",
                }}
                onClick={() => setVideo(!video)}
              ></i>
              <i
                class='fas fa-link'
                style={{
                  fontSize: "18px",
                  color: "#1877F2",
                  cursor: "pointer",
                }}
                onClick={() => setShowLink(!showLink)}
              ></i>
            </div>
          </div>
          <Button
            type='submit'
            style={{
              float: "right",
              backgroundColor: "transparent",
              border: "1px solid cyan ",
            }}
          >
            <i
              class='fas fa-paper-plane'
              style={{
                fontSize: "20px",
                color: "#00B2D9",
                cursor: "pointer",
              }}
            >
              {"  "}
              Share
            </i>
          </Button>
        </form>
      </ModalBody>
    </Modal>
  );
}
