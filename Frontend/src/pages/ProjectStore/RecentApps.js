import React,{useState,useEffect} from 'react';
import StarRatings from 'react-star-ratings';
import { Row, Col } from 'reactstrap';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#fff',
    },
  },
});

const tileData = [
  {
    id: '1',
    img: 'https://img.icons8.com/color/48/000000/tumblr.png',
    title: 'Tumblr',
    team: 'Team CodeX',
    rating: 4.5,
    type: 'Web',
    cost: 'Free',
  },
  {
    id: '2',
    img: 'https://img.icons8.com/ios-filled/50/000000/viadeo.png',
    title: 'Viadeo',
    team: 'Programmers Community',
    rating: 4.1,
    type: 'Android',
    cost: 'Free',
  },
  {
    id: '3',
    img: 'https://img.icons8.com/color/48/000000/vk-circled.png',
    title: 'Vikend',
    team: 'Team Extractor',
    rating: 3.8,
    type: 'IOS',
    cost: '$ 51',
  },
  {
    id: '4',
    img: 'https://img.icons8.com/color/48/000000/reddit.png',
    title: 'Reddit',
    team: 'Reddit Org.',
    rating: 4.8,
    type: 'Web',
    cost: '$ 6',
  },
  {
    id: '5',
    img: 'https://img.icons8.com/fluent/48/000000/devianart.png',
    title: 'DevianArt',
    team: 'DevianArt Org.',
    rating: 3.5,
    type: 'Web',
    cost: 'Free',
  },
  {
    id: '6',
    img: 'https://img.icons8.com/color/48/000000/triller-app.png',
    title: 'Triller App',
    team: 'FunAcademia Commmunity',
    rating: 3.5,
    type: 'Web',
    cost: 'Free',
  },
];

export default function RecentApps({apps,history}) {
  const [newApps,setNewApps]=useState(apps)
  useEffect(() => {
    const filterApps=newApps.filter(app =>{
      const d1=new Date().getTime();
      const d2=new Date(app.createdAt).getTime();
      var Difference_In_Time = d1 - d2;
      var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      if(Difference_In_Days>2) return true;
      else return false
    })
    setNewApps(filterApps)
  },[])
  return (
    <>
    {newApps.length>0&& <h4 style={{ marginBottom: '15px', marginTop: '15px' }}>
        Recent release apps
      </h4>}
    <div style={{ marginBottom: '10px' }}>
      <Row>
        {newApps.map((tile,index) => (
          <Col
          key={index}
            sm={12} md={6} lg={2} xl={2} xs={2}
            style={{
              marginRight: '5px',
              marginBottom: '15px',
              cursor: 'poniter',
            }}
          >
            <div
              className='card'
              style={{
                width: '11rem',
                backgroundColor: 'rgba(26, 28, 59,0.4)',
                border: '0px',
                boxShadow: '4px 4px rgba(2,2,2,0.2)',
              }}
            >
              <div className='card-body'
                style={{ cursor: "pointer" }}
              onClick={() => history.push(`store/${tile.id}`)}
              >
                <img
                  className='center-element'
                  src={tile.appLogo}
                  alt='...'
                  width='50'
                  height='50'
                />
                <h5
                  className='card-title text-short'
                  style={{
                    fontSize: '17px',
                    textAlign: 'center',
                    margin: '0px',
                    marginTop: '5px',
                    marginBottom: '5px',
                  }}
                >
                  {tile.appName}
                </h5>
                <p
                  className='card-text text-short'
                  style={{
                    fontSize: '10px',
                    textAlign: 'center',
                    margin: '0px',
                    marginBottom: '5px',
                  }}
                >
                  {tile.groupName}
                </p>
                <p style={{ textAlign: 'center' }}>
                  <StarRatings
                    starRatedColor='yellow'
                    rating={apps[tile]?.rates.length>0? Number(apps[tile].rates[0].value):0}
                    starDimension='15px'
                    starSpacing='0px'
                    starEmptyColor='rgba(255, 255, 255,0.3)'
                  />
                </p>
              </div>
              <ThemeProvider theme={theme}>
                <ButtonGroup
                  variant='text'
                  aria-label='text primary button group'
                  color='primary'
                  style={{
                    height: '10px',
                    justifyContent: 'flex-end',
                    marginBottom: '10px',
                  }}
                >
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
                    {'Free'}
                  </Button>
                </ButtonGroup>
              </ThemeProvider>
            </div>
          </Col>
        ))}
      </Row>
    </div>
    </>
  );
}
