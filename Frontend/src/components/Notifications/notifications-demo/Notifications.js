import React, { useContext, useEffect, useState } from 'react';
import {
  ListGroup,
  ListGroupItem,
  Button,
} from 'reactstrap';

import s from './ListGroup.module.scss';
import {Link} from 'react-router-dom'
import {firebaseApp} from '../../../pages/ChatApp/firebase'
import {AuthContext} from '../../../Context/Auth'
import moment from 'moment'
import { gql, useMutation } from "@apollo/client";


export default function Notifications() {
  const UserRef = firebaseApp.database().ref("users");
  const NotificationRef= firebaseApp.database().ref("notifications");
  const GroupRef = firebaseApp.database().ref("groups");
  const {user}=useContext(AuthContext)
  const [notifi,setNotifi]=useState([])
  useEffect(() => {
      NotificationRef.child(user.id).on("value",snap => {
        setNotifi(snap.val())
      })
  },[user])

  const notifiKeys=notifi?Object.keys(notifi):[]
  console.log(notifi)

  const [addRoom, { erro }] = useMutation(ADD_ROOM, {
    update(proxy) {
      console.log("successfully add room");
    },
    onError(err) {
      console.log(err);
    },
  });

  const acceptRequest=()=>{
    NotificationRef.child(user.id).on("value",snap => {
      setNotifi(snap.val())
    })
  }

  const JoinWithTeam = (item) => {
    acceptRequest()
    setLastVisited(item.user.uuid, item.room.roomId);
    AddNewRoom(item.user.uuid, item.room.roomId,item.room.roomName,item.room.roomPic);
    addRoom({
      variables: {
        username: item.user.username,
        roomId: item.room.roomId,
        roomName: item.room.roomName,
        roomPic: item.room.roomPic,
      },
    });

    GroupRef.child(item.room.roomId)
      .child(item.user.uuid)
      .set({
        name: item.user.name,
        userId: item.user.uuid,
        avatar: item.user.avatar,
        profession:item.user.profession,
        role: "member",
      });

      NotificationRef.child(user.id).child(item.nid).update({
        accept: 1,
      })

      NotificationRef.child(item.user.uuid).push({
        type:'accept',
        emo:{
          color:'green',
          name:"fas fa-check-circle"
        },
        user:{
          name:user.fName+ " " + user.lName,
          avatar:user.photoUrl,
          uuid:user.id,
          username:user.username,
          profession:user.profession.join()
        },
        room:{
          roomName: item.room.roomName,
          roomPic: item.room.roomPic,
        },
      })

      NotificationRef.child(item.user.uuid).child('unSeen').get().then(val=>{
        NotificationRef.child(item.user.uuid).child('unSeen').set(val.val()?val.val()+1:1)
      })
  };

  const AddNewRoom = (id, roomID,roomName,roomPic) => {
    UserRef.child(id).child("rooms").child(roomID).set({
      roomName: roomName,
      roomPic: roomPic,
      admin: user.id,
    });
  };

  const setLastVisited = (id, channel) => {
    const lastVisited = UserRef.child(id).child("lastVisited").child(channel);
    lastVisited.set(Date.now());
    lastVisited.onDisconnect().set(Date.now());
  };

  const denyRequest=(item)=>{
    NotificationRef.child(item.user.uuid).push({
      type: "deny",
      user:{
        name:user.fName+ " " + user.lName,
        avatar:user.photoUrl,
        uuid:user.id,
        username:user.username,
        profession:user.profession.join()
      },
      room:{
        roomName: item.room.roomName,
        roomPic: item.room.roomPic,
      },
      emo:{
        name:'fas fa-ban',
        color: '#C70039'
      },
      createdAt:Date.now()
    })

    NotificationRef.child(user.id).child(item.nid).update({
      accept: 2,
    })
  }
  
  if(notifi===undefined) {
    return <div>loading....</div>
  }
  else return (
    <ListGroup className={[s.listGroup, 'thin-scroll'].join(' ')}>
    {notifiKeys.length>0&&notifiKeys.reverse().map(item=>notifi[item]?.user?.uuid.includes(user.id)===false&&
    <ListGroupItem className={s.listGroupItem}>
        <span className={[s.notificationIcon, s.img_sm].join(' ')}>
        <div style={{marginRight:'10px'}}>
          <img className="rounded-circle" src={notifi[item].user.avatar} alt="..." width="40" height="40" style={{objectFit: "cover" }} />
          <i
                style={{ fontSize: "20px", color:notifi[item].emo.color,position:'absolute',marginTop:25,right:5}}
                className={notifi[item].emo.name}
              ></i>
        </div>
          
        </span>
        <p className="m-0 overflow-hidden">
          <Link to={`/profile/${notifi[item].user.uuid}`}>{notifi[item].user.name}</Link>
          {notifi[item].type.includes('react')&&" react to your post."}
          {notifi[item].type.includes('comment')&&" comment to your post."}
          {notifi[item].type.includes('join')&&` want to join with your group`}
          {notifi[item].type.includes('join')&&<>
          {notifi[item].accept===0&&<>
          <Button size="sm" color="success" className="mr-1" style={{padding:'2px 5px'}} onClick={()=>JoinWithTeam(notifi[item])}>Allow</Button>
          <Button size="sm" color="danger" style={{padding:'2px 5px'}} onClick={()=>denyRequest(notifi[item])}>Deny</Button>
          </>}
          {notifi[item].accept===1&& <Button size="sm" color="success" className="mr-1" style={{padding:'2px 5px'}}>Request Accepted</Button>}
          {notifi[item].accept===2&& <Button size="sm" color="danger" style={{padding:'2px 5px'}}>Request Cancelled</Button>}
          </>
          }
          {notifi[item].type.includes('deny')&&` canceled your joining request from ${notifi[item].room.roomName}`}
          {notifi[item].type.includes('accept')&&` accept your joining request from ${notifi[item].room.roomName}`}
          <time className="time-block m-0">
            {moment(notifi[item].createdAt).fromNow()}
          </time>
        </p>
      </ListGroupItem>)}
      
    </ListGroup>
  );
}


const ADD_ROOM = gql`
  mutation addRoom(
    $username: String!
    $roomId: String!
    $roomName: String!
    $roomPic: String!
  ) {
    addRoom(
      username: $username
      roomId: $roomId
      roomName: $roomName
      roomPic: $roomPic
    ) {
      id
      email
      username
    }
  }
`;
