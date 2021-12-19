import React, { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import Replies from "../dashboard/components/Replies";

import img from "../../assets/people/a5.jpg";
import img1 from "../../assets/people/a4.jpg";
import img2 from "../../assets/people/a1.jpg";
import send from "../../assets/send.png";
import pic from "../../assets/people/a4.jpg";
import { gql, useMutation } from "@apollo/client";
import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";
import moment from "moment";

import s from "./ProjectStore.module.scss";
import CommentBox from "../dashboard/components/CommentBox";
import { firebaseApp } from "../ChatApp/firebase";

const name = ["Zhalok Rahman", "Tanjimur Rahman", "Stas Kulesh"];
const image = [img, img1, img2];

export default function Reviews({ Post, username, name, userPhoto,uid }) {
  const [reply, setReply] = useState(false);
  

  const [emoji, setEmoji] = useState(false);
  const [Comment, setComment] = useState("");
  const [NewComments, setNewComments] = useState(Post.comments);
  const [showMoreComment, setShowMoreComment] = useState(false);
  const [avarageRate,setAvarateRate]=useState(0)
  const NotificationRef= firebaseApp.database().ref("notifications");

  const [CreateComment] = useMutation(CREATE_COMMENT, {
    variables: {
      postId: Post.id,
      body: Comment,
      name: name,
      avatar: userPhoto,
      username: username,
    },
    update(proxy, result) {
      setNewComments(result.data.createComment.comments);
    },
  });

  useEffect(() => {
    let max=0;
    Post.rates.forEach(rate => {
      if(Number(rate.value)>max){
        max=Number(rate.value);
      }
    });
    setAvarateRate(max)
  },[Post.rates])

  const onEmojiClick = (event, emojiObject) => {
    setComment((comment) => comment + emojiObject.emoji);
  };

  const sendNotification=()=>{
    NotificationRef.child(Post.uid).push({
      type: "comment",
      postId:Post.id,
      user:{
        name:name,
        avatar:userPhoto,
        uuid:uid
      },
      emo:{
        name:'fas fa-comment-alt',
        color: '#00A400'
      },
      createdAt:Date.now()
    })
    NotificationRef.child(Post.uid).child('unSeen').get().then(val=>{
      NotificationRef.child(Post.uid).child('unSeen').set(val.val()?val.val()+1:1)
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    CreateComment();
    sendNotification()
    setComment("");
  };
  return (
    <div
      style={{
        backgroundColor: "#1b1e3c",
        padding: "30px",
        borderRadius: "5px",
      }}
    >
      <h5>Reviews</h5>
      <div>
        <h1 style={{ textAlign: "center" }}>{avarageRate}</h1>
        <p style={{ textAlign: "center" }}>
          <StarRatings
            starRatedColor='yellow'
            rating={avarageRate}
            starDimension='20px'
            starSpacing='3px'
            starEmptyColor='rgba(255, 255, 255,0.5)'
          />
          <p style={{ marginTop: "5px" }}>
            <i class='fas fa-user'></i> {Post.rates.length} total
          </p>
        </p>
      </div>
      {/* Discuss */}
      <h5 style={{ marginBottom: "20px" }}>Discussion</h5>
      {NewComments.length > 0 &&
        (showMoreComment ? (
          NewComments.map((comment) => (
            <div
              key={comment.id}
              style={{
                border: "1px solid #040620 !important",
                display: "flex",
                marginBottom: "10px",
              }}
            >
              <span className='pull-left mr-sm' style={{ marginTop: "1px" }}>
                <img
                  src={comment.avatar}
                  alt=''
                  className='rounded-circle'
                  width='35'
                  height='35'
                  style={{ objectFit: "cover" }}
                />
              </span>
              <div
                style={{
                  overflow: "auto",
                  marginLeft: "5px",
                }}
              >
                <div
                  style={{
                    backgroundColor: "rgb(10, 10, 50)",
                    padding: "10px",
                    borderRadius: "15px",
                    maxWidth: "20vw",
                  }}
                >
                  <h6
                    style={{
                      marginBottom: "2px",
                      color: "#7ca9dd",
                      fontSize: ".850rem",
                      fontWeight: "600",
                      cursor: "pointer",
                    }}
                  >
                    {comment.name}
                  </h6>

                  <p style={{ color: "white", marginBottom: "0px" }}>
                    {comment.body}
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    marginLeft: "10px",
                  }}
                >
                  <p
                    style={{
                      color: "#db2a34",
                      fontSize: "10px",
                      fontWeight: "bold",
                      marginRight: "2px",
                    }}
                  >
                    Like
                  </p>
                  <span
                    style={{
                      color: "white",
                      textAlign: "center",
                      marginTop: "-4px",
                    }}
                  >
                    .
                  </span>
                  <p
                    className={s.comment_reply}
                    style={{
                      fontSize: "10px",
                      color: "rgba(255,255,255,0.5)",
                      fontWeight: "bold",
                      marginLeft: "2px",
                      cursor: "pointer",
                      marginRight: "2px",
                    }}
                    onClick={() => {
                      setReply(comment.id);
                    }}
                  >
                    Reply
                  </p>
                  <span
                    style={{
                      color: "white",
                      textAlign: "center",
                      marginTop: "-4.2px",
                    }}
                  >
                    .
                  </span>
                  <p
                    style={{
                      fontSize: "10px",
                      color: "rgba(255,255,255,0.5)",
                      fontWeight: "bold",
                      marginLeft: "2px",
                    }}
                  >
                    {moment(comment.createdAt).fromNow(false)}
                  </p>
                </div>
                {reply !== comment.id && comment.replies.length > 0 && (
                  <div
                    style={{
                      marginTop: "-8px",
                      marginLeft: "10px",
                      display: "flex",
                    }}
                  >
                    <img
                      src='https://img.icons8.com/color/48/000000/down-right.png'
                      alt=''
                      width='15'
                      height='15'
                    />
                    <p
                      className={s.comment_reply}
                      style={{
                        fontSize: "12px",
                        color: "rgba(255,255,255,0.5)",
                        fontWeight: "bold",
                        marginLeft: "5px",
                        cursor: "pointer",
                      }}
                      onClick={() => setReply(comment.id)}
                    >
                      {comment.replies.length}
                      {comment.replies.length === 1 ? " Reply" : " Replies"}
                    </p>
                  </div>
                )}

                {reply === comment.id && (
                  <Replies
                    postId={Post.id}
                    commentId={comment.id}
                    replies={comment.replies}
                    username={comment.username}
                    name={comment.name}
                    avatar={userPhoto}
                  />
                )}
              </div>
            </div>
          ))
        ) : (
          <>
            {NewComments.length > 1 && (
              <p
                className={s.comment_reply}
                style={{
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.5)",
                  fontWeight: "bold",
                  marginLeft: "5px",
                  cursor: "pointer",
                }}
                onClick={() => setShowMoreComment(true)}
              >
                View more comments....
              </p>
            )}

            <div
              key={NewComments[NewComments.length - 1].id}
              style={{
                border: "1px solid #040620 !important",
                display: "flex",
              }}
            >
              <span className='pull-left mr-sm' style={{ marginTop: "1px" }}>
                <img
                  src={NewComments[NewComments.length - 1].avatar}
                  alt=''
                  className='rounded-circle'
                  width='30'
                  height='30'
                  style={{ objectFit: "cover" }}
                />
              </span>
              <div
                style={{
                  overflow: "auto",
                  marginLeft: "5px",
                }}
              >
                <div
                  style={{
                    backgroundColor: "rgb(26, 28, 70)",
                    padding: "10px",
                    borderRadius: "15px",
                    maxWidth: "20vw",
                  }}
                >
                  <h6
                    style={{
                      marginBottom: "2px",
                      color: "#7ca9dd",
                      fontSize: ".850rem",
                      fontWeight: "600",
                      cursor: "pointer",
                    }}
                  >
                    {NewComments[NewComments.length - 1].name}
                  </h6>

                  <p style={{ color: "white", marginBottom: "0px" }}>
                    {NewComments[NewComments.length - 1].body}
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    marginLeft: "10px",
                  }}
                >
                  <p
                    style={{
                      color: "#db2a34",
                      fontSize: "10px",
                      fontWeight: "bold",
                      marginRight: "2px",
                    }}
                  >
                    Like
                  </p>
                  <p
                    style={{
                      color: "white",
                      textAlign: "center",
                      marginTop: "-5px",
                    }}
                  >
                    .
                  </p>
                  <p
                    className={s.comment_reply}
                    style={{
                      fontSize: "10px",
                      color: "rgba(255,255,255,0.5)",
                      fontWeight: "bold",
                      marginLeft: "2px",
                      cursor: "pointer",
                      marginRight: "2px",
                    }}
                    onClick={() => {
                      setReply(NewComments[NewComments.length - 1].id);
                    }}
                  >
                    Reply
                  </p>
                  <span
                    style={{
                      color: "white",
                      textAlign: "center",
                      marginTop: "-4px",
                    }}
                  >
                    .
                  </span>
                  <p
                    style={{
                      fontSize: "10px",
                      color: "rgba(255,255,255,0.5)",
                      fontWeight: "bold",
                      marginLeft: "2px",
                    }}
                  >
                    {moment(
                      NewComments[NewComments.length - 1].createdAt
                    ).fromNow(false)}
                  </p>
                </div>
                {reply !== NewComments[NewComments.length - 1].id &&
                  NewComments[NewComments.length - 1].replies.length > 0 && (
                    <div
                      style={{
                        marginTop: "-8px",
                        marginLeft: "10px",
                        display: "flex",
                      }}
                    >
                      <img
                        src='https://img.icons8.com/color/48/000000/down-right.png'
                        alt=''
                        width='15'
                        height='15'
                      />
                      <p
                        className={s.comment_reply}
                        style={{
                          fontSize: "12px",
                          color: "rgba(255,255,255,0.5)",
                          fontWeight: "bold",
                          marginLeft: "5px",
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          setReply(NewComments[NewComments.length - 1].id)
                        }
                      >
                        {NewComments[NewComments.length - 1].replies.length}

                        {NewComments[NewComments.length - 1].replies.length ===
                        1
                          ? " Reply"
                          : " Replies"}
                      </p>
                    </div>
                  )}

                {reply === NewComments[NewComments.length - 1].id && (
                  <Replies
                    postId={Post.id}
                    commentId={NewComments[NewComments.length - 1].id}
                    replies={NewComments[NewComments.length - 1].replies}
                    username={NewComments[NewComments.length - 1].username}
                    name={NewComments[NewComments.length - 1].name}
                    avatar={userPhoto}
                  />
                )}
              </div>
            </div>
          </>
        ))}

      {/* Comment Box */}

      <form
        style={{
          border: "1px solid #040620!important;",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          marginTop: "10px",
        }}
        onSubmit={handleSubmit}
      >
        <span className='mr-sm' style={{ marginTop: "1px" }}>
          <img
            src={userPhoto}
            alt=''
            className='rounded-circle'
            width='35'
            height='35'
            style={{ marginRight: "10px" }}
          />
        </span>

        <div
          style={{
            overflow: "auto",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#040620",
            padding: "3px",
            borderRadius: "30px",
          }}
        >
          <input
            type='text'
            name='comment'
            value={Comment}
            onChange={(e) => setComment(e.target.value)}
            className={`${s.form_control} ${s.form_control_sm}`}
            placeholder='Write your comment...'
          />
          {emoji && (
            <Picker
              onEmojiClick={onEmojiClick}
              disableSearchBar={true}
              skinTone={SKIN_TONE_MEDIUM_DARK}
              pickerStyle={{
                position: "absolute",
                backgroundColor: "rgb(26, 28, 59)",
                color: "rgb(26, 28, 59)",
                marginBottom: "380px",
              }}
            />
          )}
          <i
            class='fas fa-laugh-beam'
            style={{
              fontSize: "20px",
              marginRight: "10px",
              color: "#FFEB3B",
              cursor: "pointer",
            }}
            onClick={() => setEmoji(!emoji)}
          ></i>
          <img
            src={send}
            alt=''
            width='18'
            height='18'
            style={{ marginRight: "5px", cursor: "pointer" }}
          />
        </div>
      </form>
    </div>
  );
}

const CREATE_COMMENT = gql`
  mutation createComment(
    $postId: ID!
    $body: String!
    $name: String!
    $avatar: String!
    $username: String!
  ) {
    createComment(
      postId: $postId
      body: $body
      name: $name
      avatar: $avatar
      username: $username
    ) {
      id
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
          avatar
          body
          createdAt
        }
      }
    }
  }
`;
