import React, { useState } from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Button from '@material-ui/core/Button';
import history from '../history';
import Container from '@material-ui/core/Container';

const carouselData = [
  { title: 'Zion National Park', state: 'Utah', img: '/home-imgs/ZionNP.jpg' },
  {
    title: 'Grand Canyon National Park',
    state: 'Arizona',
    img: '/home-imgs/GrandCanyonNP.jpg',
  },
  {
    title: 'Acadia National Park',
    state: 'Maine',
    img: '/home-imgs/AcadiaNationalParkME.jpg',
  },
  {
    title: 'Zion National Park',
    state: 'Utah',
    img: '/home-imgs/ZionNationalPark.jpg',
  },
  {
    title: 'Arches National Park',
    state: 'Utah',
    img: '/home-imgs/ArchesNationalParkUtah.jpg',
  },
  {
    title: 'Olympic National Park',
    state: 'Washington',
    img: '/home-imgs/OlympicNationalParkWA.jpg',
  },
  {
    title: 'Yellowstone National Park',
    state: 'Wyoming',
    img: '/home-imgs/YellowstoneNationalParkWY.jpg',
  },
];

function HomeCarousel() {
  const [currImg, setCurrImg] = useState(0);

  return (
    <div className='carousel'>
      <div
        className='carouselInner'
        style={{ backgroundImage: `url(${carouselData[currImg].img})` }}
      >
        <div
          className='left'
          onClick={() => {
            currImg > 0 && setCurrImg(currImg - 1);
          }}
        >
          <ArrowBackIosIcon />
        </div>

        <div className='center'>
          <Container align='center'>
            <Button
              onClick={() => history.push('/all-parks')}
              variant='contained'
              color='primary'
              style={{ margin: '25px', padding: '10px', fontSize: 20 }}
            >
              Explore All Parks
            </Button>
          </Container>
          <h5>{carouselData[currImg].title}</h5>
        </div>
        <div
          className='right'
          onClick={() => {
            currImg < carouselData.length - 1 && setCurrImg(currImg + 1);
          }}
        >
          <ArrowForwardIosIcon />
        </div>
      </div>
    </div>
  );
}

export default HomeCarousel;
