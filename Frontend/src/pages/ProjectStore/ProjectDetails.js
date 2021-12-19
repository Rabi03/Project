import React, { useContext,useEffect,useState } from "react";
import { useParams ,Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import StarRatings from "react-star-ratings";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import ProjectDetailsBody from "./ProjectDetailsBody";
import { gql, useMutation, useQuery } from "@apollo/client";
import { AuthContext } from "../../Context/Auth";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import gif from "../../assets/loading.gif";
import moment from "moment";
import MetaData from "../../components/Helmet/MetaData";
import {firebaseApp} from '../ChatApp/firebase'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#fff",
    },
  },
});

export default function ProjectDetails({history}) {
  const { projectID } = useParams([]);
  const { user } = useContext(AuthContext);
  const groupRef=firebaseApp.database().ref("groups")
  const [teamInfo,setTeamInfo]=useState([])
  const [teamKeys,setTeamKeys]=useState([])
  console.log(user)
  const {
    loading,
    error,
    data: Post,
  } = useQuery(GET_POST, {
    onError(err) {
      console.log(err);
    },
    variables: {
      postId: projectID,
    },
  });

  const { loading:Loading, err, data: Apps } = useQuery(GET_APPS,{
    onError(err) {
      console.log(err)
    },
    variables:{type: 'project',keyword:""}
  });



  useEffect(()=>{
    if(Post){
      groupRef.child(Post.getPost.groupId).on('value',snap=>{
        setTeamKeys(Object.keys(snap.val()))
        setTeamInfo(snap.val())
      })
    }


  },[Post])


  if(Post===undefined){
    return <div className="container" style={{marginTop:50}}>
    <MetaData title={`${projectID}`} />
    <div className="row">
        <div className="col-md-12">
            <div style={{padding:'40px 15px',textAlign:'center'}}>
                <h1>
                    Oops!</h1>
                <h2>
                    Project Not Found</h2>
                <div className="error-details">
                    Sorry, an error has occured, Requested page not found!
                </div>
                <div className="error-actions">
                    <Link to="/home" className="btn btn-primary btn-lg"><span className="glyphicon glyphicon-home"></span>
                        Take Me Home </Link><Link to="/help" className="btn btn-default btn-lg"><span className="glyphicon glyphicon-envelope"></span> Contact Support </Link>
                </div>
            </div>
        </div>
    </div>
</div>
  }
  if (loading)
    return (
      <Dialog
        open={loading}
        onClose={loading}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        style={{ backgroundColor: "rgba(0,0,0)" }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0)",
            border: "0px",
          }}
        >
          <img src={gif} alt='' width='150' />
        </div>
      </Dialog>
    );
  else
    return (
      <div
        style={{
          backgroundColor: "rgb(18, 20, 43)",
          height: "100%",
          padding: "40px",
          width: "100%",
        }}
      >
      <MetaData title={`${Post.getPost.appName}`} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              className='center-element'
              src={Post && Post.getPost.appLogo}
              alt='...'
              width='60'
              height='60'
            />
            <div style={{ marginLeft: "10px" }}>
              <h4 style={{ fontWeight: "bold" }}>
                {Post && Post.getPost.appName}
              </h4>
              <h6 style={{width:'80%'}}>{Post && Post.getPost.title}.</h6>
              <ThemeProvider theme={theme}>
                <ButtonGroup
                  variant='text'
                  aria-label='text primary button group'
                  color='primary'
                  style={{ height: "13px", marginLeft: "-6px" }}
                >
                  <Button
                    style={{
                      fontSize: "12px",
                      color: "cyan",
                      textTransform: "none",
                    }}
                  >
                    {Post && Post.getPost.groupName}
                  </Button>
                  <Button
                    style={{
                      fontSize: "12px",
                      color: "white",
                      textTransform: "none",
                    }}
                  >
                    {Post && Post.getPost.appType}
                  </Button>
                  <Button
                    style={{
                      fontSize: "12px",
                      color: "white",
                      textTransform: "none",
                    }}
                  >
                    Free
                  </Button>
                </ButtonGroup>
              </ThemeProvider>
            </div>
          </div>
          <Button
              style={{
                backgroundColor: '#51536C',
                color: 'white',
                textTransform: 'none',
                fontSize: "18px",
              }}
              onClick={() => history.push('/store')}
            >
              <img
                src='https://img.icons8.com/color/48/000000/ms-share-point.png'
                alt=''
                width='35'
                height='35'
              />
              Project Store
            </Button>
        </div>
        <ProjectDetailsBody Post={Post && Post.getPost} user={user} teamInfo={teamInfo} teamKeys={teamKeys} Apps={Apps?Apps.getApps:[]} />
      </div>
    );
}



const GET_POST = gql`
  query getPost($postId: ID!) {
    getPost(postId: $postId) {
      id
      type
      appName
      appType
      title
      body
      groupName
      groupId
      appLogo
      maxMember
      githubLink
      images
      videoLink
      Link
      username
      createdAt
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
          body
          avatar
          createdAt
        }
      }
      likes {
        id
        username
        image
        color
        createdAt
      }
      rates {
        id
        username
        value
        createdAt
      }
      commentCount
      likeCount
      rateCount
      uid
    }
  }
`;

const GET_APPS = gql`
  query getApps($type:String!,$keyword:String!){

    getApps(type:$type,keyword:$keyword){
      id
      appName
      appType
      title
      body
      groupId
      groupName
      appLogo
      maxMember
      githubLink
      images
      videoLink
      Link
      username
      createdAt
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
          body
          avatar
          createdAt
        }
      }
      likes {
        id
        username
        image
        color
        createdAt
      }
      rates {
        id
        username
        value
        createdAt
      }
      commentCount
      likeCount
      rateCount
    }
  }

`;

