import React, { useState } from 'react';
import Login from '../login/Login';
import SignUp from '../register/SignUp';

export default function IntroPage() {
  const [IsSignUp, setIsSignUp] = useState(false);
  const [IsLogin, setIsLogin] = useState(false);
  const handleSignUp = () => setIsSignUp(true);
  const handleLogin = () => setIsLogin(true);
  const SignUpClose = () => {
    setIsSignUp(!IsSignUp);
  };
  const LoginClose = () => {
    setIsLogin(!IsLogin);
  };

  return (
    <>
      <div className='intro grid-2 display'>
        <div className='description'>
          <img
            className='heading'
            src={require('../../assets/shareEnd.png').default}
            alt=''
            width='130'
          />
          <div style={{ marginTop: '80px', marginRight: '20px' }}>
            <h3
              style={{
                fontSize: '40px',
                fontWeight: 'bold',
                fontFamily: 'Acme',
              }}
            >
              Welcome to{' '}
              <span
                style={{
                  color: '#08ABE2',
                  fontFamily: 'Audiowide',
                  fontSize: '20px',
                }}
              >
                <i className='fas fa-at' style={{ color: '#E78200' }}></i>sharE
                <span style={{ color: '#E78200', fontFamily: 'Audiowide' }}>
                  nd
                </span>
              </span>
            </h3>
            <p>
              Share your idea.Find some interested people.Create a group and
              bring your idea into reality with your teammate.
            </p>
            <button className='btn btn-dark' onClick={handleSignUp}>
              Sign Up
            </button>{' '}
            or
            <button onClick={handleLogin} className='btn btn-danger'>
              Sign In
            </button>
          </div>
        </div>
        <img
          className='right-img'
          src={require('../../assets/team.gif').default}
          alt=''
        />
      </div>
      {IsSignUp && (
        <SignUp
          Open={IsSignUp}
          Close={SignUpClose}
          OpenSignIn={() => {
            setIsSignUp(false);
            setIsLogin(true);
          }}
        />
      )}
      {IsLogin && (
        <Login
          Open={IsLogin}
          Close={LoginClose}
          OpenSignUp={() => {
            setIsSignUp(true);
            setIsLogin(false);
          }}
        />
      )}
    </>
  );
}
