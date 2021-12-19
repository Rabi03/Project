import React, { useContext, useState } from 'react';

import s from './Profile.module.scss';
import pic from '../../assets/people/a5.jpg';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import PostProject from './PostProject';
import PostIdea from './PostIdea';
export default function PostBox({ OpenPost, tooglePostBox }) {
  const [idea, ShareIdea] = useState(true);
  const [project, ShareProject] = useState(false);

  const handleIdeaShare = () => {
    ShareIdea(true);
    ShareProject(false);
    document.getElementById('idea').style.borderBottom = '2px solid';
    document.getElementById('project').style.borderBottom = '0px';
  };
  const handleProjectShare = () => {
    ShareIdea(false);
    ShareProject(true);
    document.getElementById('idea').style.borderBottom = '0px';
    document.getElementById('project').style.borderBottom = '2px solid';
  };
  return (
    <Modal isOpen={OpenPost} toggle={tooglePostBox} className='post_box'>
      <div
        style={{
          display: 'flex',
          marginBottom: '10px',
          backgroundColor: 'transparent',
        }}
      >
        <Button
          id='idea'
          color='danger'
          outline
          size='md'
          style={{ border: '0px', borderBottom: '2px solid', outline: 'none' }}
          onClick={handleIdeaShare}
        >
          Share Idea
        </Button>
        <Button
          id='project'
          color='success'
          outline
          size='md'
          style={{ border: '0px', outline: 'none' }}
          onClick={handleProjectShare}
        >
          Share Project
        </Button>
      </div>
      <ModalHeader
        toggle={tooglePostBox}
        style={{
          border: '0px',
          padding: '0px',
          paddingTop: '10px',
          paddingLeft: '10px',
          paddingRight: '10px',
        }}
      >
        <div style={{ display: 'flex' }}>
          <span className={`${s.profile_pic}`}>
            <img src={pic} alt='' className='rounded-circle' width='34' />
          </span>
          <h5>
            <button
              style={{ textDecoration: 'none', fontSize: '15px' }}
              className='btn-link'
            >
              Rabi Islam
            </button>
            <p style={{ fontSize: '10px' }}>@rabi</p>
          </h5>
        </div>
      </ModalHeader>
      {project && <PostProject close={tooglePostBox} />}
      {idea && <PostIdea close={tooglePostBox} />}
    </Modal>
  );
}
