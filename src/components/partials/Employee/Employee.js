import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as Constant from '../../_helpers/constant';
import { Table, Spinner } from 'react-bootstrap';
import Pagination from "react-js-pagination";

let token = localStorage.getItem('token');
let user = JSON.parse(localStorage.getItem('user'));
export default class Employee extends Component {
    constructor(props){
        super(props);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleChange = this.toggleChange.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.state = {
            isLoading: true,
            submitted: false,
            userCompany: [],
            nama: null,
            alamat: null,
            email: null,
            tglLahir: null,
            telp: null,
            company: user.idCompanyUnitPosisi.idCompany.id,
            unit: null,
            posisi: null,
            tipe: null,
            error: null,
            data: [],
            activePage: 1,
            size: 10,
            count: null,
            isChecked: true,
            status: 'Active'
        }
    }

    handleChange = event => {
        this.setState({ 
            [event.target.name]: event.target.value
         })
    }

    handleSubmit = async(event) => {
        event.preventDefault();
        await this.changeStatus();
        this.setState({
            activePage: 1, isLoading: true
        })
        this.fetchUserByFilter(1, this.state.size)
        this.fetchCount();
        console.log(this.state.count)
    }

    toggleChange() {
        this.setState({ isChecked: !this.state.isChecked });
    }

    changeStatus(){
        if(this.state.isChecked){
            this.setState({ status: 'Active' })
        } else {
            this.setState({ status: null })
        }
    }

    handleReset = () => {
        this.setState({
            nama: null,
            posisi: null,
            unit: null
        })

        document.getElementById("form-search").reset();
    }

    handlePageChange(pageNumber){
        this.setState({
            activePage: pageNumber,
            isLoading: true
        })
        this.fetchAllUser(pageNumber, this.state.size);
        this.fetchCount();
    }

    componentDidMount() {
        if(sessionStorage.getItem('value') == null||sessionStorage.getItem('value') ==undefined){
            this.fetchCount();
            this.fetchAllUser(this.state.activePage, this.state.size)
        }
        else{
            this.setState(
                JSON.parse(sessionStorage.getItem('value'))
            )
            sessionStorage.removeItem("value");
            this.handleReset();
        }
        console.log(JSON.parse(sessionStorage.getItem('value')))
    }

    fetchCount() {
        const userCom = {
            idUser:{
                nama: this.state.nama,
                alamat: this.state.alamat,
                email: this.state.email,
                tglLahir: this.state.tglLahir,
                telp: this.state.telp,
                idStatus: {
                    status: this.state.status
                }
            },
            idCompanyUnitPosisi:{
                idCompany: {
                    id: this.state.company,
                },
                idUnit: {
                    unit: this.state.unit,
                },
                idPosisi: {
                    posisi: this.state.posisi,
                },
            },
            idTipeUser:{
                tipe: this.state.tipe,
            }
        }
        axios.post(Constant.API_LIVE + '/usercompany/count', userCom, {
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => response.data)
        .then(data => {
            this.setState({
                count: data
            })
        })
    }

    fetchUserByFilter(pageNumber, size) {
        const userCom = {
            idUser:{
                nama: this.state.nama,
                alamat: this.state.alamat,
                email: this.state.email,
                tglLahir: this.state.tglLahir,
                telp: this.state.telp,
                idStatus: {
                    status: this.state.status
                }
            },
            idCompanyUnitPosisi:{
                idCompany: {
                    id: this.state.company,
                },
                idUnit: {
                    unit: this.state.unit,
                },
                idPosisi: {
                    posisi: this.state.posisi,
                },
            },
            idTipeUser:{
                tipe: this.state.tipe,
            }
        }
        axios.post(Constant.API_LIVE + '/usercompany/filter/' + pageNumber + '/jumlah/' + size, userCom, {
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => response.data)
        .then(data => {
            this.setState({
                userCompany: data, isLoading: false
            })
        })
    }

    fetchAllUser(pageNumber, size) {
        const userCom = {
            idUser:{
                nama: this.state.nama,
                alamat: this.state.alamat,
                email: this.state.email,
                tglLahir: this.state.tglLahir,
                telp: this.state.telp,
                idStatus: {
                    status: this.state.status
                }
            },
            idCompanyUnitPosisi:{
                idCompany: {
                    id: this.state.company,
                },
                idUnit: {
                    unit: this.state.unit,
                },
                idPosisi: {
                    posisi: this.state.posisi,
                },
            },
            idTipeUser:{
                tipe: this.state.tipe,
            }
        }
        axios.post(Constant.API_LIVE + '/usercompany/filter/'+ pageNumber+'/jumlah/' + size, userCom, {
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => response.data)
        .then(data => {
            this.setState({
                userCompany: data , isLoading: false
            })
        })
    }

    saveSession(userCompany){
        sessionStorage.setItem("value", JSON.stringify(userCompany));
    }

    render() {
        const { isLoading, isAllLoading, userCompany } = this.state;
        const spinnerStyle = { width:"100px", height: "100px" };
        return(
            <div>
                <div className="content-page">
                    <div className="content">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-12">
                                    <h4 className="page-title">List of Employee</h4>
                                    <ol className="breadcrumb">
                                        <li>
                                            <a href="/dashboard">Dashboard</a>
                                        </li>
                                        <li>
                                            <a href="/employee">Employee</a>
                                        </li>
                                        <li className="active">
                                            List
                                        </li>
                                    </ol>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="card-box table-responsive">
                                        <h4 className="m-t-0 header-title"><b>Employee List</b></h4>
                                        <form className="form-inline" id="form-search" onSubmit={this.handleSubmit}>
                                            <div className="form-group">
                                                <label className="sr-only">Employee Name</label>
                                                <input type="text" className="form-control" name="nama" onChange={this.handleChange} placeholder="Employee Name" />
                                            </div>
                                                
                                            <div className="form-group m-l-10">
                                                <label className="sr-only">Position</label>
                                                <input type="text" className="form-control" name="posisi" onChange={this.handleChange} placeholder="Position" />
                                            </div>
                                            <div className="form-group m-l-10">
                                                <label className="sr-only">Unit</label>
                                                <input type="text" className="form-control" name="unit" onChange={this.handleChange} placeholder="Unit" />
                                            </div>
                                            <div className="form-group m-l-10">
                                                <div className="checkbox checkbox-primary">
                                                    <input id="checkbox3" type="checkbox" checked={this.state.isChecked} onChange={this.toggleChange} />
                                                    <label htmlFor="checkbox3">
                                                        Active
                                                    </label>
                                                </div>
                                            </div>
                                            <button type="submit" className="btn btn-default waves-effect waves-light m-l-10 btn-md">Search</button>
                                            <button type="button" onClick={this.handleReset} className="btn btn-default waves-effect waves-light m-l-10 btn-md">Reset</button>
                                        </form>
                                        <hr />
                                            <Table striped bordered responsive>
                                                <thead>
                                                    <tr>
                                                        <td>#</td>
                                                        <td>Nama</td>
                                                        <td>Email</td>
                                                        <td>Posisi</td>
                                                        <td>Unit</td>
                                                        <td>Tipe User</td>
                                                        <td>Status</td>
                                                        <td>Action</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        isLoading ? 
                                                        <tr>
                                                            <td className="text-center" colSpan="10"><Spinner animation="border" variant="primary" style={spinnerStyle} /></td>
                                                        </tr> :

                                                        userCompany.length > 0 ? userCompany.map((user, index) => {
                                                            return(
                                                                <tr key={user.idUser.id}>
                                                                    <td>{ ((index+1)+(this.state.size * (this.state.activePage-1))) }</td>                                                                        
                                                                    <td>{ user.idUser.nama }</td>
                                                                    <td>{ user.idUser.email }</td>
                                                                    <td>{ user.idCompanyUnitPosisi.idPosisi == null ? "-" : user.idCompanyUnitPosisi.idPosisi.posisi }</td>
                                                                    <td>{ user.idCompanyUnitPosisi.idUnit == null ? "-" : user.idCompanyUnitPosisi.idUnit.unit }</td>
                                                                    <td>{ user.idTipeUser.tipe }</td>
                                                                    <td>{ user.idUser.idStatus.status }</td>
                                                                    <td>
                                                                        <div className="button-list">
                                                                            <Link to={{pathname: "/employee/view", data: user}} onClick={this.saveSession(this.state)} className="btn btn-inverse"><i className="fa fa-user"></i></Link>
                                                                            <Link to={{pathname: "/attendee/register", data: user}} className="btn btn-purple"><i className="fa fa-camera"></i></Link>
                                                                        </div>
                                                                    </td>                                                                
                                                                </tr>
                                                            );
                                                        }) : <tr>
                                                            <td colSpan="4">No Record</td>
                                                        </tr>
                                                    }
                                                </tbody>
                                            </Table>
                                            <div>
                                                <Pagination
                                                    hideFirstLastPages
                                                    activePage={this.state.activePage}
                                                    itemsCountPerPage={this.state.size}
                                                    totalItemsCount={this.state.count}
                                                    onChange={this.handlePageChange}
                                                />
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <footer className="footer">
                        © 2016. All rights reserved.
                    </footer>

                </div>
            </div>
        );
    }
}