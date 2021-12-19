/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';


export default function TopPersion({img,name,followers}) {
  return (
    <div
      className='card'
      style={{
        width: '11rem',
        backgroundColor: 'rgba(26, 28, 59,0.4)',
          border: '0px',
          boxShadow: '4px 4px rgba(2,2,2,0.2)',
          marginLeft:'10px'
      }}
    >
      <div className='card-body'>
        <img
          className='rounded-circle center-element'
          src={img}
          alt='...'
          width='50'
          height='50'
        />
        <h5
          className='card-title'
          style={{ fontSize: '15px', textAlign: 'center',margin:'0px',marginTop:'5px',marginBottom:'5px' }}
        >
          {name}
        </h5>
        <p
          className='card-text'
          style={{ fontSize: '13px', textAlign: 'center',margin:'0px',marginBottom:'5px' }}
        >
          {followers} <small>followers</small>
        </p>
        <p
          className='btn btn-primary center-element m-auto'
          style={{ fontSize: '12px', padding: '5px 12px' }}
        >
          Follow
        </p>
      </div>
    </div>
  );
}
