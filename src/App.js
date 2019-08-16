import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { throttle } from 'lodash';
//components
import Home from './pages/Home.jsx';
import MoviePage from './pages/MoviePage.jsx';

import { library } from '@fortawesome/fontawesome-svg-core';
// import {
//   faHumidity
// } from '@fortawesome/pro-duotone-svg-icons';
import { faMapMarkerCheck } from '@fortawesome/pro-solid-svg-icons';
import { faChevronLeft, faChevronRight } from '@fortawesome/pro-regular-svg-icons';
import './App.css';
library.add(
  faMapMarkerCheck,
  faChevronLeft,
  faChevronRight
);

export default function App() {
  const [mobile, setMobile] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  function handleResize(e) {
    const { innerWidth } = e ? e.target : window;
    setWindowWidth(innerWidth);
    if( innerWidth <= 600 ) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }
  const throttledResize = throttle(handleResize, 100, { trailing: false, leading: true })
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
        <Switch>
          <Route exact path='/' render={props => <Home mobile={mobile} windowWidth={windowWidth} {...props} />}/>
          <Route path='/movie/:id' render={props => <MoviePage mobile={mobile} {...props} /> } />
        </Switch>
      </Router>
    </div>
  );
}
