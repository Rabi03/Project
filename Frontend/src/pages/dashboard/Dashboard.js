import React, { useContext, useEffect, useState } from "react";
import { Row, Col } from "reactstrap";

import { gql, useQuery } from "@apollo/client";

import Card from "./components/Card";

import img from "../../assets/people/a5.jpg";
import Collapse from "@material-ui/core/Collapse";

import s from "./Dashboard.module.scss";
import PostBox from "../../components/Profile/PostBox";
import ProjectCard from "./components/ProjectCard";
import Loading from "./components/Loading";
import { AuthContext } from "../../Context/Auth";
import MetaData from '../../components/Helmet/MetaData'
import {firebaseApp} from '../ChatApp/firebase'

export default function Dashboard() {
  const { loading, error, data: Posts } = useQuery(FETCH_POST_QUERY);
  const [OpenPost, setOpenPost] = useState(false);
  const { user } = useContext(AuthContext);
  const userRef= firebaseApp.database().ref("users");
  const [userInfo,setUserInfo]=useState({});

  useEffect(() => {
    userRef.child(user.id).on('value',(snap) => setUserInfo(snap.val()))
  },[user]);




  const tooglePostBox = () => {
    setOpenPost(!OpenPost);
  };
  console.log(userInfo)
  if(userInfo===undefined) return <div>loading...</div>

  else return (
    <div className={s.root}>
      <MetaData title={'Home'} />
      {OpenPost && (
        <PostBox OpenPost={OpenPost} tooglePostBox={tooglePostBox} />
      )}
      {/* <TopBox /> */}
      {/* <TopProducts /> */}
      <div
        className='card'
        style={{
          width: "40rem",
          backgroundColor: "rgba(26, 28, 59,0.4)",
          border: "0px",
          boxShadow: "4px 4px rgba(2,2,2,0.2)",
          marginTop: "10px",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: "20px",
        }}
      >
        <div
          className='card-body'
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            padding: "10px",
          }}
        >
          <img
            className='rounded-circle'
            src={user.photoUrl}
            alt='...'
            width='35'
            height='35'
            style={{objectFit: "cover" }}
          />
          <div style={{ overflow: "auto", width: "100%", marginLeft: "10px" }}>
            <button
              className={`${s.form_control} ${s.form_control_sm}`}
              onClick={() => tooglePostBox()}
            >
              What's on your mind? Share your idea.......
            </button>
          </div>
        </div>
      </div>
      {loading ? (
        <Loading />
        
      ) : (
        Posts && (
          <Row>
            {Posts&&Posts.getPosts.map((item, index) => (
              <Col key={index} sm={12} md={12} lg={12} xl={12} xs={12}>
                {item.type.match("project") && (
                  <Collapse in={true}>
                    <ProjectCard key={item.id} item={item} user={user} />
                  </Collapse>
                )}
                {item.type.match("idea") && (
                  <Collapse in={true}>
                    <Card key={item.id} item={item} Class={"card-width"} user={user} rooms={userInfo&&userInfo.rooms} />
                  </Collapse>
                )}
              </Col>
            ))}
          </Row>
        )
      )}
    </div>
  );
}

const GET_USER = gql`
  query getUserByUsername($username: String!) {
    getUserByUsername(username: $username) {
      rooms
    }
  }
`;

const FETCH_POST_QUERY = gql`
  {
    getPosts {
      id
      type
      appName
      appType
      title
      body
      groupId
      groupName
      appLogo
      maxMember
      githubLink
      images
      videoLink
      Link
      username
      uid
      createdAt
      comments {
        id
        username
        name
        body
        avatar
        createdAt
        replies {
          id
          username
          name
          body
          avatar
          createdAt
        }
      }
      likes {
        id
        username
        image
        color
        createdAt
      }
      rates {
        id
        username
        value
        createdAt
      }
      commentCount
      likeCount
      rateCount
    }
  }
`;
