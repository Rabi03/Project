import React, { useState } from "react";
import ReplyComment from "./ReplyComment";
import img from "../../../assets/people/a1.jpg";

import moment from "moment";

import s from "../Dashboard.module.scss";

export default function Replies({
  postId,
  commentId,
  replies,
  username,
  name,
  avatar,
}) {
  const [Replies, setReplies] = useState(replies);

  return (
    <div>
      {Replies &&
        Replies.length > 0 &&
        Replies.map((Reply) => (
          <div
            style={{
              display: "flex",
            }}
            key={Reply.id}
          >
            <span className='pull-left mr-sm' style={{ marginTop: "1px" }}>
              <img
                src={Reply.avatar}
                alt=''
                className='rounded-circle'
                width='25'
                height='25'
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
                  {Reply.name}
                </h6>

                <p style={{ color: "white", marginBottom: "0px" }}>
                  {Reply.body}
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
                  className={s.comment_reply}
                  style={{
                    fontSize: "10px",
                    color: "rgba(255,255,255,0.5)",
                    fontWeight: "bold",
                    marginLeft: "2px",
                  }}
                >
                  {moment(Reply.createdAt).fromNow(false)}
                </p>
              </div>
            </div>
          </div>
        ))}

      <ReplyComment
        postId={postId}
        commentId={commentId}
        username={username}
        name={name}
        avatar={avatar}
        handleReplies={(newReplies) => setReplies(newReplies)}
      />
    </div>
  );
}
