/* eslint-disable react/jsx-no-target-blank */
import Avatar from "@material-ui/core/Avatar";
import React from "react";

export default function RoomMessage({ message, showDate, user }) {
  return (
    <div
      style={{
        display: "flex",
        animationDelay: `0.8s`,
        marginBottom: message.uid === user.id && "-15px",
      }}
    >
      {message.uid !== user.id && (
        <Avatar
          src={message.avatar}
          alt='Profile Avatar'
          style={{
            width: "30px",
            height: "30px",
            // marginTop: "20px",
            marginRight: "5px",
          }}
        />
      )}
      {message.message && (
        <p
          key={`${message.name}-${message.timestamp}`}
          className={`chat__message ${
            message.uid === user.id && "chat__users"
          }`}
          style={{
            cursor: message.message.includes("https") && "pointer",
            textDecoration: message.message.includes("https") && "underline",
          }}
          onClick={() =>
            message.message.includes("https") &&
            window.open(message.message, "blank")
          }
        >
          {message.uid !== user.id && (
            <span
              className={`chat__name chat__property ${
                message.uid === user.id && "chat__senderProperty"
              }`}
            >
              {message.name}
            </span>
          )}
          {message.message && message.message}
          {/* <span
            className={`chat__timestamp chat__property ${
              message.uid === user.id && "chat__senderProperty"
            }`}
            style={{ marginLeft: "-20px" }}
          >
            <span>{showDate(message.timestamp)}</span>.
            <img
              src='https://img.icons8.com/fluent/48/000000/double-tick.png'
              alt=''
              width='14'
              style={{ marginLeft: "3px", marginBottom: "-3px" }}
            />
          </span> */}
        </p>
      )}
      {(message.image || message.file) && (
        <p
          key={`${message.name}-${message.timestamp}`}
          className={`chat_image ${
            message.uid === user.id && "chat_user_image"
          }`}
          style={{
            backgroundColor: message.file
              ? message.uid === user.id
                ? "rgb(0, 132, 255)"
                : "rgba(255, 255, 255, 0.15)"
              : "transparent",
          }}
        >
          {message.uid !== user.id && (
            <span
              className={`chat__name chat__property ${
                message.uid === user.id && "chat__senderProperty"
              }`}
            >
              {message.name}
            </span>
          )}

          {message.image && (
            <img
              src={message.image}
              alt=''
              width='250'
              style={{ marginBottom: "-8px" }}
            />
          )}
          {message.file && (
            <a
              href={message.file.data}
              style={{
                marginRight: "5px",
                color: "white",
                display: "table-cell",
                textDecoration: "underline",
              }}
              target='_blank'
              download
            >
              {message.file.name}
            </a>
          )}
          {/* <span
            className={`chat__timestamp chat__property ${
              message.uid === user.id && "chat__senderProperty"
            }`}
            style={{ marginLeft: "-20px" }}
          >
            <span>{showDate(message.timestamp)}</span>.
            <img
              src='https://img.icons8.com/fluent/48/000000/double-tick.png'
              alt=''
              width='14'
              style={{ marginLeft: "3px", marginBottom: "-3px" }}
            />
          </span> */}
        </p>
      )}
    </div>
  );
}
