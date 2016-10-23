import React from 'react';
import { Route, Link } from 'react-router-dom'
import Quiz from '../quiz'
import About from '../about'

export default () => (
  <div>
    <header>
      <Link to="/">Quiz</Link>
      <Link to="/about-us">About</Link>
    </header>

    <main>
      <Route exact path="/" component={Quiz} />
      <Route exact path="/about-us" component={About} />
    </main>
  </div>
)