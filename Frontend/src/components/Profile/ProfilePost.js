import React,{useContext} from 'react'

import pic from '../../assets/people/a5.jpg';
import pic1 from '../../assets/people/a4.jpg';
import pic2 from '../../assets/people/a3.jpg';
import pic3 from '../../assets/people/a2.jpg';
import pic4 from '../../assets/people/a1.jpg';
import s from './Profile.module.scss';
import moment from 'moment';

export default function ProfilePost({item,User}) {
    return (
        <section className={`${s.posts_card}`}>
        <header>
          <span className={`${s.profile_pic}`}>
            <img src={User.pic} alt='' className='rounded-circle' width='34' />
          </span>
          <h5 className={`${s.profile_title}`}>
            <button style={{ textDecoration: 'none' }} className='btn-link'>
              {User.fName + " " + User.lName}
            </button>
            <small style={{ marginLeft: '5px' }}>@{User.username}</small>
          </h5>
          <p style={{ color: '#c1ccd3', marginBottom: '1rem' }}>
            {moment(item.createdAt).fromNow(true)}
          </p>
        </header>
        <div
          style={{ fontSize: '0.9rem', marginBottom: '1rem', display: 'block' }}
        >
          There is no such thing as maturity. There is instead an ever-evolving
          process of maturing. Because when there is a maturity, there is ...
        </div>

        <footer className={`${s.profile_footer}`}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'flex-start',
              alignItems:'center'
            }}
          >
            <ul
              style={{
                fontSize: '.875rem',
                display: 'flex',
                marginBottom: '2px',
              }}
              className={`${s.post_links} mt-sm `}
            >
              <li>
                <button style={{ textDecoration: 'none' }} className='btn-link'>
                  1 hour
                </button>
              </li>
              <li>
                <button style={{ textDecoration: 'none' }} className='btn-link'>
                  <span className='text-danger'>
                    <i className='fa fa-heart'></i> Like
                  </span>
                </button>
              </li>
              <li>
                <button style={{ textDecoration: 'none' }} className='btn-link'>
                  Comment
                </button>
              </li>
            </ul>
            <div style={{ display: 'flex' }} className='ml-auto'>
              <button className='btn-link'>
                <img src={pic1} alt='' className='rounded-circle' width='34' />
              </button>
              <button className='btn-link'>
                <img src={pic2} alt='' className='rounded-circle' width='34' />
              </button>
              <button className='btn-link'>
                <img src={pic3} alt='' className='rounded-circle' width='34' />
              </button>
            </div>
          </div>
          <ul className={`${s.post_comment} mt-sm`}>
            <li
              style={{
                border: '1px solid #040620!important;',
                display: 'flex',
                
              }}
            >
              <span
                className='thumb-xs pull-left mr-sm'
                style={{ marginTop: '1px' }}
              >
                <img src={pic4} alt='' className='rounded-circle' width='28' />
              </span>
              <div style={{ overflow: 'auto',marginLeft:'10px' }}>
                <h6
                  style={{
                    marginBottom: '2px',
                    color: '#7ca9dd',
                    fontSize: '.850rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  Zhalok Rahman{' '}
                  <small
                    style={{
                      fontSize: '9px',
                      fontWeight: '300',
                      color: '#c1ccd3',
                    }}
                  >
                    6 min ago
                  </small>
                </h6>

                <p>Hey, have you heard anything about that?</p>
              </div>
            </li>
            <li
              style={{
                border: '1px solid #040620!important;',
                display: 'flex',
              }}
            >
              <span className='mr-sm' style={{ marginTop: '1px' }}>
                <img src={pic} alt='' className='rounded-circle' width='32' />
              </span>
              <div style={{ overflow: 'auto', width: '100%' }}>
                <input
                  type='text'
                  className={`${s.form_control} ${s.form_control_sm}`}
                  placeholder='Write your comment...'
                  
                />
              </div>
            </li>
          </ul>
        </footer>
      </section>
    )
}
