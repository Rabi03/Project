/* eslint-disable no-useless-computed-key */
import React, { useContext, useState } from "react";

import { ModalBody, Button, Row, Col } from "reactstrap";
import { gql, useMutation } from "@apollo/client";
import { FETCH_POST_QUERY } from "../../Util/GraphQL";
import s from "./Profile.module.scss";
import { AuthContext } from "../../Context/Auth";
import firebase from "firebase/app";
import db, { auth, firebaseApp } from "../../pages/ChatApp/firebase";
import uid from 'uuid/dist/v4'

export default function PostIdea({ close }) {
  const [video, setVideo] = useState(false);
  const UserRef = firebaseApp.database().ref("users");
  const GroupRef = firebaseApp.database().ref("groups");
  const RoomRef = firebaseApp.database().ref("rooms");
  const storageRef=firebaseApp.storage().ref().child('post/images/'+uid()+'.jpg')
  const [showLink, setShowLink] = useState(false);
  const { user } = useContext(AuthContext);
  const [ideaInfo, setIndeaInfo] = useState({
    type: "idea",
    appName: "",
    appType: "",
    appLogo: "",
    title: "",
    body: "",
    groupId: "",
    maxMember: 0,
    githubLink: "",
    images: [],
    videoLink: "",
    Link: "",
    uid: user.id,
    username: user.username,
  });

  const [createPost, { error }] = useMutation(CREATE_POST, {
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POST_QUERY,
      });
      let newData = [...data.getPosts];
      newData = [result.data.createPost, ...newData];
      proxy.writeQuery({
        query: FETCH_POST_QUERY,
        data: {
          ...data,
          getPosts: {
            newData,
          },
        },
      });
      ideaInfo.body = "";
    },
    onError(err) {
      console.log(err);
    },
  });

  const [addRoom, { erro }] = useMutation(ADD_ROOM, {
    update(proxy) {
      console.log("successfully add room");
    },
    onError(err) {
      console.log(err);
    },
  });

  const createRoom = () => {
    if (groupName) {
      RoomRef.push({
        name: groupName,
        admin: user.username,
        avatar: user.photoUrl,
        details:{
          title,
          body
        },
        githubLink,
        progress:0,
        profession:user.profession.join(),
        messageUpdate: firebase.database.ServerValue.TIMESTAMP,
      }).then((snap) => {
        createPost({
          variables: {
            ...ideaInfo,
            groupId: snap.key,
          },
        });
        setLastVisited(user.id, snap.key);
        AddNewRoom(user.id, snap.key);
        addRoom({
          variables: {
            username: user.username,
            roomId: snap.key,
            roomName: groupName,
            roomPic: user.photoUrl,
          },
        });

        GroupRef.child(snap.key)
          .child(user.id)
          .set({
            name: user.fName + " " + user.lName,
            userId: user.id,
            avatar: user.photoUrl,
            profession:user.profession.join(),
            role: "admin",
          });
      });
    }
  };

  const AddNewRoom = (id, roomID) => {
    UserRef.child(id).child("rooms").child(roomID).set({
      roomName: groupName,
      roomPic: user.photoUrl,
      admin: user.id,
    });
  };

  const setLastVisited = (id, channel) => {
    const lastVisited = UserRef.child(id).child("lastVisited").child(channel);
    lastVisited.set(firebase.database.ServerValue.TIMESTAMP);
    lastVisited.onDisconnect().set(firebase.database.ServerValue.TIMESTAMP);
  };

  const {
    title,
    body,
    groupName,
    maxMember,
    githubLink,
    images,
    videoLink,
    Link,
  } = ideaInfo;

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "maxMember") value = parseInt(value);

    setIndeaInfo({ ...ideaInfo, [name]: value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    storageRef.put(file).then(function(result){
      storageRef.getDownloadURL().then(function(result){
        setIndeaInfo({ ...ideaInfo, ["images"]: [...images, result] });
      })
      .catch(err=>{
        console.log(err)
      }) 
  })
    .catch(err=>{
      console.log(err)
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createRoom();
    close();
  };

  const DeleteImage = (index) => {
    const newimages = [...images];
    newimages.splice(index, 1);
    setIndeaInfo({ ...ideaInfo, ["images"]: [...newimages] });
  };

  return (
    <>
      <ModalBody style={{ padding: "5px", marginTop: "0px" }}>
        <form onSubmit={handleSubmit}>
          <div class='' style={{ padding: "10px" }}>
            <label for='exampleInputEmail1' class='form-label'>
              Title
            </label>
            <input
              type='text'
              required
              className={`${s.form_control} ${s.form_control_sm}`}
              id='exampleInputEmail1'
              aria-describedby='emailHelp'
              placeholder='Give a title or a short name of your idea...'
              autoComplete='off'
              name='title'
              value={title}
              onChange={handleChange}
            />
          </div>
          <div class='' style={{ padding: "10px" }}>
            <label for='exampleInputEmail1' class='form-label'>
              Description
            </label>
            <textarea
              className={`${s.post_textbox}`}
              required
              rows={3}
              placeholder=' Describe your idea...'
              style={{ width: "100%", background: "#040620" }}
              name='body'
              value={body}
              onChange={handleChange}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginLeft: "10px",
            }}
          >
            <div>
              <span>Group Name</span>
              <input
                type='text'
                required
                className={`${s.textFiled} ${s.textFiled_sm}`}
                aria-label='With input'
                name='groupName'
                autoComplete='off'
                value={groupName}
                onChange={handleChange}
              />
            </div>
            <div>
              <span>Max. Member</span>
              <input
                type='number'
                required
                className={`${s.textFiled} ${s.textFiled_sm}`}
                aria-label='With input'
                name='maxMember'
                autoComplete='off'
                value={maxMember}
                onChange={handleChange}
              />
            </div>
          </div>
          <div class='mb-3' style={{ padding: "10px" }}>
            <label for='exampleInputEmail1' class='form-label'>
              Create a Github Repository and share the link here.
            </label>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type='text'
                required
                className={`${s.textFiled} ${s.textFiled_sm}`}
                id='exampleInputEmail1'
                aria-describedby='emailHelp'
                style={{ width: "100%", marginRight: "12px" }}
                name='githubLink'
                autoComplete='off'
                value={githubLink}
                onChange={handleChange}
              />
            </div>
          </div>
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
                    onClick={() => DeleteImage(index)}
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
    </>
  );
}

const CREATE_POST = gql`
  mutation createPost(
    $type: String!
    $appName: String!
    $appType: String!
    $title: String!
    $body: String!
    $groupId: String!
    $groupName: String!
    $maxMember: Int!
    $appLogo: String!
    $githubLink: String!
    $images: [String]!
    $videoLink: String!
    $Link: String!
    $uid: String!
    $username: String!
  ) {
    createPost(
      postInput: {
        type: $type
        appName: $appName
        appType: $appType
        title: $title
        body: $body
        groupId: $groupId
        groupName: $groupName
        maxMember: $maxMember
        appLogo: $appLogo
        githubLink: $githubLink
        images: $images
        videoLink: $videoLink
        Link: $Link
        uid: $uid
        username: $username
      }
    ) {
      id
      appName
      appType
      title
      body
      groupId
      groupName
      appLogo
      githubLink
      images
      videoLink
      username
      createdAt
      likes {
        id
        image
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

const ADD_ROOM = gql`
  mutation addRoom(
    $username: String!
    $roomId: String!
    $roomName: String!
    $roomPic: String!
  ) {
    addRoom(
      username: $username
      roomId: $roomId
      roomName: $roomName
      roomPic: $roomPic
    ) {
      id
      email
      username
    }
  }
`;
