/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable react/self-closing-comp */
import React ,{ useEffect, useState }from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Slide from '@material-ui/core/Slide';
import { withStyles } from '@material-ui/core/styles';
import {firebaseApp} from '../../firebase'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />;
});

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#90caf9',
    },
    '& .MuiFormLabel-root': {
      color: '#fff',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#90caf9',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'rgba(255,255,255,0.5)',
      },
      '&:hover fieldset': {
        borderColor: '#fff',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#90caf9',
      },
      color: '#fff',
    },
  },
})(TextField);




export default function OpenZoom({ open, handleClose ,roomId}) {
  const [zoomLink,setZoomLink]= useState("")
  const roomRef=firebaseApp.database().ref("rooms")
  const [err,setError]=useState("")

  useEffect(() => {
    roomRef.child(roomId).child("zoomLink").on('value',snap =>setZoomLink(snap.val()?snap.val():""))
  },[])

  const addZoomLink=()=>{

    if(zoomLink)
    {
      roomRef.child(roomId).child("zoomLink").set(zoomLink)
      setZoomLink("")
      setError("")
      handleClose()
    }
    else setError("Please add zoom link")
  }
  return (
    <Dialog
      TransitionComponent={Transition}
      keepMounted
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      >
      <DialogTitle id='alert-dialog-title' style={{backgroundColor:'rgba(0,0,0,0.75)',color:'white'}}>
        Open Zoom and share your Personal Video or Audio Meeting Room Join URL
      </DialogTitle>
      <DialogContent style={{backgroundColor:'rgba(0,0,0,0.75)',color:'white'}}>
      <CssTextField
      required
      variant='outlined'
          label="Zoom Link"
          autoComplete="current-password"
          fullWidth
          value={zoomLink}
          onChange={e=>setZoomLink(e.target.value)}
          color='primary'
        />
        <p style={{fontSize:18,color:'red',fontWeight:'bold'}}>{err}</p>
      </DialogContent>
      <DialogActions style={{alignItems: 'center',backgroundColor:'rgba(0,0,0,0.75)' ,color:'white'}}>
        <Button variant="contained" style={{ fontSize: '18px',textTransform:'capitalize' }} onClick={addZoomLink}>Add Link</Button>
      </DialogActions>
    </Dialog>
  );
}
