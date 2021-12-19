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
import { Button, CardMedia } from '@material-ui/core';
import { CardBody } from 'reactstrap';
import Loading from "../dashboard/components/Loading";
import StarRatings from 'react-star-ratings';

export default function PostCard({ item, user,history }) {
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

  const getRating = ()=> {
    let max=0;
    item.rates.forEach(rate => {
      if(Number(rate.value)>max){
        max=Number(rate.value);
      }
    });
    return max
  }




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
        <div className='project-container'>
          <CardMedia
            image={item.images[0]}
            className='project-img'
          />
        </div>
        <CardBody>
          <div style={{ display: 'flex', width: '100%' }}>
            <img src={item.appLogo} alt='' width='40' height='40' />
            <div style={{ marginLeft: '5px' }}>
              <h4 style={{ color: 'white', fontWeight: 'bold' }}>
                {item.appName}
              </h4>
              <Typography
            style={{ color: "white", fontSize: "18", marginBottom: "10px" }}
          >
            {item.title}
          </Typography>
            </div>
          </div>
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
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <h6
                style={{
                  marginBottom: '-8px',
                  marginRight: '5px',
                  color: 'white',
                  marginLeft: '3px',
                }}
              >
                {getRating()}
              </h6>
              <StarRatings
                starRatedColor='yellow'
                rating={getRating()}
                starDimension='15px'
                starSpacing='0px'
                starEmptyColor='rgba(255, 255, 255,0.3)'
              />
              <p
                style={{
                  marginBottom: '-8px',
                  marginLeft: '5px',
                  color: 'white',
                  fontSize: '12px',
                }}
              >
                ({item.rates.length})
              </p>
            </div>
            <Button
              style={{
                backgroundColor: '#51536C',
                color: 'white',
                textTransform: 'none',
              }}
              onClick={() => history.push('/store/' + item.id)}
            >
              <img
                src='https://img.icons8.com/color/48/000000/ms-share-point.png'
                alt=''
                width='22'
              />
              Project Store
            </Button>
          </div>
        </CardBody>
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
