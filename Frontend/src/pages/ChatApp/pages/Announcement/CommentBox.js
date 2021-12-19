import React, { useState } from "react";
import { useParams } from "react-router-dom";

import send from "../../../../assets/send.png";
import s from "../../../dashboard/Dashboard.module.scss";
import { firebaseApp } from "../../firebase";
import firebase from "firebase/app";
import moment from "moment";
import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";

export default function CommentBox({
  comments,
  postId,
  userId,
  name,
  userPhoto,
}) {
  const { roomId } = useParams([]);
  const postRef = firebaseApp
    .database()
    .ref("rooms")
    .child(roomId)
    .child("posts")
    .child(postId);
  const [emoji, setEmoji] = useState(false);
  const [Comment, setComment] = useState("");
  const [NewComments, setNewComments] = useState(comments ? comments : {});
  const [showMoreComment, setShowMoreComment] = useState(false);
  console.log(NewComments);

  const CreateComments = () => {
    postRef
      .child("comments")
      .push({
        postId: postId,
        body: Comment,
        name: name,
        avatar: userPhoto,
        uid: userId,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
      })
      .then((snapdata) => {
        postRef
          .child("comments")
          .on("value", (snap) => setNewComments(snap.val()));
      });
  };

  let commentKeys = NewComments ? Object.keys(NewComments) : [];

  const onEmojiClick = (event, emojiObject) => {
    setComment((comment) => comment + emojiObject.emoji);
  };
  const handleUpload = (event) => {};
  const handleSubmit = (e) => {
    e.preventDefault();
    if(Comment==="") return
    CreateComments();

    setComment("");
  };

  return (
    <footer className={s.profile_footer}>
      <ul className={`${s.post_comment} mt-sm`}>
        <li>
          {commentKeys &&
            commentKeys.length > 0 &&
            (showMoreComment ? (
              commentKeys.map((comment) => (
                <div
                  key={comment}
                  style={{
                    border: "1px solid #040620 !important",
                    display: "flex",
                    marginBottom: "10px",
                  }}
                >
                  <span
                    className='pull-left mr-sm'
                    style={{ marginTop: "1px" }}
                  >
                    <img
                      src={NewComments[comment].avatar}
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
                        {NewComments[comment].name}
                      </h6>

                      <p style={{ color: "white", marginBottom: "0px" }}>
                        {NewComments[comment].body}
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
                          fontSize: "10px",
                          color: "rgba(255,255,255,0.5)",
                          fontWeight: "bold",
                          marginLeft: "2px",
                        }}
                      >
                        {moment(NewComments[comment].createdAt).fromNow(false)}
                      </p>
                    </div>

                  </div>
                </div>
              ))
            ) : (
              <>
                {commentKeys && commentKeys.length > 1 && (
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
                  key={commentKeys.reverse()[0]}
                  style={{
                    border: "1px solid #040620 !important",
                    display: "flex",
                  }}
                >
                  <span
                    className='pull-left mr-sm'
                    style={{ marginTop: "1px" }}
                  >
                    <img
                      src={NewComments[commentKeys.reverse()[0]].avatar}
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
                        {NewComments[commentKeys.reverse()[0]].name}
                      </h6>

                      <p style={{ color: "white", marginBottom: "0px" }}>
                        {NewComments[commentKeys.reverse()[0]].body}
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
                          fontSize: "10px",
                          color: "rgba(255,255,255,0.5)",
                          fontWeight: "bold",
                          marginLeft: "2px",
                        }}
                      >
                        {moment(
                          NewComments[commentKeys.reverse()[0]].createdAt
                        ).fromNow(false)}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ))}
        </li>
        <li
          style={{
            border: "1px solid #040620 !important",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
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
          <form
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
            onSubmit={handleSubmit}
          >
            <input
              required
              type='text'
              name='comment'
              value={Comment}
              onChange={(e) => setComment(e.target.value)}
              className={`${s.form_control} ${s.form_control_sm}`}
              style={{ color: "white" }}
              placeholder='Write your comment...'
            />
            {emoji && (
              <Picker
                onEmojiClick={onEmojiClick}
                
                pickerStyle={{
                  position: "absolute",
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
              onClick={handleSubmit}
            />
          </form>
        </li>
      </ul>
    </footer>
  );
}
