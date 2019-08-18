import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { throttle } from 'lodash';
//components
import Home from './pages/Home.jsx';
import MoviePage from './pages/MoviePage.jsx';
import AppHeader from './components/AppHeader.jsx';
import Search from './pages/Search.jsx';
import Footer from './components/Footer.jsx';
import { library } from '@fortawesome/fontawesome-svg-core';
// import {
//   faHumidity
// } from '@fortawesome/pro-duotone-svg-icons';
import { faMapMarkerCheck } from '@fortawesome/pro-solid-svg-icons';
import { faChevronLeft, faChevronRight, faFilm, faHandPointer, faSearch } from '@fortawesome/pro-regular-svg-icons';
import { faArrowCircleRight, faArrowCircleLeft, faPopcorn, faThumbsUp, faRoute, faTicketAlt, faChevronUp, faChevronDown, faUsdCircle } from '@fortawesome/pro-light-svg-icons';
import './App.css';
library.add(
  faMapMarkerCheck,
  faChevronLeft,
  faChevronRight,
  faFilm,
  faHandPointer,
  faSearch,
  faArrowCircleRight,
  faArrowCircleLeft, 
  faPopcorn, 
  faThumbsUp,
  faRoute,
  faTicketAlt,
  faChevronUp, 
  faChevronDown,
  faUsdCircle
);

export default function App() {
  const [mobile, setMobile] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [scrollPos, setScrollPos] = useState(0);
  const colors = ['#1D1A31', '#B9CDDA', '#F1F2EB', '#A6D8D4'];
  function handleResize(e) {
    const { innerWidth } = e ? e.target : window;
    setWindowWidth(innerWidth);
    if (innerWidth <= 600) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }

  function handleScroll(e) {
    const { pageYOffset } =  window;
    setScrollPos(pageYOffset);
  }

  const throttledResize = throttle(handleResize, 100, { trailing: false, leading: true });
  const throttledScroll = throttle(handleScroll, 100, { trailing: false, leading: true });

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', throttledResize);
    window.addEventListener('scroll', throttledScroll)
    return () => {
      window.removeEventListener('resize', throttledResize);
      window.removeEventListener('resize', throttledScroll);
    }
  }, [])

  return (
    <div className='App'>
      <Router>
        <AppHeader mobile={mobile} />
        <Switch>
          <Route exact path='/' render={props => 
            <Home 
              colors={colors}
              mobile={mobile} 
              windowWidth={windowWidth} 
              {...props} />} />
          <Route path='/movie/:id' render={props => 
            <MoviePage 
              colors={colors}
              mobile={mobile} 
              windowWidth={windowWidth} 
              scrollPos={scrollPos}
              {...props} />} />
          <Route path='/search' render={props => 
            <Search 
              colors={colors}
              mobile={mobile} 
              {...props} />} />
        </Switch>
        <Footer colors={colors} />
      </Router>
    </div>
  );
}
