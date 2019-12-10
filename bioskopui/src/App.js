import React,{Component} from 'react';
import Header from './components/header'
import Home from './pages/home'
import './App.css';
import {Switch,Route} from 'react-router-dom'
import ManageAdmin from './pages/manageAdmin'
import movieDetails from './pages/movieDetails'
import beliTiket from './pages/beliTiket'
import Login from './pages/login'
import {connect} from 'react-redux'
import {loginSuccessAction} from './redux/actions'
import Axios from 'axios';
import { apiURL } from './support/apiURL';

class App extends Component {
  state = { 
    loading:true
  }

  componentDidMount(){
    var id=localStorage.getItem('user')
    Axios.get(`${apiURL}user/${id}`)
    .then((res)=>{
      this.props.loginSuccessAction(res.data)
      this.setState({loading:false})
    }).catch((err)=>{
      console.log(err)
    })
  }

  render() { 
    // if(this.state.loading){
    //   return <div> Loading . . .</div>
    // }
    return ( 
      <div>
        <Header/>
        <Switch>
          <Route path={'/'} exact>
            <Home/>
          </Route>
          <Route path={'/manageAdmin'} exact component={ManageAdmin}/>
          <Route path={'/movieDetails/:id'} exact component={movieDetails}/>
          <Route path={'/beliTiket'} exact component={beliTiket}/>
          <Route path={'/Login'} exact component={Login}/>
        </Switch>
   </div>
     );
  }
}

const mapStateToProps=(state)=>{
  return{
    authLog:state.auth.login
  }
}
 
export default connect(mapStateToProps,{loginSuccessAction}) (App)  

