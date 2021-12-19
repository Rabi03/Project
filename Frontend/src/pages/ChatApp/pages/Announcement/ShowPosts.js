import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Row, Col } from "reactstrap";
import Collapse from "@material-ui/core/Collapse";
import PostsCard from "./PostsCard";
import { firebaseApp } from "../../firebase";

export default function ShowPosts({ user }) {
  const [post, setPost] = useState({});
  const { roomId } = useParams([]);
  const roomRef = firebaseApp.database().ref("rooms").child(roomId);

  useEffect(() => {
    roomRef.child("posts").on("value", (snap) => setPost(snap.val()));
  }, [roomId]);

  let postKeys = post && Object.keys(post);
  return (
   <div className="Accouncemnet-postcard">
    <Row>
      {post &&
        postKeys.length > 0 &&
        postKeys.reverse().map((item, index) => (
          <Col key={index} sm={12} md={12} lg={12} xl={12} xs={12}>
            <Collapse in={true}>
              <PostsCard
                key={item}
                item={post[item]}
                postId={item}
                user={user}
                roomID={roomId}
              />
            </Collapse>
            {postKeys.length <= 1 && (
              <Collapse in={true}>
                <div
                  style={{
                    // width: "35rem",
                    border: "0px",
                    display: "block",
                    height: "100px",
                    margin: "10px",
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: "20px",
                    fontSize: "18px",
                    textAlign: "center",
                  }}
                >
                  No Posts yet.
                </div>
              </Collapse>
            )}
          </Col>
        ))}
    </Row>
    </div>
  );
}
