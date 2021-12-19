import React from 'react';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { createMuiTheme } from '@material-ui/core/styles';
import StarRatings from 'react-star-ratings';
import { ThemeProvider } from '@material-ui/styles';
import { useParams } from 'react-router-dom';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#fff',
    },
  },
});


export default function RelatedProjects({Apps}) {
  const { projectID } = useParams([]);
  const getHighestRating=(rates) => {
    let max=0;
    rates.forEach(rate => {
      if(Number(rate.value)>max){
        max=Number(rate.value);
      }
    });

    return max
  }
  return (
    <div>
      <h5 style={{ marginTop: '15px', marginBottom: '20px' }}>
        Similar Projects
      </h5>
      {Apps.map((tile) => tile.id !== projectID?(
        <div
          key={tile.id}
          style={{
            display: 'flex',
            padding: '10px 5px',
            backgroundColor: '#1b1e3c',
            marginBottom: '5px',
          }}
        >
          <img src={tile.appLogo} alt='' width='40' height='40' />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginLeft: '10px',
              width: '100%',
              marginRight: '10px',
            }}
          >
            <div>
              <h5 className='text-short' style={{ marginBottom: '0px' }}>
                {tile.appName}
              </h5>
              <ThemeProvider theme={theme}>
                <ButtonGroup
                  variant='text'
                  aria-label='text primary button group'
                  color='primary'
                  style={{
                    height: '10px',
                    marginBottom: '10px',
                    marginLeft: '-5px',
                  }}
                >
                  <Button
                    style={{
                      fontSize: '10px',
                      color: 'cyan',
                      textTransform: 'none',
                    }}
                    className='text-short'
                  >
                    {tile.groupName}
                  </Button>
                  <Button
                    style={{
                      fontSize: '10px',
                      color: 'white',
                      textTransform: 'none',
                    }}
                  >
                    {tile.appType}
                  </Button>
                  <Button
                    style={{
                      fontSize: '10px',
                      color: 'white',
                      textTransform: 'none',
                    }}
                  >
                    {"Free"}
                  </Button>
                </ButtonGroup>
              </ThemeProvider>
            </div>
            <p>
              <StarRatings
                starRatedColor='yellow'
                rating={getHighestRating(tile.rates)}
                starDimension='15px'
                starSpacing='0px'
                starEmptyColor='rgba(255, 255, 255,0.3)'
              />
            </p>
          </div>
        </div>
      ):<p style={{marginLeft: '10px' }}>No Project Found</p>)}
    </div>
  );
}
