import React from 'react';
import moment from 'moment';
import * as Constant from '../../_helpers/constant';
import swal from 'sweetalert';
import { NavLink } from 'react-router-dom';

let token = localStorage.getItem('token');
class EmployeeForm extends React.Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);

        this.state = {
            isLoading: true,
            kode:'',
            nama:'',
            alamat:'',
            tglLahir: moment('', moment.ISO_8601), 
            telp:'',
            email:'',
            password:'',
            foto:'',
            idStatus: '',
            unit: '',
            posisi: '',
            tipeUser: '',
            getUnit:[],
            getPosisi:[],
            getTipeUser:[],
            error: null
        }
    }

    fetchUnit() {
        fetch(Constant.API_LIVE + '/unit',{
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        .then(response => response.json())
        .then(data =>
            this.setState({
                getUnit: data,
                unit: data[0].id,
                isLoading: false,
            })
        )
        .catch(error => this.setState({ error, isLoading: false }));         /* fetch Method GET */
    }

    fetchPosisi() {
        fetch(Constant.API_LIVE + '/posisi',{
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        .then(response => response.json())
        .then(data =>
            this.setState({
                getPosisi: data,
                posisi: data[0].id,
                isLoading: false,
            })
        )
        .catch(error => this.setState({ error, isLoading: false }));         /* fetch Method GET */
    }

    fetchTipeUser() {
        const tipe = {
            tipe: 'Super Admin'
        }
        fetch(Constant.API_LIVE + `/tipeuser/filter`,{
            method: 'POST',
            body: JSON.stringify(tipe),
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        .then(response => response.json())
        .then(data =>
            this.setState({
                getTipeUser: data,
                tipeUser: data[0].id,
                isLoading: false,
            })
        )
        .catch(error => this.setState({ error, isLoading: false }));         /* fetch Method GET */
    }
    
    handleChange = event =>{
        this.setState({ 
            [event.target.name]: event.target.value
         })
    }

    handleImage=event=>{
        this.setState({file:event.target.files==null ?"null" :event.target.files[0]});
    }

    handleSubmit = event =>{

        event.preventDefault();

        const formData = new FormData();
        formData.append('file',this.state.file);

        const data = {
            user: {
                kode: this.state.kode, 
                nama: this.state.nama, 
                alamat: this.state.alamat, 
                tglLahir: this.state.tglLahir, 
                telp: this.state.telp,
                email: this.state.email,
                password: this.state.password,
                foto: this.state.foto,
                idStatus: {
                    id: this.state.idStatus
                }
            },
            unit: {
                id: this.state.unit
            },
            posisi: {
                id: this.state.posisi
            },
            tipeUser: {
                id: this.state.tipeUser
            }
        }

        formData.append('user',JSON.stringify(data));

        fetch(Constant.API_LIVE + '/usercompany', {
            method: 'POST', 
            body: formData,
            headers:{
                'Authorization': 'Bearer ' + token
            }
        })
        .then(res => { res.json()
            if(res.ok){
                swal("Success!", "Data Successfully added!", "success")
                .then(function() {
                    window.location.href = "/employee";
                });
            }
            else {
                swal("Failed", "Insert Failed!", "error")
            }
        })
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response)); 
    }

    componentDidMount() {
        this.fetchUnit();
        this.fetchPosisi();
        this.fetchTipeUser();
    }
    
    render() {
        return (
            <div className="content-page">
                <div className="content">
                    <div className="container">
                        <div class="row">
                            <div class="col-sm-12">
                                <div className="btn-group pull-right m-t-15">
                                    <NavLink to='/employee'>
                                        <button type="button" className="btn btn-default btn-rounded waves-effect waves-light">
                                            <span className="btn-label"><i className="fa fa-arrow-left"></i></span>
                                            Back
                                        </button>
                                    </NavLink>
                                </div>
                                <h4 class="page-title">Form Employee</h4>
                                <ol class="breadcrumb">
                                    <li>
                                        <a href="/dashboard">Dashboard</a>
                                    </li>
                                    <li>
                                        <a href="/employee">Employee</a>
                                    </li>
                                    <li class="active">
                                        Form
                                    </li>
                                </ol>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="card-box">
                                    <h4 className="m-t-0 header-title"><b>Add New Employee</b></h4>
                                    <p className="text-muted m-b-30 font-13">
                                    </p>
                                    
                                    <form id="wizard-validation-form" onSubmit={this.handleSubmit}>
                                        <div>
                                            <section>
                                                <div className="form-group clearfix">
                                                    <label className="col-lg-2 control-label" htmlFor="name2">Nama Employee *</label>
                                                    <div className="col-lg-4">
                                                        <input name="nama" type="text" className="required form-control" onChange={this.handleChange}/>
                                                    </div>
                                                </div>

                                                <div className="form-group clearfix">
                                                    <label className="col-lg-2 control-label " htmlFor="surname2">Alamat *</label>
                                                    <div className="col-lg-4">
                                                        <input name="alamat" type="text" className="required form-control" onChange={this.handleChange}/>
                                                    </div>
                                                </div>

                                                <div className="form-group clearfix">
                                                    <label className="col-lg-2 control-label " htmlFor="email2">Tanggal Lahir *</label>
                                                    <div className="col-lg-4">
                                                        <input name="tglLahir" type="date" className="required form-control" onChange={this.handleChange}/>
                                                    </div>
                                                </div>

                                                <div className="form-group clearfix">
                                                    <label className="col-lg-2 control-label " htmlFor="userName2">Email *</label>
                                                    <div className="col-lg-4">
                                                        <input className="required email form-control" name="email" type="email" onChange={this.handleChange}/>
                                                    </div>
                                                </div>

                                                <div className="form-group clearfix">
                                                    <label className="col-lg-2 control-label " htmlFor="address2">Telepon *</label>
                                                    <div className="col-lg-4">
                                                        <input name="telp" type="tel" className="required form-control" onChange={this.handleChange}/>
                                                    </div>
                                                </div>

                                                <div className="form-group clearfix">
                                                    <label className="col-sm-2 control-label" >Foto</label>
                                                    <div className="col-lg-4">
                                                        <input type="file" data-buttonname="btn-primary" name="foto" onChange= {this.handleImage} placeholder="foto"/>
                                                    </div>
                                                </div>
                                                

                                            </section>
                                            <section>

                                                <div className="form-group clearfix">
                                                    <label className="col-lg-2 control-label " htmlFor="email2">Unit *</label>
                                                    <div className="col-lg-4">
                                                        <select className="form-control col-sm-3" data-style="btn-white" defaultValue={this.state.getUnit.indexOf(0)} name="unit" onChange={this.handleChange}>
                                                        {this.state.error ? <p>{this.state.error.message}</p> : null}
                                                        {!this.state.isLoading ? (
                                                            this.state.getUnit.map(u => {
                                                                return (
                                                                    <option key={u.id} value={u.id}>{u.unit}</option>
                                                                );
                                                            })
                                                        ) : (
                                                            <span>Loading...</span>
                                                        )}
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="form-group clearfix">
                                                    <label className="col-lg-2 control-label " htmlFor="address2">Posisi *</label>
                                                    <div className="col-lg-4">
                                                        <select className="form-control col-sm-3" data-style="btn-white" defaultValue={this.state.getPosisi.indexOf(0)} name="posisi" onChange={this.handleChange}>
                                                        {this.state.error ? <p>{this.state.error.message}</p> : null}
                                                        {!this.state.isLoading ? (
                                                            this.state.getPosisi.map(p => {
                                                                return (
                                                                    <option key={p.id} value={p.id}>{p.posisi}</option>
                                                                );
                                                            })
                                                        ) : (
                                                            <span>Loading...</span>
                                                        )}
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="form-group clearfix">
                                                    <label className="col-lg-2 control-label " htmlFor="address2">Tipe User *</label>
                                                    <div className="col-lg-4">
                                                        <select className="form-control col-sm-3" data-style="btn-white" name="tipeUser" defaultValue={this.state.getTipeUser.indexOf(0)} onChange={this.handleChange}>
                                                        {this.state.error ? <p>{this.state.error.message}</p> : null}
                                                        {!this.state.isLoading ? (
                                                            this.state.getTipeUser.map(t => {
                                                                return (
                                                                    <option key={t.id} value={t.id}>{t.tipe}</option>
                                                                );
                                                            
                                                            })
                                                        ) : (
                                                            <span>Loading...</span>
                                                        )}
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="form-group clearfix">
                                                    <label className="col-lg-12 control-label ">(*) Required</label>
                                                </div>

                                            </section>
                                            <section>
                                                <button type="submit" class="btn btn-success btn-rounded waves-effect waves-light">
                                                    <span class="btn-label"><i class="fa fa-check"></i></span>
                                                    Submit
                                                </button>
                                            </section>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EmployeeForm;
