import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom'
import Axios from 'axios';
import { apiURL } from '../support/apiURL';
import {connect} from 'react-redux'
import {loginSuccessAction} from './../redux/actions'

class Login extends Component {
    state={
        loading:false,
        error:''
    }

onLoginClick=()=>{
    var username=this.refs.username.value
    var password=this.refs.password.value
    Axios.get(`${apiURL}user?username=${username}&password=${password}`)
    .then(res=>{
        if(res.data.lenght){
            localStorage.setItem(`user`,res.data[0].id)
        }else{
            this.setState({error:'Password Salah BROK'})
        }
    }).catch((err)=>{
        console.log(err)
    })
}

    render() { 
        if(this.props.authLog){
            return <Redirect to={'/'}/>
        }
        return ( 
            <div>
                <div className='mt-5 d-flex justify-content-center'>
                    <div style={{width:'500px', border:'1px solid #9a9da0'}}>
                        <center><h1 className='mt-3'>Login</h1></center><br/>
                        <div className='p-1 mx-4' style={{borderBottom:'1px solid black'}}>
                            Username : <input type="text" style={{border:'transparent', width:'100%', fontSize:'20px'}} ref='username' placeholder='input your username' />
                        </div><br/>
                        <div className='p-1 mx-4' style={{borderBottom:'1px solid black'}}>
                            Password : <input type="text" style={{border:'transparent', width:'100%',fontSize:'20px'}} ref='password' placeholder='input your Password' />
                        </div>
                        {this.state.error===''?
                            null
                            :
                            <div className='alert alert-danger mt-2 mx-4 p-1'>
                                {this.state.error} <span onClick={()=>this.setState({error:''})} className='float-right font-weight-bold'> x </span>
                            </div>
                        }
                        <div className='mt-4  mx-4'>
                            <button onClick={this.onLoginClick} className='btn btn-primary'>Login</button>
                        </div>
                        <div className='my-4 mx-4'>
                            Belum ada akun ? <Link> Register </Link> aja dulu . . .
                        </div>    
                    </div>
                </div>
            </div>
         );
    }
}

const mapStateToProps=(state)=>{
    return{
        AuthLog:state.auth.Login
    }
}

export default connect (mapStateToProps,{loginSuccessAction}) (Login);
