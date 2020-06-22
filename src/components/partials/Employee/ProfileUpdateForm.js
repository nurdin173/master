import React from 'react';
import moment from 'moment';
import * as Constant from '../../_helpers/constant';
import swal from 'sweetalert';
import { NavLink } from 'react-router-dom';

let token = localStorage.getItem('token');
let user = JSON.parse(localStorage.getItem('user'));
class ProfileUpdateForm extends React.Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            isLoading: true,
            id: user.idUser.id,
            kode: user.idUser.kode,
            nama: user.idUser.nama,
            alamat: user.idUser.alamat,
            tglLahir: moment(user.idUser.tglLahir, 'LLL').format('YYYY-MM-DD'), 
            telp: user.idUser.telp,
            email: user.idUser.email,
            password: user.idUser.password,
            foto: user.idUser.foto,
            idStatus: user.idUser.idStatus.id,
            createdBy: user.idUser.createdBy,
            createdAt: user.idUser.createdAt,
            updatedBy: user.idUser.updatedBy,
            updatedAt: user.idUser.updatedAt,
            error: null
        }
    }
    
    handleChange = event =>{
        this.setState({ 
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = event =>{
    event.preventDefault();

        const data = {
            id: this.state.id,
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
            },
            createdBy: this.state.createdBy,
            createdAt: this.state.createdAt,
            updatedBy: this.state.updatedBy,
            updatedAt: this.state.updatedAt
        }

        fetch(Constant.API_LIVE + '/user', {
            method: 'PUT',
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        .then(res => {res.json()
            if(res.ok){
                swal("Success!", "Data Successfully updated!", "success")
                .then()
                .then(function() {
                    window.location.href = "/profile";
                });
            }
            else {
                swal("Failed", "Update Failed!", "error")
            }
        })
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response)); 
    }
    
    render() {
        return (
            <div className="content-page">
                <div className="content">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="btn-group pull-right m-t-15">
                                    <NavLink to='/employee'>
                                        <button type="button" className="btn btn-default btn-rounded waves-effect waves-light">
                                            <span className="btn-label"><i className="fa fa-arrow-left"></i></span>
                                            Back
                                        </button>
                                    </NavLink>
                                </div>
                                <h4 className="page-title">Edit Profile</h4>
                                <ol className="breadcrumb">
                                    <li>
                                        <a href="/profile">Profile</a>
                                    </li>
                                    <li className="active">
                                        Edit
                                    </li>
                                </ol>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="card-box">
                                    <h4 className="m-t-0 header-title"><b>Edit Profile</b></h4>
                                    <p className="text-muted m-b-30 font-13">
                                    </p>
                                    
                                    <form id="wizard-validation-form" onSubmit={this.handleSubmit}>
                                        <div>
                                            <section>
                                                <div className="form-group clearfix">
                                                    <label className="col-lg-2 control-label" htmlFor="name2">Nama *</label>
                                                    <div className="col-lg-8">
                                                        <input id="name2" name="nama" type="text" defaultValue={this.state.nama} className="required form-control" onChange={this.handleChange}/>
                                                    </div>
                                                </div>

                                                <div className="form-group clearfix">
                                                    <label className="col-lg-2 control-label " htmlFor="surname2">Alamat *</label>
                                                    <div className="col-lg-8">
                                                        <input id="surname2" name="alamat" type="text" defaultValue={this.state.alamat} className="required form-control" onChange={this.handleChange}/>
                                                    </div>
                                                </div>

                                                <div className="form-group clearfix">
                                                    <label className="col-lg-2 control-label " htmlFor="email2">Tanggal Lahir *</label>
                                                    <div className="col-lg-8">
                                                        <input id="email2" name="tglLahir" type="date" defaultValue={this.state.tglLahir} className="required form-control" onChange={this.handleChange}/>
                                                    </div>
                                                </div>

                                                <div className="form-group clearfix">
                                                    <label className="col-lg-2 control-label " htmlFor="userName2">Email *</label>
                                                    <div className="col-lg-8">
                                                        <input className="required email form-control" id="userName2" name="email" type="email" defaultValue={this.state.email} onChange={this.handleChange}/>
                                                    </div>
                                                </div>

                                                <div className="form-group clearfix">
                                                    <label className="col-lg-2 control-label " htmlFor="address2">Telepon *</label>
                                                    <div className="col-lg-8">
                                                        <input id="address2" name="telp" type="text" className="required form-control" defaultValue={this.state.telp} onChange={this.handleChange}/>
                                                    </div>
                                                </div>

                                                <div className="form-group clearfix">
                                                    <label className="col-lg-12 control-label ">(*) Mandatory</label>
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

export default ProfileUpdateForm;