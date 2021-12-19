import React from 'react';
import StarRatings from 'react-star-ratings';
import { useHistory } from 'react-router-dom';

const tileData = [
  {
    id: '1',
    img: 'https://img.icons8.com/cute-clipart/64/000000/weixing.png',
    title: 'WeChat',
    team: 'Team CodeX',
    rating: 4.5,
  },
  {
    id: '2',
    img: 'https://img.icons8.com/fluent/48/000000/telegram-app.png',
    title: 'Paperfly',
    team: 'Lazy Programmers',
    rating: 4.1,
  },
  {
    id: '3',
    img: 'https://img.icons8.com/fluent/48/000000/signal-app.png',
    title: 'Signal',
    team: 'Programminds',
    rating: 3.8,
  },
  {
    id: '4',
    img: 'https://img.icons8.com/fluent/48/000000/discord-new-logo.png',
    title: 'Discord',
    team: 'Coding Ninja',
    rating: 4.8,
  },
  {
    id: '5',
    img: 'https://img.icons8.com/nolan/64/duolingo-logo.png',
    title: 'Duolingo',
    team: 'Team Solo',
    rating: 3.5,
  },
];

export default function TopProducts() {
  const history = useHistory();

  return (
    <div className='grid'>
      {tileData.map((tile, index) => (
        <div
          key={index}
          className='card'
          style={{
            width: '11rem',
            backgroundColor: 'rgba(26, 28, 59,0.4)',
            border: '0px',
            boxShadow: '4px 4px rgba(2,2,2,0.2)',
            //   marginLeft:'10px'
          }}
        >
          <div className='card-body'>
            <img
              className='center-element'
              src={tile.img}
              alt='...'
              width='50'
              height='50'
            />
            <h5
              className='card-title'
              style={{
                fontSize: '17px',
                textAlign: 'center',
                margin: '0px',
                marginTop: '5px',
                marginBottom: '5px',
              }}
            >
              {tile.title}
            </h5>
            <p
              className='card-text'
              style={{
                fontSize: '10px',
                textAlign: 'center',
                margin: '0px',
                marginBottom: '5px',
              }}
            >
              {tile.team}
            </p>
            <p style={{ textAlign: 'center' }}>
              <StarRatings
                starRatedColor='yellow'
                rating={tile.rating}
                starDimension='15px'
                starSpacing='0px'
                starEmptyColor='rgb(18, 20, 43)'
              />
            </p>
          </div>
        </div>
      ))}
      <button
        className='btn btn-success'
        style={{
          position: 'absolute',
          borderRadius: '50px',
          textAlign: 'center',
          right: '0',
        }}
        onClick={() => history.push('/store')}
      >
        <i class='fas fa-arrow-right'></i>
      </button>
    </div>
  );
}
