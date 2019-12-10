import React, { Component } from 'react';

import {
    Table, 
    TableBody, 
    TableHead, 
    TableCell, 
    TableRow,
} from '@material-ui/core'
import Axios from 'axios'
import { apiURL } from '../support/apiURL';
import {
    Modal,
    ModalHeader, 
    ModalBody, 
    ModalFooter
} from 'reactstrap'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const MySwal = withReactContent(Swal)

//untuk mengelola data film
class ManageAdmin extends Component {
    state = { 
        dataFilm:[],
        readMoreSelected:-1,
        modalAdd:false,
        modalEdit:false,
        indexEdit:0,
        jadwal:[12,14,16,18,20]
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
        for(var i=0 ; i<jadwalTemplate.length ; i++){
            if(this.refs[`jadwal${i}`].checked){
                jadwal.push(jadwalTemplate[i])
            }
        }
        console.log("Masuk SaveAddDataClik")
        console.log(jadwal)
        //ini buat looping
        var iniRef=this.refs
        var title= iniRef.title.value
        var image=iniRef.image.value
        var synopsis=iniRef.synopsis.value
        var sutradara=iniRef.sutradara.value
        var genre=iniRef.genre.value
        var durasi=iniRef.durasi.value
        var trailer=iniRef.trailer.value
        var studioID=iniRef.studioID
        var produksi='RANS ENTERTAINMENT'
        var data={
            title:title,
            image,
            synopsis,
            sutradara,
            genre,
            durasi,
            trailer,
            studioID,
            produksi,
            jadwal
        }
        Axios.post(`${apiURL}movies/`,data)
        .then((res)=>{
            console.log(res)
            Axios.get(`${apiURL}movies/`)
            .then((res)=>{
                this.setState({dataFilm:res.data, modalAdd:false})
            }).catch((err)=>{
                console.log(err)
            })
        }).catch((err)=>{
            console.log(err)
        })

    }
    
    onDeleteDataClick=(index)=>{
        MySwal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                var data=this.state.data
                data.splice(index,1)
                MySwal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                this.setState(
                    {data:data}
                )
            }else if(
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ){
                MySwal.fire(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                )
            }
        })
    }

    onUpdateDataClick=()=>{
        var jadwalTemplate=this.state.jadwal
        var jadwal=[]
        var id= this.state.dataFilm[this.state.indexEdit].id
        for(var i=0 ; i<jadwalTemplate.length ; i++){
            if(this.refs[`editJadwal${i}`].checked){
                jadwal.push(jadwalTemplate[i])
            }
        }
        console.log("Masuk UpdateData")
        console.log(jadwal)
        //ini buat looping
        var iniRef=this.refs
        var title= iniRef.editTitle.value
        var image=iniRef.editImage.value
        var synopsis=iniRef.editSynopsis.value
        var sutradara=iniRef.editSutradara.value
        var genre=iniRef.editGenre.value
        var durasi=iniRef.editDurasi.value
        var trailer=iniRef.editTrailer.value
        var studioID=iniRef.editStudio.value
        var produksi='RANS ENTERTAINMENT'
        var data={
            title:title,
            image,
            synopsis,
            sutradara,
            genre,
            durasi,
            trailer,
            studioID,
            produksi,
            jadwal
        }
        console.log(id)
        Axios.put(`${apiURL}movies/${id}`,data)
        .then(()=>{
            Axios.get(`${apiURL}movies/`)
            .then((res)=>{
                this.setState({dataFilm:res.data, modalEdit:false})
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
                    <TableCell style={{textAlign:"center"}}>{index+1}</TableCell>
                    <TableCell style={{textAlign:"center"}}>{val.title}</TableCell>
                    <TableCell style={{textAlign:"center"}}><img src={val.image} alt='gambar Film' height="200px"/></TableCell>
                    {   this.state.readMoreSelected===index?
                        <TableCell style={{width:'300px'}}> 
                            {val.synopsis}
                            <span 
                                onClick={()=>this.setState({readMoreSelected:-1})}
                                style={{color:'red'}} >
                                 Read Less
                            </span>   
                        </TableCell>
                        :
                        <TableCell style={{width:'300px'}}>
                            {this.splitIni(val.synopsis)}
                            <span onClick={()=>this.setState({readMoreSelected:index})}
                            style={{color:'red'}}>
                                 Read More . . .
                            </span>
                        </TableCell>//kekurangan dari readmore ini adala bisanya hanya 1 data
                    }
                    <TableCell style={{textAlign:"center"}}>{val.jadwal+','}</TableCell>
                    <TableCell style={{textAlign:"center"}}>{val.studioID}</TableCell>
                    <TableCell style={{textAlign:"center"}}>{val.sutradara}</TableCell>
                    <TableCell style={{textAlign:"center"}}>{val.genre}</TableCell>
                    <TableCell style={{textAlign:"center"}}>{val.durasi}</TableCell>
                    <TableCell >
                        <button className='btn btn-primary my-2 mr-1' onClick={()=>this.setState({modalEdit:true, indexEdit:index})}> Edit </button>
                        <button className='btn btn-danger' onClick={()=>this.onDeleteDataClick(index)}>  Delete </button>
                    </TableCell>
                </TableRow>
            )
        })
    }

    renderAddCheckBox=()=>{
        return this.state.jadwal.map((val,index)=>{
            return (
             <div>
                    <input type="checkbox" ref={`jadwal${index}`}/>
                    <span className='mr-2'>{val}.00</span>
                </div>   
            )
                
        })
    }

    renderEditCheckBox=(indexEdit)=>{
        var indexArr=[]
        var dataFilmEdit=this.state.dataFilm[indexEdit].jadwal
        console.log(dataFilmEdit)
        // console.log(this.state.jadwal.indexOf(dataFilmEdit[2]))
        // dataFilmEdit.forEach((val)=>{
        //     indexArr.push(this.state.jadwal.indexOf(val))
        // })
        for(var i=0; i<dataFilmEdit.length;i++){
            for(var j=0 ; j<this.state.jadwal.length; j++){
                if(dataFilmEdit[i]===this.state.jadwal[j]){
                    indexArr.push(j)
                }
            }
        }
        console.log(indexArr)
        var checkBox=this.state.jadwal
        var checkBoxNew=[]
            checkBox.forEach((val)=>{
                checkBoxNew.push({jam:val, tampilEdit:false})
        })
        indexArr.forEach((val)=>{
            checkBoxNew[val].tampilEdit=true
        })
        return checkBoxNew.map((val,index)=>{
            if(val.tampilEdit){
                return(
                    <div key={index}>
                        <input type="checkbox" defaultChecked ref={`editJadwal${index}`} value={val.jam}/>
                        <span className='mr-2'>{val.jam}.00  </span>
                    </div>
                )
            }else{
                return (
                    <div key={index}>
                        <input type="checkbox"  ref={`editJadwal${index}`} value={val.jam}/>
                        <span className='mr-2'>{val.jam}.00  </span>
                    </div>
                )
            }
        })
    }
    render() { 
        const {dataFilm, indexEdit}=this.state
        const {length}=dataFilm
        if(length===0){
            return <div>Loading . . .</div>
        }
        return ( 
            <div className='mx-3'>              
                <Modal isOpen={this.state.modalEdit} toggle={()=>this.setState({modalEdit:false})}>
                    <ModalHeader>
                        Edit Data {dataFilm[indexEdit].title}
                    </ModalHeader>
                    <ModalBody>
                        Judul : <input type="text" ref='editTitle' defaultValue={dataFilm[indexEdit].title} placeholder='Judul' className='form-control mt-2'/>
                        Image : <input type="text" ref='editImage' defaultValue={dataFilm[indexEdit].image} placeholder='gambar' className='form-control mt-2'/>
                        Sinopsis : <textarea rows='5' ref='editSynopsis' defaultValue={dataFilm[indexEdit].synopsis} placeholder='sinopsis' className='form-control mt-2'/>
                        Jadwal : 
                        <div className='d-flex'>
                            {this.renderEditCheckBox(indexEdit)}
                        </div>
                        Trailer : <input type="text" ref='editTrailer' defaultValue={dataFilm[indexEdit].trailer} placeholder='trailer' className='form-control mt-2'/>
                        Studio : <select ref='editStudio' className='form-control'>
                            <option value="1"> Studio 1</option>
                            <option value="2"> Studio 2</option>
                            <option value="3"> Studio 3</option>
                        </select>
                        Sutradara : <input type="text" ref='editSutradara' defaultValue={dataFilm[indexEdit].sutradara} placeholder='sutradara' className='form-control mt-2'/>
                        Durasi : <input type="number" ref='editDurasi' defaultValue={dataFilm[indexEdit].durasi} placeholder='menit' className='form-control mt-2'/>
                        Genre : <input type="text" ref='editGenre' defaultValue={dataFilm[indexEdit].genre} placeholder='genre' className='form-control mt-2'/>
                    </ModalBody>
                    <ModalFooter>
                        <button onClick={this.onUpdateDataClick} className='btn btn-primary'> Save </button>
                        <button onClick={()=>this.setState({modalEdit:false})} className="btn btn-danger"> Cancel</button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.modalAdd} toggle={()=>this.setState({modalAdd:false})}>
                    <ModalHeader>
                        Add Data
                    </ModalHeader>
                    <ModalBody>
                        Judul : <input type="text" ref='title' placeholder='Judul' className='form-control mt-2'/>
                        Image : <input type="text" ref='image' placeholder='gambar <source code>' className='form-control mt-2'/>
                        Synopsis :<input type='textarea' ref='synopsis' placeholder='sinopsis' className='form-control mt-2 mb-2'/>
                        Jadwal : 
                        <div className='d-flex'>
                            {this.renderAddCheckBox()}
                        </div>
                        Trailer : <input type="text" ref='trailer' placeholder='trailer <source code>' className='form-control mt-2'/>
                        Studio : <select ref='studio' className='form-control'>
                            <option value="1"> Studio 1</option>
                            <option value="2"> Studio 2</option>
                            <option value="3"> Studio 3</option>
                        </select>
                        Sutradara : <input type="text" ref='sutradara' placeholder='sutradara' className='form-control mt-2'/>
                        Durasi : <input type="number" ref='durasi' placeholder='dalam menit' className='form-control mt-2'/>
                        Genre : <input type="text" ref='genre' placeholder='genre' className='form-control mt-2'/>
                    </ModalBody>
                    <ModalFooter>
                        <button onClick={this.onSaveAddDataClick}> Save</button>
                        <button onClick={()=>this.setState({modalAdd:false})}> Cancel</button>
                    </ModalFooter>
                </Modal>
            {/* </div>
            <div> */}
                {/* <Fade> */}
                    <Table size='small'>
                        <TableHead>
                            <TableRow>
                                <TableCell colSpan='10' style={{textAlign:"right"}}>
                                    <input className='mr-4 ' type="text" placeholder='Cari Film'/>
                                    <button className='btn btn-success' onClick={()=>this.setState({modalAdd:true})}>New Film</button>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>No. </TableCell>
                                <TableCell style={{textAlign:"center"}}>Judul </TableCell>
                                <TableCell style={{textAlign:"center"}}>Image </TableCell>
                                <TableCell style={{textAlign:"center"}}>Sinopsis </TableCell>
                                <TableCell style={{textAlign:"center"}}>Jadwal </TableCell>
                                <TableCell style={{textAlign:"center"}}>Studio </TableCell>
                                <TableCell style={{textAlign:"center"}}>Sutradara </TableCell>
                                <TableCell style={{textAlign:"center"}}>Genre </TableCell>
                                <TableCell style={{textAlign:"center"}}>Durasi </TableCell>
                                <TableCell style={{textAlign:"center"}}>Action </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.renderMovies()}
                        </TableBody>
                    </Table>
                {/* </Fade>        */}
            </div>
        );
    }
}
 
export default ManageAdmin;