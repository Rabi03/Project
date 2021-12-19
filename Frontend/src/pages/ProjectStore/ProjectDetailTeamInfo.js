import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "@material-ui/core/Button";
import img from "../../assets/people/a4.jpg";
import img1 from "../../assets/people/a5.jpg";
import img2 from "../../assets/people/a7.jpg";
import RelatedProjects from "./RelatedProjects";
import { gql, useMutation, useQuery } from "@apollo/client";
import Rating from 'react-rating'
import { AuthContext } from "../../Context/Auth";
const name = ["Zhalok Rahman", "Tanjimur Rahman", "Jamil Hossain"];

export default function ProjectDetailTeamInfo({ Post,teamInfo,teamKeys,Apps }) {
  const [OpenRating, setOpenRating] = useState(false);
  const [isRate, setIsRate] = useState(false);
  const [userRate, setUserRate] = useState(0);
  const [rating, setRating] = useState(0);
  const { projectID } = useParams([]);
  const [RatePost] = useMutation(RATE_POST);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    let currrate = Post.rates.find((rate) => user.username === rate.username);
    console.log("Current Rate", currrate);
    if (user && currrate) {
      setUserRate(currrate.value);
      setIsRate(true);
    } else {
      setUserRate(0);
      setIsRate(false);
    }
  }, [user, Post.rates]);
  console.log(teamInfo)
  


  const handleChange = (value) => {
    setRating(value);
    console.log(value)
    RatePost({
      variables: {
        postId: projectID,
        value: `${value}`,
        username: user.username,
      },
    });
    setOpenRating(false)
  };
  return (
    <div style={{ width: "100%", marginLeft: "30px" }}>
      <div style={{ display: "flex" }}>
        <Button
          fullWidth
          style={{
            backgroundColor: "#0000ff",
            color: "white",
            marginRight: "20px",
            textTransform: "none",
          }}
          onClick={()=>window.open(Post.githubLink)}
        >
          Get It
        </Button>
        {OpenRating ? (
          <Button fullWidth >
            <Rating
              onChange={handleChange}
              emptySymbol={<i className='far fa-star' style={{ color:'white',fontSize:'20px'}}></i>}
              fullSymbol={
                <i className='fa fa-star' style={{ fontSize: "20px",color:'#ffd700' }}></i>
              }
              fractions={2}
            />
          </Button>
        ) : isRate ? (
          <Button
            fullWidth
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              color: "white",
              textTransform: "none",
            }}
            onClick={() => setOpenRating(true)}
          >
            <span style={{ fontWeight: "bold" }}>{userRate}</span>
            <i
              className='fas fa-star'
              style={{ marginLeft: "5px", color: "yellow" }}
            ></i>{" "}
          </Button>
        ) : (
          <Button
            fullWidth
            style={{
              backgroundColor: "#f50057",
              color: "white",
              textTransform: "none",
            }}
            onClick={() => setOpenRating(true)}
          >
            <i class='far fa-star' style={{ marginRight: "5px" }}></i> Rate{" "}
            <span style={{ marginLeft: "7px", fontWeight: "bold" }}>255k </span>
          </Button>
        )}
      </div>
      <div
        style={{
          backgroundColor: "#1b1e3c",
          padding: "20px",
          marginTop: "20px",
          borderRadius: "10px",
        }}
      >
        <h5 style={{ textAlign: "center" }}>{Post.groupName}</h5>
        <h6>Project Leader</h6>
        {teamKeys.length>0&& teamKeys.map(key=> teamInfo[key]&&teamInfo[key].role.includes('admin')&& (
          <div style={{ display: "flex", marginTop: "15px" }}>
          <img
            className='rounded-circle'
            src={teamInfo[key].avatar}
            alt=''
            width='40'
            height='40'
          />
          <div style={{ marginLeft: "10px" }}>
            <h4
              style={{
                marginBottom: "0px",
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              {teamInfo[key].name}
            </h4>
            <p style={{ fontSize: "12px" }}>Software Engineer</p>
          </div>
        </div>
        ))}
        
        <h6>Member</h6>
        <div style={{ height: "120px", overflow: "scroll", marginTop: "15px" }}>
          {teamKeys.map(key=> teamInfo[key]&&teamInfo[key].role.includes('member')&& (
            <div style={{ display: "flex" }}>
              <img
                className='rounded-circle'
                src={teamInfo[key].avatar}
                alt=''
                width='40'
                height='40'
              />
              <div style={{ marginLeft: "10px" }}>
                <h6
                  style={{
                    marginBottom: "0px",
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                >
                  {teamInfo[key].name}
                </h6>
                <p style={{ fontSize: "12px" }}>Software Engineer</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <RelatedProjects Apps={Apps} />
    </div>
  );
}

const RATE_POST = gql`
  mutation ratePost($postId: ID!, $value: String!, $username: String!) {
    ratePost(postId: $postId, value: $value, username: $username) {
      id
      rates {
        id
        value
        username
      }
      likeCount
    }
  }
`;
