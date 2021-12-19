/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState, useRef } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { gql, useMutation, useQuery } from "@apollo/client";
import moment from "moment";
import "firebase/firestore";
import {firebaseApp } from "../../../pages/ChatApp/firebase";

import img from "../../../assets/people/a4.jpg";
import s from "../Dashboard.module.scss";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import backImage from "../../../assets/web.png";
import PostCollapse from "./Collapse";
import CardImage from "./CardImage";
import video from "../../../assets/MHA.mp4";
import PlayVideo from "./PlayVideo";
import CommentBox from "./CommentBox";
import Loading from "./Loading";

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -2,
    top: 19,
    padding: "0px 4px",
  },
}))(Badge);

const emo = [
  {
    id: "1",
    name: "fas fa-thumbs-up",
    color: "blue",
  },
  {
    id: "2",
    name: "fas fa-heart",
    color: "red",
  },
  {
    id: "3",
    name: "fas fa-laugh-beam",
    color: "yellow",
  },
  {
    id: "4",
    name: "fas fa-sad-tear",
    color: "yellow",
  },
  {
    id: "5",
    name: "fas fa-angry",
    color: "yellow",
  },
];

export default function PostCard({ item, user, rooms,Class,joinShow=true }) {
  const [expanded, setExpanded] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [emoji, setEmoji] = useState(false);
  const [joinedPerson,setJoinedPerson]=useState([])
  const [OpenComment, setOpenComment] = useState(false);
  const NotificationRef = firebaseApp.database().ref("notifications");
  const GroupRef = firebaseApp.database().ref("groups");
  const SaveRef = firebaseApp.database().ref("save");
  const roomKeys = rooms ? Object.keys(rooms) : [];
  const [currEmoji, setCurrEmoji] = useState({
    image: "fas fa-thumbs-up",
    color: "#db2a34",
  });
  const [liked, setLiked] = useState(false);
  const {
    loading,
    error,
    data: info,
  } = useQuery(GET_USER, {
    onError(err) {
      console.log(err);
    },
    variables: { username: item.username },
  });

  useEffect(() => {
      GroupRef.child(item.groupId).on('value',snap =>setJoinedPerson(snap.val()))
  },[])

  const joinKey=joinedPerson?Object.keys(joinedPerson):[]

  const [deletePost,{load}]=useMutation(DELETE_POST,{
    variables:{postId:item.id},
    refetchQueries:[
      { query:FETCH_POST_QUERY}
    ]
  })

  useEffect(() => {
    const currLike = item.likes.find((like) => user.username === like.username);
    if (user && currLike) {
      setCurrEmoji({
        image: currLike.image,
        color: currLike.color,
      });
      setLiked(true);
    } else {
      setCurrEmoji({
        image: "fas fa-thumbs-up",
        color: "#db2a34",
      });
      setLiked(false);
    }
  }, [user, item.likes]);

  const [LikePost] = useMutation(LIKE_POST);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const sendLike = (emojiName, emojiColor) => {
    LikePost({
      variables: {
        postId: item.id,
        image: emojiName,
        color: emojiColor,
        username: user.username,
      },
    });

    NotificationRef.child(item.uid).push({
      type: "react",
      postId: item.id,
      user: {
        name: user.fName + " " + user.lName,
        avatar: user.photoUrl,
        uuid: user.id,
      },
      emo: {
        name: emojiName,
        color: emojiColor,
      },
      createdAt: Date.now(),
    });

    NotificationRef.child(item.uid)
      .child("unSeen")
      .get()
      .then((val) => {
        NotificationRef.child(item.uid)
          .child("unSeen")
          .set(val.val() ? val.val() + 1 : 1);
      });

    setEmoji(false);
  };


  const sendRequestToJoin = () => {
    const childRef = NotificationRef.child(item.uid).push({
      type: "join",
      accept: 0,
      user: {
        name: user.fName + " " + user.lName,
        avatar: user.photoUrl,
        uuid: user.id,
        username: user.username,
        profession: user.profession.join(),
      },
      room: {
        roomId: item.groupId,
        roomName: item.groupName,
        roomPic: info.getUserByUsername.pic,
      },
      emo: {
        name: "fas fa-user-plus",
        color: "#0096FF",
      },
      createdAt: Date.now(),
    });

    childRef.then((n) => {
      NotificationRef.child(item.uid).child(n.key).update({
        nid: n.key,
      });

      NotificationRef.child(item.uid)
        .child("unSeen")
        .get()
        .then((val) => {
          NotificationRef.child(item.uid)
            .child("unSeen")
            .set(val.val() ? val.val() + 1 : 1);
        });
    });
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    deletePost()
  };

  const savePost = () => {
    SaveRef.child(user.id).child(item.id).set(item);
    handleClose()
  };

  if (loading) return <Loading />;
  else
    return (
      <Card
      className={`${Class}`}
        style={{
          // width: "40rem",
          backgroundColor: "rgba(26, 28, 59)",
          border: "0px",
          boxShadow: "4px 4px 4px 4px rgba(2,2,2,0.2)",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: "20px",
        }}
      >

<CardHeader
          avatar={
            <img
              className='rounded-circle'
              src={info.getUserByUsername.pic}
              alt='...'
              width='40'
              height='40'
              style={{ marginTop: '-20px' }}
            />
          }
          action={
            <IconButton aria-label='settings' onClick={handleClick}>
              <i
                style={{ fontSize: '15px', color: 'white' }}
                class='fas fa-ellipsis-v'
              ></i>
            </IconButton>
          }
          title={
            <h5 className={`${s.profile_title}`}>
                <button
                  style={{ textDecoration: "none", color: "white" }}
                  className="btn-link"
                >
                  {info && info.getUserByUsername.fName}{" "}
                  {info && info.getUserByUsername.lName}
                </button>
                <small style={{ marginLeft: "5px" }} className="btn-link">
                  @{item.username}
                </small>
              </h5>
          }
          subheader={
            <p style={{ color: "white", marginTop: "-5px" }}>
                {moment(item.createdAt).fromNow(true)}
              </p>
          }
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
        <CardContent style={{ backgroundColor: "rgba(26, 28, 59)" }}>
          <Typography
            style={{ color: "white", fontSize: "18", marginBottom: "10px" }}
          >
            {item.title}
          </Typography>
          {!expanded && (
            <Typography style={{ color: "white" }}>
              {item.body.length > 100 ? item.body.substr(0, 100) : item.body}
              {!expanded && item.body.length > 100 && (
                <span>
                  ....
                  <span
                    className={["btn-link", expanded && "expandOpen"].join(" ")}
                    style={{ textDecoration: "none" }}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                  >
                    See more
                  </span>
                </span>
              )}
            </Typography>
          )}

          <PostCollapse expanded={expanded} body={item.body} />

          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem style={{color: "white"}} onClick={savePost}>Save Post</MenuItem>
             { item.uid === user.id&& <MenuItem style={{color: "white"}} onClick={handleClose}>Delete Post</MenuItem>}
          </Menu>
        </CardContent>

        <label htmlFor=""></label>

        {item.images.length > 0 &&
          item.images.map((img, index) => (
            <CardImage key={index} image={img} />
          ))}
        {item.videoLink && <PlayVideo src={item.videoLink} />}
        {emoji && (
          <div
            style={{
              display: "flex",
              padding: "10px",
              position: "absolute",
              backgroundColor: "rgb(26, 28, 59)",
              border: "1px solid rgba(255,255,255,0.4)",
              borderRadius: "20px",
              marginTop: "-10px",
              zIndex: 30,
            }}
          >
            {emo.map((emoji, index) => (
              <i
                key={index}
                className={emoji.name}
                style={{
                  color: emoji.color,
                  fontSize: "25px",
                  marginRight: "10px",
                  cursor: "pointer",
                }}
                onClick={() => sendLike(emoji.name, emoji.color)}
              />
            ))}
          </div>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <div
            style={{
              display: "flex",
              marginLeft: "10px",
              marginTop: "10px",
            }}
          >
            {[0, 1, 2].map((i) => (
              <i
                key={i}
                className={item.likes[i] && item.likes[i].image}
                style={{
                  color: item.likes[i] && item.likes[i].color,
                  fontSize: "17px",
                  marginRight: "-4px",
                  padding: "1.5px",
                  backgroundColor: "rgb(26, 28, 59)",
                  borderRadius: "25px",
                  zIndex: 10 - i,
                }}
              />
            ))}
            <h6
              style={{
                marginLeft: "10px",
                color: "rgba(255,255,255,0.6)",
                textAlign: "center",
              }}
            >
              {item.likes.length > 0 && item.likes.length}
            </h6>
          </div>
          <h6
            style={{
              color: "rgba(255,255,255,0.6)",
              marginTop: "10px",
              marginRight: "10px",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            {item.comments.length > 0 && item.comments.length}{" "}
            {item.comments.length > 0 &&
              (item.comments.length === 1 ? "Comment" : "Comments")}
          </h6>
        </div>

        <CardActions style={{ padding: "0px" }}>
          <IconButton
            className={s.footer_icon}
            aria-label="add to favorites"
            onClick={() => setEmoji(!emoji)}
          >
            <i
              className={liked ? currEmoji.image : "fas fa-thumbs-up"}
              style={{ color: liked ? currEmoji.color : "#db2a34" }}
            ></i>
          </IconButton>
          <IconButton
            className={s.footer_icon}
            aria-label="share"
            onClick={() => setOpenComment(true)}
          >
            <i class="fas fa-comment-alt" style={{ color: "#3979F6" }}></i>
          </IconButton>
          {(joinShow&&roomKeys.includes(item.groupId) === false) && (
            <button
              className="btn btn-success"
              style={{ marginLeft: 12 }}
              onClick={sendRequestToJoin}
            >
              Join With Me
            </button>
          )}
          <StyledBadge
            badgeContent={joinKey.length>=2?joinKey.length:0}
            max={3}
            color="secondary"
            className="ml-auto"
            style={{ marginRight: "15px" }}
          >
            <div style={{ display: "flex" }}>
            {joinKey.map(person=>
              <button className="btn-link">
                <img key={person} src={joinedPerson[person].avatar} alt="" className="rounded-circle" width="30" height="30" />
              </button>
            )}
            </div>
          </StyledBadge>
        </CardActions>
        {OpenComment && (
          <CommentBox
            comments={item.comments}
            postId={item.id}
            username={user.username}
            name={user.fName + " " + user.lName}
            uid={user.id}
            userPhoto={user.photoUrl}
            postman={item.uid}
          />
        )}
      </Card>
    );
}

const GET_USER = gql`
  query getUserByUsername($username: String!) {
    getUserByUsername(username: $username) {
      fName
      lName
      pic
    }
  }
`;

const LIKE_POST = gql`
  mutation likePost(
    $postId: ID!
    $image: String!
    $color: String!
    $username: String!
  ) {
    likePost(
      postId: $postId
      image: $image
      color: $color
      username: $username
    ) {
      id
      likes {
        id
        image
        color
        username
      }
      likeCount
    }
  }
`;

const DELETE_POST = gql`

mutation deletePost($postId: ID!){
  deletePost(postId: $postId)
}

`

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

