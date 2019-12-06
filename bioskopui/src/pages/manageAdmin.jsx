import React, { Component } from 'react';

import {
    Table, 
    TableBody, 
    TableHead, 
    TableCell, 
    TableRow,
    TableFooter, 
} from '@material-ui/core'
import Axios from 'axios'
import { apiURL } from '../support/apiURL';
import {
    Modal,
    ModalHeader, 
    ModalBody, 
    ModalFooter
} from 'reactstrap'
import color from '@material-ui/core/colors/amber';


//untuk mengelola data film
class ManageAdmin extends Component {
    state = { 
        dataFilm:[],
        readMoreSelected:-1,
        isOpen:false,
        modalAdd:-1
    }

    componentDidMount(){
        Axios.get(`${apiURL}movies`)
        .then((res)=>{
            this.setState({dataFilm:res.data})
        }).catch((err)=>{
            console.log(err)
        })
    }

    onSaveAddDataClick=()=>{
        var jadwalTemplate=[12,14,16,18,20]
        var jadwal=[]
        for(var i=0 ; i<5 ; i++){
            if(this.refs[`jadwal${i}`].checked){
                jadwal.push(jadwalTemplate[i])
            }
        }
        console.log(jadwal)
        //ini buat looping
        var iniRef=this.refs
        var title= iniRef.title.value
        var image=iniRef.image.value
        var synopsis=iniRef.synopsis.value
        var sutradara=iniRef.sutradara.value
        var genre=iniRef.genre.value
        var durasi=iniRef.durasi.value
        var produksi='RANS ENTERTAINMENT'
        var data={
            title:title,
            image,
            synopsis,
            sutradara,
            genre,
            durasi,
            produksi,
            jadwal
        }
        Axios.post(`${apiURL}movies`,data)
        .then((res)=>{
            console.log(res)
            Axios.post(`${apiURL}movies`)
            .then((res)=>{
                this.setState({dataFilm:res.data})
            }).catch((err)=>{
                console.log(err)
            })
        }).catch((err)=>{
            console.log(err)
        })

    }
    
    splitIni=(a='')=>{
        var b= a.split('').filter((val,index)=>index<=100)
        return b
    }

    renderMovies=()=>{
        return this.state.dataFilm.map((val,index)=>{
            return(
                <TableRow key={index}>
                    <TableCell>{index+1}</TableCell>
                    <TableCell>{val.title}</TableCell>
                    <TableCell><img src={val.image} alt='gambar Film' height="200px"/></TableCell>
                    {   this.state.readMoreSelected===index?
                        <TableCell> 
                            {val.synopsis}
                            <span 
                                onClick={()=>this.setState({readMoreSelected:-1})}
                                color='red '>
                                 Read Less
                            </span>   
                        </TableCell>
                        :
                        <TableCell>
                            {this.splitIni(val.synopsis)}
                            <span onClick={()=>this.setState({readMoreSelected:index})}>
                                 Read More . . .
                            </span>
                        </TableCell>//kekurangan dari readmore ini adala bisanya hanya 1 data
                    }
                    <TableCell>{val.jadwal}</TableCell>
                    <TableCell>{val.sutradara}</TableCell>
                    <TableCell>{val.genre}</TableCell>
                    <TableCell>{val.durasi}</TableCell>
                    <TableCell>
                        <button className='btn btn-primary'> Edit </button>
                        <button className='btn btn-danger'>  Delete </button>
                    </TableCell>
                </TableRow>
            )
        })
    }

    render() { 
        return ( 
            <div className='mx3'>              
                <Modal isOpen={this.state.modalAdd} toggle={()=>this.setState({modalAdd:false})}>
                    <ModalHeader>
                        Add Data
                    </ModalHeader>
                    <ModalBody>
                        <input type="text" ref='title' placeholder='Judul' className='form-control'/>
                        <input type="text" ref='image' placeholder='gambar' className='form-control'/>
                        <input type="textarea" ref='synopsis' placeholder='sinopsis' className='form-control'/>
                        Jadwal : 
                            <input type="checkbox" ref='jadwal0'/> 12.00
                            <input type="checkbox" ref='jadwal1'/> 14.00
                            <input type="checkbox" ref='jadwal2'/> 16.00
                            <input type="checkbox" ref='jadwal3'/> 18.00
                            <input type="checkbox" ref='jadwal4'/> 20.00
                        <input type="text" ref='sutradara' placeholder='sutradara' className='form-control'/>
                        <input type="number" ref='durasi' placeholder='menit' className='form-control'/>
                        <input type="text" ref='genre' placeholder='genre' className='form-control'/>
                    </ModalBody>
                    <ModalFooter>
                        <button onClick={()=>this.onSaveAddDataClick()}> Save</button>
                        <button onClick={()=>this.setState({modalAdd:false})}> Cancel</button>
                    </ModalFooter>
                </Modal>
            {/* </div>
            <div> */}
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <button onClick={()=>this.setState({isOpen:true})}>Add Data</button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>No. </TableCell>
                            <TableCell>Judul </TableCell>
                            <TableCell>Image </TableCell>
                            <TableCell>Sinopsis </TableCell>
                            <TableCell>Jadwal </TableCell>
                            <TableCell>Sutradara </TableCell>
                            <TableCell>Genre </TableCell>
                            <TableCell>Durasi </TableCell>
                            <TableCell>Action </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.renderMovies()}
                    </TableBody>
                </Table>
            </div>
        );
    }
}
 
export default ManageAdmin;