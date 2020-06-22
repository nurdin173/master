import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import swal from 'sweetalert';
import Moment from 'moment';
import * as Constant from '../../_helpers/constant';

let token = localStorage.getItem('token');

class InsertUserShiftProject extends Component {
    constructor(props){
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            id: null,
            kode: null,
            masuk: Moment('', Moment.HTML5_FMT.TIME_SECONDS),
            pulang: Moment('', Moment.HTML5_FMT.TIME_SECONDS),
            status: null,
            createdBy: null,
            updatedBy: null,
            createdAt: null,
            updatedAt: null,
            project: null,
            getProject: [],
            shiftProject: null,
            getShiftProject: [],
            worktime: null,
            idUser: null,
            userCompany: this.props.location.data.id,
            nama: this.props.location.data.idUser.nama,
            namaProject: null,
            lokasi: null,
            userShiftProject: [],
            usp: [],

            create: true,

            isLoading: true,
            shift: [],
            error: null,

            posts: [],
            tableRows: [],
        }
    }

    fetchProject() {
        fetch(Constant.API_LIVE + '/api/project',{
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        .then(response => response.json())
        .then(data => {
            this.setState({
                getProject: data,
                project: data[0].id,
                isLoading:false
            })
        });
    }

    fetchShiftProject() {
        fetch(Constant.API_LIVE + '/api/shift-project',{
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        .then(response => response.json())
        .then(data => {
            this.setState({
                getShiftProject: data,
                shiftProject: data[0].id,
                isLoading:false
            })
        });
    }

    handleChange = event => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault();

        const data = {
            // shiftProject: {
            //     shift: {
            //         masuk: this.state.masuk,
            //         pulang: this.state.pulang
            //     },
            //     project: {
            //         id: this.state.project
            //     },
            // },
            shiftProject: {
                id: this.state.shiftProject
            },
            userCompany: {
                id: this.state.userCompany
            },
            worktime: {
                status: this.state.worktime
            }
        }

        fetch(Constant.API_LIVE + '/api/user-shift-project', { 
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers:{
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        })
        .then(res => {res.json()
            if(res.ok){
                swal("Success!", "Data successfully added!", "success")
                .then(function() {
                    window.location.href = "/timesheet/shift";
                });
            }
            else {
                swal("Failed", "Insert failed!", "error")
            }
        })
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response/*, console.log(data.masuk, data.pulang)*/));
    }

    componentDidMount() {
        this.fetchProject();
        this.fetchShiftProject();
    }

    render(){
        return(
            <div className="content-page">
                <div className="content">
                    <div className="container">
                        {/* Page Title */}
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

                                <h4 className="page-title">Shift</h4>
                                <ol className="breadcrumb">
                                    <li>
                                        <a href="#">Attendee</a>
                                    </li>
                                    <li>
                                        <a href="#">Employee</a>
                                    </li>
                                    <li className="active">
                                        User Shift Project
                                    </li>
                                </ol>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm-12">                                
                                <div className="card-box" id="insert-form">
            			            <h4 className="m-t-0 header-title"><b>Insert Form</b></h4>
                                    <div className="row">
										<div className="col-lg-6">
                                            <form className="form-horizontal group-border-dashed" onSubmit={this.handleSubmit}>
                                                <div className="form-group">
                                                    <label className="col-md-2 control-label">Name</label>
                                                    <div className="col-md-8">
                                                        <input type="text" className="form-control" readOnly defaultValue={this.state.nama} />
                                                    </div>
                                                </div>

                                                <div className="form-group clearfix">
                                                    <div className="col-sm-6">
                                                        <label>Shift Project</label>
                                                        <select className="form-control" defaultValue={this.state.getShiftProject.indexOf(0)} name="shiftProject" onChange={this.handleChange} required>                                                     
                                                            {/* {this.state.error ? <p>{this.state.error.message}</p> : null} */}
                                                            {!this.state.isLoading ? (
                                                                this.state.getShiftProject.map(sp => {
                                                                    console.log(sp.shift.id, sp.project.id)
                                                                    return (
                                                                        <option key={sp.id} value={sp.id}>{sp.project.namaProject+" -> "+sp.shift.masuk+", "+sp.shift.pulang}</option>
                                                                    );
                                                                })
                                                            ) : (
                                                                <h3>Loading...</h3>
                                                            )}
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="form-group">
                                                    <label className="col-md-2 control-label">Worktime</label>
                                                    <div className="radio radio-info radio-inline">
                                                        <input type="radio" id="inlineRadio1" value="Flexible" name="worktime" onClick={this.handleChange} />
                                                        <label for="inlineRadio1"> Flexible </label>
                                                    </div>
                                                    <div className="radio radio-inline">
                                                        <input type="radio" id="inlineRadio2" value="Standard" name="worktime" onClick={this.handleChange} />
                                                        <label for="inlineRadio2"> Standard </label>
                                                    </div>
                                                </div>

                                                <div className="form-group">
                                                    <div className="col-sm-offset-3 col-sm-9 m-t-15">
                                                        <button type="submit" className="btn btn-primary">
                                                            Submit
                                                        </button>
                                                        <button type="reset" className="btn btn-default m-l-5">
                                                            Reset
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default InsertUserShiftProject;