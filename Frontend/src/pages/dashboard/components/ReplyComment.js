import React, { useState } from "react";
import pic from "../../../assets/people/a4.jpg";
import send from "../../../assets/send.png";

import { gql, useMutation } from "@apollo/client";

import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";

import s from "../Dashboard.module.scss";

export default function ReplyComment({
  postId,
  commentId,
  username,
  name,
  avatar,
  handleReplies,
}) {
  const [emoji, setEmoji] = useState(false);

  const [Reply, setReply] = useState("");

  const [CreateReply] = useMutation(CREATE_REPLY, {
    variables: {
      postId: postId,
      commentId: commentId,
      body: Reply,
      name: name,
      avatar: avatar,
      username: username,
    },
    update(proxy, result) {
      let commentIndex = result.data.createReply.comments.findIndex(
        (c) => c.id === commentId
      );
      handleReplies(result.data.createReply.comments[commentIndex].replies);
    },
  });

  const onEmojiClick = (event, emojiObject) => {
    setReply((Reply) => Reply + emojiObject.emoji);
  };
  const handleUpload = (event) => {};

  const handleSubmit = (e) => {
    e.preventDefault();
    CreateReply();
    setReply("");
  };
  return (
    <form
      style={{
        border: "1px solid #040620!important;",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        marginLeft: "10px",
      }}
      onSubmit={handleSubmit}
    >
      <span className='mr-sm' style={{ marginTop: "1px" }}>
        <img
          src={avatar}
          alt=''
          className='rounded-circle'
          width='25'
          height='25'
          style={{ marginRight: "5px" }}
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
          required
          type='text'
          className={`${s.form_control} ${s.form_control_sm}`}
          placeholder={"Write your comment..."}
          style={{ height: "calc(1.5em + 0.5rem)", color: "white" }}
          onChange={(e) => setReply(e.target.value)}
          value={Reply}
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
            fontSize: "15px",
            marginRight: "10px",
            color: "#FFEB3B",
            cursor: "pointer",
          }}
          onClick={() => setEmoji(!emoji)}
        ></i>

        <img
          src={send}
          alt=''
          width='15'
          height='15'
          style={{ marginRight: "5px" }}
        />
      </div>
    </form>
  );
}

const CREATE_REPLY = gql`
  mutation createReply(
    $postId: ID!
    $commentId: ID!
    $body: String!
    $name: String!
    $avatar: String!
    $username: String!
  ) {
    createReply(
      postId: $postId
      commentId: $commentId
      body: $body
      name: $name
      avatar: $avatar
      username: $username
    ) {
      id
      comments {
        id

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
