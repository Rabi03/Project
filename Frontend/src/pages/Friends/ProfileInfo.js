/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
import {
  Card,
  CardImg,
  CardBody,
} from 'reactstrap';

import img from '../../assets/backImage.png';
import pic from '../../assets/people/a5.jpg';
import s from './Friends.module.scss';

export default function ProfileInfo() {
  return (
    <Card className={`${s.card}`}>
      <CardImg top width='100%' src={img} alt='Card image cap' />
      <CardBody className={`${s.card_body}`}>
        <div className='row'>
          <div
            style={{ marginTop: '-75px' }}
            className='text-center col-12 col-md-5'
          >
            <div className={`${s.thumb_xl} mb-3`}>
              <img
                className={`${s.card_img} mx-auto d-block`}
                src={pic}
                alt=''
                width='80'
              />
            </div>
            <h5 className={`${s.fx_normal}`}>Rabi Islam</h5>
            <p style={{ textAlign: 'center',color:'white' }}>Software Engineer</p>
            <div style={{display:'flex',justifyContent:'center'}}>
            <button className='btn btn-success btn-sm mb-3 mr-sm '>
              Send <i class='fas fa-envelope'></i>
            </button>
            <button
              className={`${s.follow1_btn} btn btn-sm mb-3`}
              style={{
                borderColor: 'white',
                color: 'white',
                marginTop: '0px',
              }}
            >
              <i class='fab fa-facebook'></i> Follow
            </button>
            </div>
            <ul style={{display:'inline-block',textAlign:'left',color:'white'}}>
            <li>
              <i class='fas fa-phone-alt fa-fw mr-2'></i>{' '}
              <a href='http://google.com'>+375 29 555-55-55</a>
            </li>
            <li>
              <i class='fas fa-envelope fa-fw mr-2'></i>{' '}
              <a href='http://facebook.com'>psmith@example.com</a>{' '}
            </li>
            <li>
              <i class='fas fa-map-marker-alt fa-fw mr-2'></i>{' '}
              <a href='http://youtube.com'>Minsk, Belarus</a>{' '}
            </li>

            </ul>
          </div>
          <div className='col-12 col-md-7'>
            <button
              className={`${s.follow_btn} btn btn-sm mb-3 d-block`}
              style={{
                borderColor: 'white',
                color: 'white',
                marginTop: '-55px',
                float: 'right',
              }}
            >
              <i class='fab fa-facebook'></i> Follow
            </button>
            <div style={{ display: 'inline-block' }}>
              <p className={`${s.text}`}>251</p>
              <h6 className={`${s.name}`}>Posts</h6>
            </div>
            <div style={{ display: 'inline-block', marginLeft: '15px' }}>
              <p className={`${s.text}`}>9.38%</p>
              <h6 className={`${s.name}`}>Conversions</h6>
            </div>
            <div style={{ display: 'inline-block', marginLeft: '15px' }}>
              <p className={`${s.text}`}>842</p>
              <h6 className={`${s.name}`}>Followers</h6>
            </div>
            <p>
              <a href='#' className='badge badge-info rounded-0 mb-2 mr-2'>
                Engineer
              </a>
              <a href='#' className='badge badge-primary rounded-0 mr-2'>
                Developer
              </a>
              <a href='#' className='badge badge-default rounded-0'>
                AI Engineer
              </a>
            </p>
            <p className={`${s.lead} mt-xlg`}>
              My name is Rabi Islam and here is my new Light Blue user profile
              page.
            </p>
            <p style={{ color: '#c1ccd3' }}>
              I love reading people's summaries page especially those who are in
              the same industry as me.{' '}
            </p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
