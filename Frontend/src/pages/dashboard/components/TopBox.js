import React from 'react';

import img from '../../../assets/people/a4.jpg';
import img1 from '../../../assets/people/a5.jpg';
import img2 from '../../../assets/people/a7.jpg';
import TopPersion from './TopPersion';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

const topPersion = [
  {
    id: '1',
    name: 'Rabi Islam',
    followers: '253K',
    img: img,
  },
  {
    id: '2',
    name: 'Zhalok Rahman',
    followers: '3.1M',
    img: img1,
  },
  {
    id: '3',
    name: 'Sojib Morshed',
    followers: '7.6M',
    img: img2,
  },
  {
    id: '4',
    name: 'Sojib Morshed',
    followers: '7.6M',
    img: img2,
  },
  {
    id: '5',
    name: 'Sojib Morshed',
    followers: '7.6M',
    img: img2,
  },
];
export default function TopBox() {
  return (
      <div className='grid'>
      {topPersion.map((person) => (
        <TopPersion
          img={person.img}
          name={person.name}
          followers={person.followers}
        />
      ))}
      <button
        className='btn btn-success'
        style={{ position: 'absolute', marginRight: '-20px',borderRadius:'50px',textAlign:'center' }}
      >
        <i class='fas fa-arrow-right'></i>
      </button>
    </div>
  );
}
