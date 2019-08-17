import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { throttle } from 'lodash';
//components
import Home from './pages/Home.jsx';
import MoviePage from './pages/MoviePage.jsx';
import AppHeader from './components/AppHeader.jsx';
import Search from './pages/Search.jsx';
import { library } from '@fortawesome/fontawesome-svg-core';
// import {
//   faHumidity
// } from '@fortawesome/pro-duotone-svg-icons';
import { faMapMarkerCheck } from '@fortawesome/pro-solid-svg-icons';
import { faChevronLeft, faChevronRight, faFilm, faHandPointer, faSearch } from '@fortawesome/pro-regular-svg-icons';
import { faArrowCircleRight, faArrowCircleLeft } from '@fortawesome/pro-light-svg-icons';
import './App.css';
library.add(
  faMapMarkerCheck,
  faChevronLeft,
  faChevronRight,
  faFilm,
  faHandPointer,
  faSearch,
  faArrowCircleRight,
  faArrowCircleLeft 
);

export default function App() {
  const [mobile, setMobile] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [searching, setSearching] = useState(false);
  function handleResize(e) {
    const { innerWidth } = e ? e.target : window;
    setWindowWidth(innerWidth);
    if (innerWidth <= 600) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }
  const throttledResize = throttle(handleResize, 100, { trailing: false, leading: true });

  function handleSubmit(e) {
    e.preventDefault();
    setSearching(true);
  }

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', throttledResize);
    return () => {
      window.removeEventListener('resize', throttledResize);
    }
  }, [])

  return (
    <div className='App'>
      <Router>
        <AppHeader 
          handleSubmit={handleSubmit}
          searching={searching} />
        <Switch>
          <Route exact path='/' render={props => 
            <Home 
              mobile={mobile} 
              windowWidth={windowWidth} 
              {...props} />} />
          <Route path='/movie/:id' render={props => 
            <MoviePage 
              mobile={mobile} 
              windowWidth={windowWidth} 
              {...props} />} />
          <Route path='/search' render={props => 
            <Search 
              mobile={mobile} 
              searching={searching}
              setSearching={setSearching}
              {...props} />} />
        </Switch>
      </Router>
    </div>
  );
}
