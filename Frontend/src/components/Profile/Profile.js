import React, { useContext, useState}from 'react';
import { useParams } from 'react-router-dom';
import { gql, useMutation, useQuery } from "@apollo/client";
import Activities from './Activities';
import PostBox from './PostBox';
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";

import s from './Profile.module.scss';
import ProfileCard from './ProfileCard';
import gif from "../../assets/loading.gif";
import MetaData from '../../components/Helmet/MetaData'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});



export default function Profile() {

  const [OpenPost, setOpenPost] = useState(false)
  const {id}=useParams([])

  const {
    loading,
    error,
    data: user,
  } = useQuery(GET_USER, {
    onError(err) {
      console.log(err);
    },
    variables: { userId: id },
  });

  const { load, err, data: Posts } = useQuery(FETCH_POST_QUERY,{variables:{userId: id}});

  console.log(Posts)
  
  const tooglePostBox = () => {
    setOpenPost(!OpenPost)
  }
  
  
  if (loading||load||!Posts)
  return (
    <Dialog
      open={loading}
      TransitionComponent={Transition}
      keepMounted
      onClose={!loading}
      aria-labelledby='alert-dialog-slide-title'
      aria-describedby='alert-dialog-slide-description'
    >
      <MetaData title="Loading......." />
      <div style={{ backgroundColor: "#1B1E3F" }}>
        <img src={gif} alt='' width='100' />
      </div>
    </Dialog>
  );
  else return (
    <div className={`${s.root}`}>
    <MetaData title={`${user.getUser.fName+" "+user.getUser.lName}`} />
      <h1 className='page-title'>
        User-
        <bold>
          Profile
        </bold>
      </h1>
      <div className="row">
        <div className="col-12 col-lg-6">
        <ProfileCard User={user&&user.getUser} />
        </div>
        <div className="col-12 col-lg-6">
          <Activities tooglePostBox={tooglePostBox} posts={Posts.getUserActivities} User={user&&user.getUser} />
        </div>
      </div>
        <PostBox OpenPost={OpenPost} tooglePostBox={tooglePostBox} />
    </div>
  );
}

const GET_USER = gql`
  query getUser($userId: ID!) {
    getUser(userId: $userId) {
      id
      username
      email
      fName
      lName
      pic
      github
    profession
    ideas
    projects
    followers
    following
    title
    createdAt
    }

  }
`;

const FETCH_POST_QUERY = gql`
  query getUserActivities($userId: ID!){
    getUserActivities(userId: $userId) {
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

