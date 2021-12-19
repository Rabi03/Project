import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { CardActions } from '@material-ui/core';
import LoadingOverlay from 'react-loading-overlay';
import pic from '../../assets/people/a5.jpg'

export default function SavedInfo({ image, video }) {
  const Text =
    'This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels';
  return (
    <Card
      style={{
        display: 'flex',
        marginRight: '50px',
        backgroundColor: '#1B1E3F',
        marginBottom: '10px',
      }}
    >
      {image && (
        <img
          src={image}
          alt=''
          style={{ height: '161px', width: '200px', objectFit: 'cover' }}
        />
      )}
          {video && (
        <div style={{ cursor: 'pointer',position:'relative' }}>
          <img
            src={video}
            alt=''
            style={{ height: '161px', width: '200px', objectFit: 'cover',filter:'brightness(75%)' }}
          />
          <i
            class='far fa-play-circle'
            style={{
              color: 'white',
              position: 'absolute',
              top: '55px',
              left: '75px',
              fontSize: '50px',
            }}
          ></i>
        </div>
      )}

      <div>
        <CardContent>
          <Typography component='h6' variant='h6' style={{ color: 'white' }}>
            {Text.substr(0, 135) + '.....'}
          </Typography>
          <div style={{display:'flex',justifyContent:'flex-start',alignItems:'center',color:'rgba(255,255,255,0.6)'}}>
          <img src={pic} alt='' className='rounded-circle' width='22' style={{marginRight:'8px'}} /> saved from <span style={{fontSize:'15px',color:'cyan',marginLeft:'4px'}}>Rabi Islam</span>
          </div>
        </CardContent>
        <CardActions>
          <button
            style={{
              backgroundColor: 'rgba(0,0,0,.34)',
              border: '0px',
              borderRadius: '5px',
              width: '30%',
              padding: '6px 8px',
              textAlign: 'center',
              color: 'white',
            }}
          >
            View The Post
          </button>
          <button
            style={{
              backgroundColor: 'rgba(0,0,0,.34)',
              border: '0px',
              borderRadius: '5px',
              width: '10%',
              padding: '4.5px 10px',
              fontSize: '15px',
              color: 'white',
            }}
          >
            <i class='fas fa-share'></i>
          </button>
          <button
            style={{
              backgroundColor: 'rgba(0,0,0,.24)',
              border: '0px',
              borderRadius: '5px',
              width: '10%',
              padding: '4.5px 10px',
              fontSize: '15px',
              color: 'white',
            }}
          >
            <i class='fas fa-trash'></i>
          </button>
        </CardActions>
      </div>
    </Card>
  );
}
