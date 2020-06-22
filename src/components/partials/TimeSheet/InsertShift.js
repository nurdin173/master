import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import swal from 'sweetalert';
import Moment from 'moment';
import * as Constant from '../../_helpers/constant';

let token = localStorage.getItem('token');

class InsertShift extends Component {
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

            idProject: null,
            getProject: [],
            namaProject: null
        }
    }

    fetchProject() {
        fetch(Constant.API_LIVE + '/project',{
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
        })
        .catch(error => this.setState({ error, isLoading: false }));
    }

    handleChange = event => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault();

        const data = {
            shift: {
                masuk: this.state.masuk,
                pulang: this.state.pulang,
                status: {
                    status: 'Active'
                }
            },
            project: {
                id: this.state.idProject
            },
        }

        fetch(Constant.API_LIVE + '/shift-project', { 
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
        .then(response => console.log('Success:', response));
    }

    componentDidMount() {
        this.fetchProject();
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
                                    <NavLink to='/timesheet/shift'>
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
                                        <a href="#">Time Sheet</a>
                                    </li>
                                    <li>
                                        <a href="/timesheet/shift">Shift</a>
                                    </li>
                                    <li className="active">
                                        Insert Shift
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
                                                    <label className="col-md-2 control-label">Check In</label>
                                                    <div className="col-md-8">
                                                        <div className="input-group clockpicker " data-placement="top" data-align="top" data-autoclose="true">
                                                            <input type="time" step="1" name="masuk" className="form-control" required onChange={this.handleChange} />
                                                            <span className="input-group-addon"> <span className="glyphicon glyphicon-time"></span> </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="form-group">
                                                    <label className="col-md-2 control-label">Check Out</label>
                                                    <div className="col-md-8">
                                                        <div className="input-group clockpicker" data-placement="top" data-align="top" data-autoclose="true">
                                                            <input type="time" step="1" name="pulang" className="form-control" required onChange={this.handleChange} />
                                                            <span className="input-group-addon"> <span className="glyphicon glyphicon-time"></span> </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="form-group clearfix">
                                                    <div className="col-sm-6">
                                                        <label>Project Name</label>
                                                        <select className="form-control" defaultValue={this.state.getProject.indexOf(0)} name="idProject" onChange={this.handleChange} required>                                                     
                                                            {/* {this.state.error ? <p>{this.state.error.message}</p> : null} */}
                                                            {!this.state.isLoading ? (
                                                                this.state.getProject.map(pro => {
                                                                    return (
                                                                        <option key={pro.id} value={pro.id}>{pro.namaProject}</option>
                                                                    );
                                                                })
                                                            ) : (
                                                                <h3>Loading...</h3>
                                                            )}     
                                                        </select>
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

export default InsertShift;