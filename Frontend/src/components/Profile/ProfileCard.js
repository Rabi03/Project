/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useContext } from 'react';
import { Card, CardImg, CardBody } from 'reactstrap';

import img from '../../assets/backImage.png';
import pic from '../../assets/people/a5.jpg';
import { AuthContext } from '../../Context/Auth';
import s from './Profile.module.scss';

const badgeType=['info','primary','default']

export default function ProfileCard({User}) {
  const {user}=useContext(AuthContext)
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
                src={User.pic}
                alt=''
                width='80'
                height='80'
                style={{objectFit: "cover" }}
              />
            </div>
            <h5 className={`${s.fx_normal}`}>{User.fName + " " + User.lName}</h5>
            <p style={{ textAlign: 'center' }}>{User.profession[0]}</p>
            {User.username.includes(user.username)===false&& <div style={{ display: 'flex', justifyContent: 'center' }}>
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
            </div>}
            <ul style={{ display: 'inline-block', textAlign: 'left' }}>
              <li>
                <i class='fas fa-phone-alt fa-fw mr-2'></i>{' '}
                <a href='http://google.com'>+375 29 555-55-55</a>
              </li>
              <li>
                <i class='fas fa-envelope fa-fw mr-2'></i>{' '}
                <a href='http://facebook.com'>{User.email}</a>{' '}
              </li>
              <li>
                <i class='fas fa-map-marker-alt fa-fw mr-2'></i>{' '}
                <a href='http://youtube.com'>Minsk, Belarus</a>{' '}
              </li>
            </ul>
          </div>
          <div className='col-12 col-md-7'>
          {User.username.includes(user.username)===false&&<button
            className={`${s.follow_btn} btn btn-sm mb-3 d-block`}
            style={{
              borderColor: 'white',
              color: 'white',
              marginTop: '-55px',
              float: 'right',
            }}
          >
            <i class='fab fa-facebook'></i> Follow
          </button>}
            <div style={{ display: 'inline-block' }}>
              <p className={`${s.text}`}>{User.ideas}</p>
              <h6 className={`${s.name}`}>Ideas</h6>
            </div>
            <div style={{ display: 'inline-block', marginLeft: '15px' }}>
              <p className={`${s.text}`}>{User.projects}</p>
              <h6 className={`${s.name}`}>Projects</h6>
            </div>
            <div style={{ display: 'inline-block', marginLeft: '15px' }}>
              <p className={`${s.text}`}>{User.followers}</p>
              <h6 className={`${s.name}`}>Followers</h6>
            </div>
            <p>
            {User.profession.length>0&& User.profession.map(pro=>(
              <a href='#' className={`badge badge-${badgeType[Math.floor((Math.random()*3))]} rounded-0 mb-2 mr-2`}>
                {pro}
              </a>
            ))}
              
              {/* <a href='#' className='badge badge-primary rounded-0 mr-2'>
                Developer
              </a>
              <a href='#' className='badge badge-default rounded-0'>
                AI Engineer
              </a> */}
            </p>
            <p style={{ color: '#c1ccd3!important' }}>
              {User.title}
            </p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
