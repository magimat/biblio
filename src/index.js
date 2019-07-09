import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'

import EleveMain from './components/EleveMain'
import ProfMain from './components/ProfMain'
import MainMenu from './components/MainMenu'

const routing = (
    <Router>
      <div>
        <Route exact path="/" component={MainMenu} />
        <Route path="/eleve" component={EleveMain} />
        <Route path="/prof" component={ProfMain} />
      </div>
    </Router>
  )

ReactDOM.render(routing, document.getElementById('root'))