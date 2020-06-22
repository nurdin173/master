import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Moment from 'moment';
import swal from 'sweetalert';
import * as Constant from '../../_helpers/constant';

let token = localStorage.getItem('token');

class EditShift extends Component {
    constructor(props){
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            id: this.props.location.data.id,
            idShift: this.props.location.data.shift.id,
            kode: this.props.location.data.shift.kode,
            masuk: Moment(this.props.location.data.shift.masuk, Moment.HTML5_FMT.TIME_SECONDS),
            pulang: Moment(this.props.location.data.shift.pulang, Moment.HTML5_FMT.TIME_SECONDS),
            status: this.props.location.data.shift.status.status,
            createdBy: this.props.location.data.shift.createdBy.id,
            updatedBy: this.props.location.data.shift.updatedBy,
            createdAt: this.props.location.data.shift.createdAt,
            updatedAt: this.props.location.data.shift.updatedAt,
            getProject: this.props.location.data.project
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleSubmit = event =>{
        event.preventDefault();

        const data = {
            id: this.state.idShift,
            kode: this.state.kode,
            masuk: this.state.masuk.format('HH:mm:ss'),
            pulang: this.state.pulang.format('HH:mm:ss'),
            status: {
                status: this.state.status
            },
            createdBy: {
                id: this.state.createdBy
            },
            createdAt: this.state.createdAt,
        }

        fetch(Constant.API_LIVE + '/shift', { 
            method: 'PUT',
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        .then(res => {res.json()
            if(res.ok){
                swal("Success!", "Data successfully updated!", "success")
                .then(function() {
                    window.location.href = "/timesheet/shift";
                });
            }
            else {
                swal("Failed", "Update failed!", "error")
            }
        })
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));
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
                isLoading:false
            })
        })
        .catch(error => this.setState({ error, isLoading: false }));
    }

    componentDidMount() {
        this.fetchProject();
    }

    render() {
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
                                        <a href="/">Attendee</a>
                                    </li>
                                    <li>
                                        <a href="#">Time Sheet</a>
                                    </li>
                                    <li>
                                        <a href="/timesheet/shift">Shift</a>
                                    </li>
                                    <li className="active">
                                        Edit Shift
                                    </li>
                                </ol>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="card-box">
            			            <h4 className="m-t-0 header-title"><b>Edit Form</b></h4>
                                    <div className="row">
										<div className="col-lg-6">
                                            <form className="form-horizontal group-border-dashed" onSubmit={this.handleSubmit}>
                                                <div className="form-group">
                                                    <label className="col-md-2 control-label">Check In</label>
                                                    <div className="col-md-8">
                                                        <input type="text" defaultValue={this.state.masuk.format('HH:mm:ss')} className="form-control" readOnly/>
                                                    </div>
                                                </div>

                                                <div className="form-group">
                                                    <label className="col-md-2 control-label">Check In</label>
                                                    <div className="col-md-8">
                                                        <input type="text" defaultValue={this.state.pulang.format('HH:mm:ss')} className="form-control" readOnly/>
                                                    </div>
                                                </div>

                                                {/* <div className="form-group">
                                                    <label className="col-md-2 control-label">Check In</label>
                                                    <div className="col-md-8">
                                                        <div className="input-group clockpicker " data-placement="top" data-align="top" data-autoclose="true">
                                                            <input type="time" step="1" name="masuk" defaultValue={this.state.masuk.format('LTS')} className="form-control" readOnly onChange={this.handleChange} />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="form-group">
                                                    <label className="col-md-2 control-label">Check Out</label>
                                                    <div className="col-md-8">
                                                        <div className="input-group clockpicker" data-placement="top" data-align="top" data-autoclose="true">
                                                            <input type="time" step="1" name="pulang" defaultValue={this.state.pulang.format('LTS')} className="form-control" readOnly onChange={this.handleChange} />
                                                        </div>
                                                    </div>
                                                </div> */}

                                                <div className="form-group">
                                                    <label className="col-md-2 control-label">Project Name</label>
                                                    <div className="col-md-8">
                                                        <input type="text" defaultValue={this.state.getProject.namaProject} className="form-control" readOnly/>
                                                    </div>
                                                </div>

                                                <div className="form-group">
                                                    <label className="col-md-2 control-label">Project Name</label>
                                                    <div className="col-md-8">
                                                        <input type="text" defaultValue={this.state.getProject.lokasi} className="form-control" readOnly/>
                                                    </div>
                                                </div>

                                                <div className="form-group">
                                                    <label className="col-md-2 control-label">Status</label>
                                                    <div className="radio radio-info radio-inline">
                                                        <input type="radio" id="inlineRadio1" value="Active" name="status" onClick={this.handleChange} />
                                                        <label htmlFor="inlineRadio1"> Active </label>
                                                    </div>
                                                    <div className="radio radio-inline">
                                                        <input type="radio" id="inlineRadio2" value="Inactive" name="status" onClick={this.handleChange} />
                                                        <label htmlFor="inlineRadio2"> Inactive </label>
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

export default EditShift;