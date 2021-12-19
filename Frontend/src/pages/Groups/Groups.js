/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import {useHistory} from 'react-router-dom'
import GroupInfo from './GroupInfo'
import { AuthContext } from '../../Context/Auth';
import MetaData from '../../components/Helmet/MetaData';
import GroupLoader from './GroupLoader';
import {firebaseApp} from '../ChatApp/firebase'

export default function Groups() {

  const {user}=useContext(AuthContext)
  const history = useHistory();
  const userRef = firebaseApp.database().ref("users");
  const [rooms,setRooms]=useState([]);

  useEffect(() => {
    userRef.child(user.id).child('rooms').on('value',snap=>setRooms(snap.val()))

  },[])

  const roomKeys = rooms?Object.keys(rooms):[]

  

  const handleClick = (id) => {
    history.push(`/rooms/${id}`)
    }

    if(!rooms){
      return <div>No group found.Please Join</div>
    }
    else return (
        <div className="row" style={{marginRight:'20px',paddingTop:20}}>
        <MetaData title={'Groups'} />
            {rooms&&roomKeys.map(key => (
                <GroupInfo key={key} roomId={key} avatar={rooms[key].roomPic}  title={rooms[key].roomName} onClick={()=>handleClick(key)} /> 
            ))}
                      
        </div>
    )
}

