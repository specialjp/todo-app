import React, { Component } from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import TodoPage from './pages/Todo'
import DefaultLayout from './Layout/DefaultLayout'

import './App.css'

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <DefaultLayout>
          <Switch>
            <Route path="/" exact component={TodoPage} />
          </Switch>
        </DefaultLayout>
      </BrowserRouter>
    )
  }
}

export default App
