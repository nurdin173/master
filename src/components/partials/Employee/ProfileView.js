import React, { Component } from 'react';
import moment from 'moment';
import { Link, NavLink } from 'react-router-dom';
import * as Constant from '../../_helpers/constant';

let token = localStorage.getItem('token');
let user = JSON.parse(localStorage.getItem('user'));
let pic = localStorage.getItem('image');
class ProfileView extends Component {
    constructor(props){
        super(props);
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
            foto: pic,
            idStatus: user.idUser.idStatus.id,
            createdBy: user.idUser.createdBy,
            createdAt: user.idUser.createdAt,
            updatedBy: user.idUser.updatedBy,
            updatedAt: user.idUser.updatedAt,
            company: user.idCompanyUnitPosisi.idCompany.id,
            users: null
        }     
    }

    componentDidMount() {
        this.fetchUser();
    }

    fetchUser() {
        const filter = {
            idUser: {
                nama: null,
                alamat: null,
                email: this.state.email,
                tglLahir: null,
                telp: null
            },
            idCompanyUnitPosisi: {
                idCompany: {
                    id: user.idCompanyUnitPosisi.idCompany.id
                },
                idUnit: {
                    unit: null
                },
                idPosisi: {
                    posisi: null
                }
            },
            idTipeUser: {
                tipe: null
            }
        }

        fetch(Constant.API_LIVE + `/usercompany/filter`,{
            method: 'POST',
            body: JSON.stringify(filter),
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        .then(response => response.json())
        .then(data =>
            this.setState({
                users: data,
                id: this.state.users.idUser.id,
                nama: this.state.users.idUser.nama,
                alamat: this.state.users.idUser.alamat,
                tglLahir: moment(this.state.users.idUser.tglLahir, 'LLL').format('YYYY-MM-DD'), 
                telp: this.state.users.idUser.telp,
                email: this.state.users.idUser.email,
                isLoading: false,
            })
        )
        .catch(error => this.setState({ error, isLoading: false }));
    }

    render () {
        console.log(this.state.users);
        return (
            <div className="content-page">
                <div className="content">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="btn-group pull-right m-t-15">
                                    <NavLink to='/dashboard'>
                                        <button type="button" className="btn btn-default btn-rounded waves-effect waves-light">
                                            <span className="btn-label"><i className="fa fa-arrow-left"></i></span>
                                            Back
                                        </button>
                                    </NavLink>
                                </div>
                                <h4 className="page-title">Detail Profile</h4>
                                <ol className="breadcrumb">
                                    <li>
                                        <a href="/dashboard">Dashboard</a>
                                    </li>
                                    <li className="active">
                                        Profile
                                    </li>
                                </ol>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="card-box table-responsive">
                                <h4 className="m-t-0 header-title"><b>Detail Profile</b>
                                    </h4>
                                    <hr />
                                        <div className="form-group clearfix">
                                            <label className="col-md-2 control-label" >Profile Photo</label>
                                            <div className="col-lg-3">
                                                <img src={this.state.foto} alt="user-img" className="img-responsive img-thumbnail" width="200"></img>
                                            </div>
                                        </div>

                                        <div className="form-group clearfix">
                                            <label className="col-sm-2 control-label" >NIK</label>
                                            <div className="col-lg-3">
                                                <input type="text" id="kode" name="kode" className="form-control" disabled value={this.state.kode} placeholder="NIK"/>
                                            </div>
                                        </div>

                                        <div className="form-group clearfix">
                                            <label className="col-md-2 control-label" >Nama</label>
                                            <div className="col-lg-3">
                                                <input type="text" id="nama" name="nama" className="form-control"  disabled value={this.state.nama} placeholder="Nama"/>
                                            </div>                                    
                                        </div>

                                        <div className="form-group clearfix">
                                            <label className="col-md-2 control-label" >Alamat</label>
                                            <div className="col-lg-3">
                                                <input type="text" id="alamat" name="alamat" className="form-control"  disabled value={this.state.alamat} placeholder="Alamat"/>
                                            </div>                                    
                                        </div>

                                        <div className="form-group clearfix">
                                            <label className="col-md-2 control-label" >Tanggal Lahir</label>
                                            <div className="col-lg-3">
                                                <input type="date" id="tglLahir" name="tglLahir" className="form-control"  disabled value={this.state.tglLahir} placeholder="Tanggal Lahir"/>
                                            </div>                                    
                                        </div>

                                        <div className="form-group clearfix">
                                            <label className="col-md-2 control-label" >Email</label>
                                            <div className="col-lg-3">
                                                <input type="text" id="email" name="email" className="form-control"  disabled value={this.state.email} placeholder="Email"/>
                                            </div>                                    
                                        </div>
                                        
                                        <div className="form-group clearfix">
                                            <label className="col-md-2 control-label" >Telepon</label>
                                            <div className="col-lg-3">
                                                <input type="text" id="telp" name="telp" className="form-control"  disabled value={this.state.telp} placeholder="Telepon"/>
                                            </div>                                    
                                        </div>

                                        <Link to={{pathname: "/profile/edit", data: user}}>
                                            <button className="btn btn-warning btn-rounded waves-effect waves-light">
                                                <span className="btn-label"><i className="fa fa-edit"></i></span>
                                                Edit
                                            </button>
                                        </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            <footer className="footer">
                © 2016. All rights reserved.
            </footer>

            </div>
        );
    }
}

export default ProfileView;