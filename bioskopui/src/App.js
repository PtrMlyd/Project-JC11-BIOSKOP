import React from 'react';
import Header from './components/header'
import Home from './pages/home'
import './App.css';
import {Switch,Route} from 'react-router-dom'
import ManageAdmin from './pages/manageAdmin'
import Login from './pages/login'

class App extends Component {
  state = {  }
  render() { 
    return ( 
      <div>
        <Header/>
        <Switch>
          <Route path={'/'} exact>
            <Home/>
          </Route>
          <Route path={'/manageAdmin'} exact>
            <ManageAdmin/>
          </Route>
          <Route path={'/Login'} exact exact >
            <Login/>
          </Route>
        </Switch>
   </div>
     );
  }
}
 
export default App  

