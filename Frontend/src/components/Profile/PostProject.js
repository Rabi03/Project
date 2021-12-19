/* eslint-disable no-useless-computed-key */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import { ModalBody, Button, Row, Col } from "reactstrap";
import s from "./Profile.module.scss";
import { firebaseApp } from "../../pages/ChatApp/firebase";
import db from "../../pages/ChatApp/firebase";
import axios from "axios";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import { gql, useMutation, useQuery } from "@apollo/client";
import { FETCH_POST_QUERY } from "../../Util/GraphQL";
import { AuthContext } from "../../Context/Auth";
import uid from 'uuid/dist/v4'

export default function PostProject({ close }) {
  const [messages, setMessages] = useState([]);
  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");
  const [Error, setError] = useState(false);
  const { user } = useContext(AuthContext);
  const [Groups, setGroups] = useState([]);
  const storageRef=firebaseApp.storage().ref().child('post/images/'+uid()+'.jpg')

  const [projectInfo, setProjectInfo] = useState({
    type: "project",
    appName: "",
    appType: "",
    title: "",
    body: "",
    groupId: "",
    groupName:"",
    maxMember: 0,
    appLogo: "",
    githubLink: "",
    images: [],
    videoLink: "",
    Link: "",
    uid: user.id,
    username: user.username,
  });

  const [groupInfo,setGroupInfo]=useState({})

  const [createPost, { error }] = useMutation(CREATE_POST, {
    variables: projectInfo,
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
      projectInfo.body = "";
    },
    onError(err) {
      console.log(err.message);
    },
  });

  const {
    appName,
    appType,
    title,
    body,
    groupId,
    groupName,
    appLogo,
    githubLink,
    images,
    videoLink,
  } = projectInfo;

  useEffect(() => {
    let rooms = [];
    firebaseApp
      .database()
      .ref("users")
      .child(user.id)
      .child("rooms")
      .on("child_added", (snap) => {
        rooms.push({id:snap.key,...snap.val()});
      });
    setGroups(rooms);
  }, []);


  const handleChange = (e) =>
    setProjectInfo({ ...projectInfo, [e.target.name]: e.target.value });

  
    const selectGroup=e=>{
      setGroupInfo(e.target.value)
      const gp=e.target.value.split(',')
      projectInfo.groupId=gp[0];
      projectInfo.groupName=gp[1]
      setProjectInfo(projectInfo)
    }

  const handleImage = (e) => {
    const file = e.target.files[0];
    storageRef.put(file).then(function(result){
      storageRef.getDownloadURL().then(function(result){
        setProjectInfo({
          ...projectInfo,
          ["images"]: [...images,result],
        });
      })
      .catch(err=>{
        console.log(err)
      }) 
  })
    .catch(err=>{
      console.log(err)
    })
  };
  const handleLogo = (e) => {
    const file = e.target.files[0];

    storageRef.put(file).then(function(result){
      storageRef.getDownloadURL().then(function(result){
        setProjectInfo({ ...projectInfo, ["appLogo"]: result });;
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
    console.log(projectInfo)
    createPost();
    close();
  };

  const DeleteImage = (index) => {
    const newimages = [...images];
    newimages.splice(index, 1);
    setProjectInfo({ ...projectInfo, ["images"]: [...newimages] });
  };
  return (
    <>
      <ModalBody style={{ padding: "5px" }}>
        <form onSubmit={handleSubmit}>
          <div style={{ padding: "10px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <h6 for='Appname' className='form-label'>
                  Project App Name
                </h6>
                <input
                  required
                  autoComplete='off'
                  type='text'
                  className={`${s.form_control} ${s.form_control_sm}`}
                  style={{ width: "250px" }}
                  id='Appname'
                  name='appName'
                  value={appName}
                  placeholder='Your project name...'
                  onChange={handleChange}
                />
              </div>

              <div>
                <h6>Choose Platform</h6>
                <Select
                  required
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  placeholder='Project group name'
                  name='appType'
                  value={appType}
                  onChange={handleChange}
                  className={`${s.textFiled} ${s.textFiled_sm}`}
                  style={{ color: "white", width: "180px" }}
                >
                  <MenuItem
                    style={{
                      color: "white",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    value={"Web"}
                  >
                    <h6 style={{ marginBottom: "0px", marginLeft: "7px" }}>
                      Web
                    </h6>
                  </MenuItem>
                  <MenuItem
                    style={{
                      color: "white",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    value={"Android"}
                  >
                    <h6 style={{ marginBottom: "0px", marginLeft: "7px" }}>
                      Android
                    </h6>
                  </MenuItem>
                  <MenuItem
                    style={{
                      color: "white",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    value={"IOS"}
                  >
                    <h6 style={{ marginBottom: "0px", marginLeft: "7px" }}>
                      IOS
                    </h6>
                  </MenuItem>
                </Select>
              </div>
            </div>

            <label for='title' class='form-label' style={{ marginTop: "10px" }}>
              Title
            </label>
            <input
              type='text'
              required
              autoComplete='off'
              className={`${s.form_control} ${s.form_control_sm}`}
              id='title'
              name='title'
              value={title}
              placeholder='Give a title or a short description of your idea...'
              onChange={handleChange}
            />
          </div>
          <div class='' style={{ padding: "10px" }}>
            <label for='Description' class='form-label'>
              Description
            </label>
            <textarea
              required
              className={`${s.post_textbox}`}
              rows={3}
              name='body'
              value={body}
              placeholder=' Describe your project benefits and how it will work...'
              style={{ width: "100%", background: "#040620" }}
              onChange={handleChange}
            />
          </div>
          <div
            style={{
              display: "flex",
              marginLeft: "10px",
              alignItems: "center",
            }}
          >
            <div>
              <h6>Choose Group</h6>
              <Select
                required
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                placeholder='Project group name'
                
                value={groupInfo}
                onChange={selectGroup}
                className={`${s.textFiled} ${s.textFiled_sm}`}
                style={{ color: "white", width: "180px" }}
              >
                {Groups.length === 0 ? (
                  <MenuItem style={{ color: "white" }} value={""}>
                    No Group...
                  </MenuItem>
                ) : (
                  Groups.map((info) => (
                    <MenuItem
                      style={{
                        color: "white",
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                      }}
                      value={`${info.id},${info.roomName}`}
                    >
                      <img
                        className='rounded-circle'
                        src={info.roomPic}
                        alt='...'
                        width='20'
                        height='20'
                      />
                      <h6 style={{ marginBottom: "0px", marginLeft: "7px" }}>
                        {info.roomName}
                      </h6>
                    </MenuItem>
                  ))
                )}
              </Select>
            </div>
            <div style={{ marginLeft: "50px" }}>
              <h6 style={{ fontSize: "12px" }}>App Logo</h6>
              {appLogo ? (
                <img src={appLogo} alt='' width='50' height='30' />
              ) : (
                <input
                  required
                  type='file'
                  aria-label='With input'
                  style={{ marginTop: "3px" }}
                  onChange={handleLogo}
                />
              )}
            </div>
          </div>
          <div class='mb-3' style={{ padding: "10px" }}>
            <label for='video-link' class='form-label'>
              Create a youtube video of project description and share link .
            </label>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type='text'
                required
                autoComplete='off'
                className={`${s.textFiled} ${s.textFiled_sm}`}
                id='video-link'
                name='videoLink'
                value={videoLink}
                style={{ width: "100%", marginRight: "12px" }}
                onChange={handleChange}
              />
            </div>
          </div>
          <div style={{ padding: "10px" }}>
            <label for='web-link' class='form-label'>
              Add your project github or website link from where people can use
              or download it.
            </label>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type='text'
                required
                autoComplete='off'
                className={`${s.textFiled} ${s.textFiled_sm}`}
                id='web-link'
                name='githubLink'
                value={githubLink}
                style={{ width: "100%", marginRight: "12px" }}
                onChange={handleChange}
              />
            </div>
          </div>
          {images.length !== 0 && (
            <div>
              <h6 style={{ marginLeft: "10px" }}>App Front Images</h6>
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
                  <Col
                    key={index}
                    lg={6}
                    style={{ height: "100%", marginBottom: "10px" }}
                  >
                    {index === 0 && (
                      <p
                        style={{
                          fontSize: "10px",
                          padding: "5px 10px",
                          backgroundColor: "#db2a34",
                          position: "absolute",
                          left: "0px",
                          marginLeft: "20px",
                        }}
                      >
                        Cover Image
                      </p>
                    )}

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
            </div>
          )}
          <div className={`${s.addElement} row`}>
            <h5 style={{ marginLeft: "25px" }}>Add to Your Post</h5>
            <div style={{ marginLeft: "25px" }}>
              <label style={{ marginBottom: "0px" }}>
                <input
                  type='file'
                  multiple={false}
                  id='share_image'
                  style={{ display: "none" }}
                  onChange={handleImage}
                />
                <i
                  class='fas fa-image'
                  style={{
                    marginRight: "15px",
                    fontSize: "20px",
                    color: "#45BD62",
                    cursor: "pointer",
                  }}
                ></i>
              </label>
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
    $groupName:String!
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
        groupName:$groupName
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
