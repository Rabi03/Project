/* eslint-disable no-useless-computed-key */
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import { firebaseApp } from "../ChatApp/firebase";

import { gql, useMutation } from "@apollo/client";
import { AuthContext } from "../../Context/Auth";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import ChipInput from "material-ui-chip-input";
import gif from "../../assets/loading.gif";
import uid from 'uuid/dist/v4'
import MetaData from '../../components/Helmet/MetaData'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#90caf9",
    },
    "& .MuiFormLabel-root": {
      color: "#fff",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#90caf9",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "rgba(255,255,255,0.5)",
      },
      "&:hover fieldset": {
        borderColor: "#fff",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#90caf9",
      },
      color: "#fff",
    },
    "&.MuiTextField-root": {
      marginBottom: "10px",
    },
  },
})(TextField);

export default function SignUp({ Close, Open, OpenSignIn }) {
  const history = useHistory();
  const UserRef = firebaseApp.database().ref("users");
  const storageRef=firebaseApp.storage().ref().child('user/images/'+uid()+'.jpg')
  const context = useContext(AuthContext);
  const [error, setError] = useState(false);
  const [values, setInfo] = useState({
    username: "",
    email: "",
    fName: "",
    lName: "",
    password: "",
    pic: "",
    github: "",
    profession: [],
    ideas: 0,
    projects: 0,
    followers: 0,
    following: [],
    rooms: [],
    title:
      "I love reading people's summaries page especially those who are in the same industry as me",
  });

  const AddUserToFirebase = (id, name) => {
    if (id) UserRef.child(id).child("name").set(name);
  };

  const [AddUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, result) {
      AddUserToFirebase(result.data.register.id, result.data.register.username);
      context.login(result.data.register);
      setError(false);
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
      history.push("/home");
    },
    onError(err) {
      console.log(err);
      setError(true);
    },
    variables: values,
  });

  const { username, email, fName, lName, password, github, profession, pic } =
    values;

  const handleSubmit = (e) => {
    e.preventDefault();
    AddUser();
  };

  const handleChange = (e) =>
    setInfo({ ...values, [e.target.name]: e.target.value });

  const setprofession = (item) =>
    setInfo({ ...values, ["profession"]: [...profession, item] });
  const handleTagDelete = (item, index) => {
    const newprofession = [...profession];
    newprofession.splice(index, 1);
    setInfo({ ...values, ["profession"]: [...newprofession] });
  };
  const handlePicUpload = (e) => {

    const metadata = {
      contentType: 'image/jpeg',
    };
    const file = e.target.files[0];

    storageRef.put(file).then(function(result){
      storageRef.getDownloadURL().then(function(result){
        setInfo({ ...values, ["pic"]: result });
      })
      .catch(err=>{
        console.log(err)
      }) 
  })
    .catch(err=>{
      console.log(err)
    })
  };
  if (loading)
    return (
      <Dialog
        open={Open}
        TransitionComponent={Transition}
        keepMounted
        onClose={Close}
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'
      >
        <MetaData title="Loading......." />
        <div style={{ backgroundColor: "#1B1E3F" }}>
          <img src={gif} alt='' width='100' />
        </div>
      </Dialog>
    );
  else
    return (
      <Dialog
        open={Open}
        TransitionComponent={Transition}
        keepMounted
        onClose={Close}
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#1B1E3F",
            padding: "20px",
            width: "40vw",
          }}
        >
          <Avatar>
            <i class='fas fa-user' style={{ color: "#1B1E3F" }}></i>
          </Avatar>
          <Typography
            component='h1'
            variant='h5'
            style={{ color: "#fff", marginBottom: "20px" }}
          >
            Sign Up
          </Typography>
          <form onSubmit={handleSubmit}>
            <CssTextField
              variant='outlined'
              required
              fullWidth
              id='username'
              label='Username'
              name='username'
              value={username}
              autoComplete='off'
              autoFocus
              onChange={handleChange}
            />
            {error && (
              <p
                style={{
                  padding: "5px",
                  color: "rgb(250, 179, 174)",
                  backgroundColor: "rgb(24, 6, 5)",
                  borderRadius: "5px",
                }}
                severity='error'
              >
                <i
                  class='fas fa-exclamation-circle'
                  style={{ color: "red" }}
                ></i>{" "}
                username is already taken.
              </p>
            )}
            <CssTextField
              variant='outlined'
              type='email'
              required
              fullWidth
              id='email'
              label='Email address'
              name='email'
              value={email}
              autoComplete='off'
              onChange={handleChange}
            />

            <Grid container>
              <Grid item>
                <CssTextField
                  variant='outlined'
                  required
                  fullWidth
                  id='fName'
                  label='First Name'
                  name='fName'
                  value={fName}
                  autoComplete='off'
                  onChange={handleChange}
                />
              </Grid>
              <Grid item>
                <CssTextField
                  variant='outlined'
                  required
                  fullWidth
                  id='lName'
                  label='Last Name'
                  name='lName'
                  value={lName}
                  autoComplete='off'
                  onChange={handleChange}
                  style={{ marginLeft: "5px" }}
                />
              </Grid>
            </Grid>

            <CssTextField
              variant='outlined'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='off'
              onChange={handleChange}
              value={password}
            />
            <div style={{ display: "flex", marginBottom: "5px" }}>
              <div style={{ width: "200px" }}>
                <h6 style={{ fontSize: "12px", color: "white" }}>
                  Choose Profile Picture
                </h6>
                {pic ? (
                  <img
                    src={pic}
                    alt=''
                    width='40'
                    height='30'
                    style={{ marginLeft: "30px" ,cursor:'pointer' }}
                    
                  />
                ) : (
                  <input
                    required
                    type='file'
                    name='pic'
                    id=''
                    onChange={handlePicUpload}
                    style={{ color: "white" }}
                  />
                )}
              </div>
              <div>
                <CssTextField
                  variant='outlined'
                  required
                  name='github'
                  label='Github Profile Link'
                  type='text'
                  id='github'
                  autoComplete='off'
                  onChange={handleChange}
                  value={github}
                />
              </div>
            </div>

            <div style={{ marginBottom: "10px" }}>
              <h6 style={{ fontSize: "12px", color: "white" }}>
                Choose Professions{" "}
                <span style={{ fontSize: "9px", color: "#db2a34" }}>
                  (Every time press enter to add more)
                </span>
              </h6>
              <ChipInput
                required={profession.length === 0 ? true : false}
                value={profession}
                fullWidth
                onAdd={(chip) => setprofession(chip)}
                onDelete={(chip, index) => handleTagDelete(chip, index)}
                placeholder='Ex. Software Engineer UI/UX Designer...'
                style={{ fontWeight: "bold", color: "white" }}
              />
            </div>

            <Button
              type='submit'
              fullWidth
              variant='contained'
              style={{ backgroundColor: "#90caf9" }}
            >
              Sign Up
            </Button>
            <Grid container style={{ marginTop: "10px" }}>
              <Grid item>
                <Link
                  href='#'
                  variant='body2'
                  style={{ color: "#90caf9" }}
                  onClick={OpenSignIn}
                >
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Dialog>
    );
}

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $fName: String!
    $lName: String!
    $password: String!
    $pic: String!
    $github: String!
    $profession: [String]!
    $ideas: Int!
    $projects: Int!
    $followers: Int!
    $following: [ID]!
    $rooms: [String]!
    $title: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        fName: $fName
        lName: $lName
        password: $password
        pic: $pic
        github: $github
        profession: $profession
        ideas: $ideas
        projects: $projects
        followers: $followers
        following: $following
        rooms: $rooms
        title: $title
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;
