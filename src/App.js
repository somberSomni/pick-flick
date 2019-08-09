import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
//components
import Home from './pages/Home.jsx';
import MoviePage from './pages/MoviePage.jsx';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faHumidity
} from '@fortawesome/pro-duotone-svg-icons';
import { faMapMarkerCheck } from '@fortawesome/pro-solid-svg-icons';
import { faCircle, faTimes } from '@fortawesome/pro-regular-svg-icons';
import './App.css';
library.add(
  faMapMarkerCheck
);

export default function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/movie/:id' component={MoviePage}/>
        </Switch>
      </Router>
    </div>
  );
}
