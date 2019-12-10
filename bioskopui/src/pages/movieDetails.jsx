import React, { Component } from 'react';
import Axios from 'axios';
import { apiURL } from '../support/apiURL';
import {
    Modal,
    ModalBody,
    ModalFooter
} from 'reactstrap'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'



class movieDetail extends Component {
    state = {
        dataDetailFilm:{},
        trailerOpen:false,
        notLoginYet:false,
        keLogin:false,
        beliTiketOk:false
    }

    componentDidMount(){
        Axios.get(`${apiURL}movies/${this.props.match.params.id}`)
        .then(res=>{
            console.log(res.data)
            {this.setState({dataDetailFilm:res.data})}
        }).catch((err)=>{
            console.log(err)
        })
    }

    onBeliTiketClick=()=>{
        if(this.props.authLog){
            this.setState({beliTiketOk:true})
        }else{
            this.setState({notLoginYet:true})
        }
    }

    render() { 
        if(this.state.keLogin){
            return <Redirect to={'/login'}/>
        }
        if(this.state.beliTiketOk){
            return <Redirect to={{pathname:'/beliTiket',state:this.state.dataDetailFilm}}/>
        }
        // console.log(this.props.location.split('/')[2]) //untuk mendapatkan angka 3 (indeks movie)
        // console.log(this.props.match.params.id) //untuk mendapatkan angka 3 (indeks movie) , setelah berhasil, kita letakkan di componentdiMount
        return ( 
            <div>
                <Modal isOpen={this.state.trailerOpen} size='lg' toggle={()=>this.setState({trailerOpen:false})} contentClassName='trailer'>
                    <ModalBody className='p-0 bg-transparent'>
                        <iframe width="100%" title={this.state.dataDetailFilm.title} height="100%" src={this.state.dataDetailFilm.trailer} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </ModalBody>
                </Modal>
                <Modal isOpen={this.state.notLoginYet} centered toggle={()=>this.setState({notLoginYet:false})}>
                    <ModalBody>
                        anda belum bisa login , kalo mau , login dulu cuk
                    </ModalBody>
                    <ModalFooter>
                        <button className='btn btn-danger' onClick={()=>this.setState({notLoginYet:false})}>Cancel</button>
                        <button className='btn btn-primary' onClick={()=>this.setState({keLogin:true})}>Login</button>
                    </ModalFooter>
                </Modal>
                <div className='row p-3 mx-3 my-4'>
                    <div className='col-md-4'>
                        <img src={this.state.dataDetailFilm.image} height='400' alt="film"/>
                        <div className='mt-3' style={{fontSize:'30px'}}>
                            {this.state.dataDetailFilm.title}
                        </div>
                    </div>
                    <div className='col-md-2'>
                        <div className='mt-1'>
                            Title <span className='ml-4'>:</span>
                        </div>
                        <div className='mt-1'>
                            Sinopsis <span className='ml-2'>:</span>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className='mt-1'>
                            {this.state.dataDetailFilm.title}
                        </div>
                        <div className='mt-1'>
                            {this.state.dataDetailFilm.synopsis}
                        </div>
                        <div className='mt-3'>
                            <button className='mr-3 btn btn-primary' onClick={this.onBeliTiketClick}> Beli Tiket</button>
                            <button className='btn btn-outline-warning' onClick={()=>this.setState({trailerOpen:true})}>  Trailer</button>
                        </div>
                    </div>
                </div>
                {/* <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>

                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table> */}
                {/* <div className='row'>
                    <div className='col'>

                    </div>

                </div> */}
            </div>
         );
    }
}

const mapStateToProps=(state)=>{
    return{
        authLog:state.auth.login
    }
}
 
export default connect(mapStateToProps) (movieDetail);