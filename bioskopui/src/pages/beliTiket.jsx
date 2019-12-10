import React, { Component } from 'react';
import {connect} from 'react-redux'

class beliTiket extends Component {
    state = {  }
    render() { 
        console.log(this.props.location.state)
        if(this.props.location.state&&this.props.authLog){
            return ( 
                <div>
                    ini Beli Tiket
                </div>
             );
        }
        return(
            <div>
                404 Not Found
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        authLog:state.auth.login
    }
}
 
export default connect(mapStateToProps) (beliTiket);