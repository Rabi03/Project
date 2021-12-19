/* eslint-disable react/jsx-no-target-blank */
import React, { useContext, useState ,useEffect} from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";

import moment from "moment";

import img from "../../../../assets/people/a4.jpg";
import s from "../../../dashboard/Dashboard.module.scss";

import PostCollapse from "../../../dashboard/components/Collapse";
import CardImage from "../../../dashboard/components/CardImage";
import PlayVideo from "../../../dashboard/components/PlayVideo";
import CommentBox from "./CommentBox";
import {firebaseApp} from '../../firebase'


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

export default function PostCard({ item, postId, user, roomID }) {
  const [expanded, setExpanded] = useState(false);
  const [emoji, setEmoji] = useState(false);
  const roomRef= firebaseApp.database().ref("rooms")
  const NotificationRef = firebaseApp.database().ref("notifications");
  const [currEmoji, setCurrEmoji] = useState({
    image: "fas fa-thumbs-up",
    color: "#db2a34",
  });
  const [liked, setLiked] = useState(false);
  const likeKey=item.likes?Object.keys(item.likes):[];
  const commentKey=item.comments?Object.keys(item.comments):[];

  useEffect(() => {
    const currLike = likeKey.find(key=>item.likes[key].userId===user.id);
    if (user && currLike) {
      setCurrEmoji({
        image: item.likes[currLike].emoName,
        color: item.likes[currLike].emoColor,
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

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const sendLike = (name,color) => {


    if(likeKey.length>0){
      likeKey.forEach(k=>{
      if(item.likes[k].userId===user.id){
        roomRef.child(roomID).child('posts').child(postId).child('likes').child(k).remove()
      }
    })
  }

    
      roomRef.child(roomID).child('posts').child(postId).child('likes').push({
        emoName:name,
        emoColor:color,
        userId:user.id
      })

      NotificationRef.child(item.uid).push({
        type: "group-react",
        postId,
        user: {
          name: user.fName + " " + user.lName,
          avatar: user.photoUrl,
          uuid: user.id,
        },
        emo: {
          name: name,
          color: color,
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
  }

  return (
    <Card
      style={{
        // width: "35rem",
        backgroundColor: "rgba(26, 28, 59)",
        border: "0px",
        display: "block",

        margin: "10px",
        marginLeft: "20px",
        marginRight: "20px",
      }}

    >
      <CardHeader
        avatar={
          <img
            className='rounded-circle'
            src={item.userPic}
            alt='...'
            width='30'
            height='30'
            style={{ marginTop: "-20px" ,objectFit: "cover" }}
          />
        }
        
        title={
          <h5 style={{ fontSize: "15px", fontWeight: "400" }}>
            <button
              style={{ textDecoration: "none", color: "white" }}
              className='btn-link'
            >
              {item.userName}
            </button>
          </h5>
        }
        subheader={
          <p style={{ color: "white", marginTop: "-5px" }}>
            {moment(item.createdAt).fromNow(true)}
          </p>
        }
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
      <CardContent style={{ backgroundColor: "rgba(26, 28, 59)" }}>
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
      </CardContent>
      {item.images &&
        item.images.length > 0 &&
        item.images.map((img, index) => (
          <img key={index} src={img} alt='' width='100%' height='250px' style={{objectFit: "cover"}} />
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
              className={item.likes!==undefined&& item.likes[likeKey[i]] && item.likes[likeKey[i]].emoName}
              style={{
                color: item.likes!==undefined&&item.likes[likeKey[i]] && item.likes[likeKey[i]].emoColor,
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
            {item.likes!==undefined&&likeKey?.length}
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
          {commentKey.length>0&&`${commentKey.length} Comments`}
        </h6>
      </div>

      <CardActions
        style={{
          padding: "20px",
          marginTop: "-15px",
          marginBottom: "-15px",
          paddingLeft: "5px",
        }}
      >
        <IconButton
          className={s.footer_icon}
          aria-label='add to favorites'
          onClick={() => setEmoji(!emoji)}
        >
          <i
              className={liked ? currEmoji.image : "fas fa-thumbs-up"}
              style={{ color: liked ? currEmoji.color : "#db2a34" }}
            ></i>
        </IconButton>
        <IconButton className={s.footer_icon} aria-label='share'>
          <i class='fas fa-comment-alt' style={{ color: "#3979F6" }}></i>
        </IconButton>
      </CardActions>
      <CommentBox
        comments={item.comments && item.comments}
        postId={postId}
        userId={user.id}
        name={user.fName + " " + user.lName}
        userPhoto={user.photoUrl}
        roomID={roomID}
      />
    </Card>
  );
}
