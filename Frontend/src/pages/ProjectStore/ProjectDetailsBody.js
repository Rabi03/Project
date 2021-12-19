import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import ReactPlayer from "react-player";
import ProjectDetailTeamInfo from "./ProjectDetailTeamInfo";
import Reviews from "./Reviews";

const details = [
  {
    id: "1",
    video: "https://www.youtube.com/watch?v=OIqyPJQAgT4",
  },
  {
    id: "2",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGevEOorb7KXxCtzyDh4snOpaSb_GqFOtJeQ&usqp=CAU",
  },
  {
    id: "3",
    image:
      "https://www.protocol.com/media-library/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbWFnZSI6Imh0dHBzOi8vYXNzZXRzLnJibC5tcy8yNDYyOTc5Ny9vcmlnaW4ucG5nIiwiZXhwaXJlc19hdCI6MTY3MzU0OTk0N30.JEgQZtlkTHsVdVTMZO3oOsV5ZAcB9X4h3ORCkGQpoWc/image.png?width=1245&quality=85&coordinates=0%2C0%2C0%2C427&height=700",
  },
  {
    id: "4",
    image:
      "https://preview.redd.it/ljcyis6jvmk31.png?auto=webp&s=9f5461b7c67cdfd1a1f8eba42412a9c6151fe767",
  },
  {
    id: "5",
    image:
      "https://neilpatel.com/wp-content/uploads/2021/01/discord-marketing.jpg",
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    overflow: "hidden",
    backgroundColor: "transparent",
    maxWidth: "100vw",
    height: "100%",
  },
  gridList: {
    flexWrap: "nowrap",
    transform: "translateZ(0)",
  },
}));

export default function ProjectDetailsBody({ Post, user,teamInfo,teamKeys,Apps }) {
  const classes = useStyles();
  return (
    <div
      style={{
        display: "flex",
        marginLeft: "5px",
        marginTop: "40px",
      }}
    >
      <div>
        <div
          style={{
            width: "41rem",
            marginBottom: "15px",
            backgroundColor: "rgba(26, 28, 59)",
            borderRadius: "5px",
          }}
        >
          <div
            style={{
              padding: "10px",
              width: "41rem",
              marginBottom: "15px",
              backgroundColor: "rgba(26, 28, 59)",
              borderRadius: "2px",
              height: "60vh",
            }}
          >
            <div className={classes.root}>
              <GridList className={classes.gridList} cols={1}>
                <GridListTile
                  style={{
                    backgroundColor: "rgba(26, 28, 59,0.4)",
                    width: "500px",
                    height: "100%",
                  }}
                >
                  {Post.videoLink && (
                    <ReactPlayer
                      url={Post.videoLink}
                      controls='true'
                      width='100%'
                      height='290px'
                    />
                  )}
                </GridListTile>

                {Post.images.length > 0 &&
                  Post.images.map((img, index) => (
                    <GridListTile
                      style={{
                        backgroundColor: "rgba(26, 28, 59,0.4)",
                        width: "500px",
                        height: "100%",
                      }}
                    >
                      <img
                        key={index}
                        src={img}
                        alt=''
                        style={{
                          filter: "brightness(70%)",
                          width: "100%",
                          height: "290px",
                          objectFit: "contain",
                        }}
                      />
                    </GridListTile>
                  ))}
              </GridList>
            </div>
          </div>
          <p style={{ margin: "10px", paddingBottom: "10px" }}>{Post.body}</p>
        </div>

        <Reviews
          Post={Post}
          username={user.username}
          name={user.fName + " " + user.lName}
          userPhoto={user.photoUrl}
          uid={user.id}
        />
      </div>
      <ProjectDetailTeamInfo Post={Post} teamInfo={teamInfo} teamKeys={teamKeys} Apps={Apps} />
    </div>
  );
}
