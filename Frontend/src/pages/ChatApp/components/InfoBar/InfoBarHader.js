/* eslint-disable import/newline-after-import */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useState } from 'react';
import ProjectBrief from './ProjectBrief';
export default function InfoBarHader({ roomName, avatar,github,details }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div style={{ padding: '10px', color: 'white' }}>
      <div style={{ textAlign: 'center' }}>
        <img
          src={avatar}
          alt='message-attachment'
          width='40'
          height='40'
          style={{ borderRadius: '20px', marginRight: '5px' }}
        />
        <h5 style={{ marginTop: '5px', fontWeight: 'bold' }}>{roomName}</h5>
      </div>
      <hr height='5' style={{ backgroundColor: 'black', marginTop: '8px' }} />
      <div style={{ alignItems: 'center', marginTop: '8px' }}>
        <a
          href={`${github}`}
          target='_blank'
          rel='noopener noreferrer'
          style={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            color: 'white',
          }}
        >
          <h6>Project Repository</h6>
          <i
            className='fab fa-github'
            style={{
              color: 'cyan',
              fontSize: '18px',
              marginLeft: '5px',
              textDecoration: 'none',
            }}
          />
        </a>
        <h6
          style={{
            marginTop: '10px',
            marginBottom: '5px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          Project Details
          <i
            role='button'
            className='fas fa-tasks'
            style={{
              color: 'cyan',
              fontSize: '18px',
              marginLeft: '5px',
              marginTop: '3px',
              cursor: 'pointer',
            }}
            onClick={handleClickOpen}
          />
        </h6>
      </div>
      <hr height='5' style={{ backgroundColor: 'black', marginTop: '8px' }} />
      <ProjectBrief
        open={open}
        details={details}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
      />
    </div>
  );
}
