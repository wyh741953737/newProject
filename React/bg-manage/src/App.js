import React, { Component } from 'react';
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom'
import Admin from './pages/admin/admin'
import Login from './pages/login/login'

class App extends Component {
  render() {
    return(
      <BrowserRouter>
        <Switch>
          <Route path='/login' component={Login}></Route>
          <Route path='/admin' component={Admin}></Route>
          <Redirect to='/login'></Redirect>
        </Switch>
      </BrowserRouter>
    ) 
  }
}

export default App;
