import React, { useState,useEffect } from 'react';
import ProgressBar from '@ramonak/react-progress-bar';
import s from './Groups.module.scss';

import {firebaseApp} from '../ChatApp/firebase'

export default function GroupInfo({ roomId,avatar, title, onClick }) {
  const [members,setMembers]=useState([])
  const groupRef = firebaseApp.database().ref("groups");
  const [progress, setProgress] = useState(20);
  useEffect(() => {
    groupRef.child(roomId).on('value',snap=>setMembers(snap.val()))

  },[])

  const groupKeys=members?Object.keys(members):[]

  return (
    <div className='col-12 col-lg-6 col-xl-4'>
      <section className={s.card}>
        <header>
          <img
            className='rounded-circle'
            src={avatar}
            alt='...'
            width='40'
            height='40'
          />
          <div style={{ marginLeft: '10px' }}>
            <h5 className={s.roomName} onClick={onClick} style={{ cursor: 'pointer' }}>
              {title}
            </h5>
            <p style={{ marginTop: '-5px' }}>Member {groupKeys.length}</p>
          </div>
        </header>
        <div style={{ padding: '15px 20px 10px' }}>
          <h6
            style={{ cursor: 'pointer', display: 'table-cell' }}
            onClick={() => window.open('https://github1s.com/akabiru/react-clone')}
          >
            <i
              class='fab fa-github'
              style={{ color: 'white', marginRight: '5px',fontSize: '20px'}}
            ></i>{' '}
            Project Repository
          </h6>
        </div>
      </section>
    </div>
  );
}
