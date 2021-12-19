/* eslint-disable react/jsx-no-target-blank */
import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CardHeader from "@material-ui/core/CardHeader";
import { gql, useQuery } from "@apollo/client";
import moment from "moment";
import "firebase/firestore";
import { firebaseApp } from "../ChatApp/firebase";

import s from "../dashboard/Dashboard.module.scss";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import PostCollapse from "../dashboard/components/Collapse";
import CardImage from "../dashboard/components/CardImage";
import PlayVideo from "../dashboard/components/PlayVideo";
import Loading from "../dashboard/components/Loading";

export default function PostCard({ item, user }) {
  const [expanded, setExpanded] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const SaveRef = firebaseApp.database().ref("save");
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

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const deletePost = () => {
    SaveRef.child(user.id).child(item.id).remove();
    handleClose();
  };

  if (loading) return <Loading />;
  else
    return (
      <Card
        style={{
          width: "40rem",
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
              className="rounded-circle"
              src={info.getUserByUsername.pic}
              alt="..."
              width="40"
              height="40"
              style={{ marginTop: "-20px" }}
            />
          }
          action={
            <IconButton aria-label="settings" onClick={handleClick}>
              <i
                style={{ fontSize: "15px", color: "white" }}
                class="fas fa-ellipsis-v"
              ></i>
            </IconButton>
          }
          title={
            <h5 className={`${s.profile_title}`}>
              <button
                style={{ textDecoration: "none", color: "white" }}
                className="btn-link"
              >
                {info.getUserByUsername.fName} {info.getUserByUsername.lName}
              </button>
              <small style={{ marginLeft: "5px" }} className="btn-link">
                shared his team Project App
              </small>
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
            <MenuItem style={{ color: "white" }} onClick={deletePost}>
              Delete Post
            </MenuItem>
          </Menu>
        </CardContent>

        <label htmlFor=""></label>

        {item.images.length > 0 &&
          item.images.map((img, index) => (
            <CardImage key={index} image={img} />
          ))}
        {item.videoLink && <PlayVideo src={item.videoLink} />}
        
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
