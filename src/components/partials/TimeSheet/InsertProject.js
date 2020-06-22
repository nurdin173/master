import React, { Component } from 'react';
/* global google */
import { NavLink } from 'react-router-dom';
import swal from 'sweetalert';
import * as Constant from '../../_helpers/constant';

let token = localStorage.getItem('token');

class InsertProject extends Component {
    constructor(props){
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.autocompleteInput = React.createRef();
        this.autocomplete = null;
        this.handlePlaceChanged = this.handlePlaceChanged.bind(this);

        this.state = {
            kode: '',
            namaProject: '',
            lokasi: '',
            globalCode: '',
            status: '',
            createdBy: '',
            updatedBy: '',
            createdAt: '',
            updatedAt: '',

            project: [],
            error: null
        }
    }

    componentDidMount = async() => {
        this.autocomplete = new google.maps.places.Autocomplete(this.autocompleteInput.current);
        this.autocomplete.addListener('place_changed', this.handlePlaceChanged);
    }

    handlePlaceChanged(){
        const place = this.autocomplete.getPlace();

        let plusCode = place.plus_code;
        let gCode = plusCode == null ? "-" : plusCode.global_code;

        this.setState({
            lokasi: place.formatted_address,
            globalCode: gCode
        })
    }

    handleChange = event => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleSubmit = event =>{
        event.preventDefault();

        const data = {
            namaProject: this.state.namaProject,
            lokasi: this.state.lokasi,
            globalCode: this.state.globalCode
        }

        fetch(Constant.API_LIVE + '/project', { 
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        .then(res => {res.json()
            if(res.ok){
                swal("Success!", "Data successfully added!", "success")
                .then(function() {
                    window.location.href = "/timesheet/project";
                });
            }
            else {
                swal("Failed", "Insert failed!", "error")
            }
        })
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));
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
                                    <NavLink to='/timesheet/project'>
                                        <button type="button" className="btn btn-default btn-rounded waves-effect waves-light">
                                            <span className="btn-label"><i className="fa fa-arrow-left"></i></span>
                                            Back
                                        </button>
                                    </NavLink>
                                </div>

                                <h4 className="page-title">Project</h4>
                                <ol className="breadcrumb">
									<li>
										<a href="#">Attendee</a>
									</li>
									<li>
										<a href="#">Time Sheet</a>
									</li>
                                    <li>
                                        <a href="/timesheet/project">Project</a>
                                    </li>
									<li className="active">
										Insert Project
									</li>
								</ol>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm-12">
                                <div className="card-box" id="insert-form">
            			            <h4 className="m-t-0 header-title"><b>Project Form</b></h4>
                                    <div className="row">
										<div className="col-lg-6">
                                            <form className="form-horizontal group-border-dashed" onSubmit={this.handleSubmit}>
                                                <div className="form-group">
                                                    <label className="col-md-2 control-label">Project Name</label>
                                                    <div className="col-md-8">
                                                        <input type="text" name="namaProject" className="form-control" required placeholder="Project Name" onChange={this.handleChange} />
                                                    </div>
                                                </div>

                                                <div className="form-group">
                                                    <label className="col-md-2 control-label">Location</label>
                                                    <div className="col-md-8">
                                                        <input ref={this.autocompleteInput} className="form-control" id="autocomplete" placeholder="Project Location" type="text" name="lokasi" onChange={this.handleChange}></input>
                                                    </div>
                                                </div>

                                                <div className="form-group">
                                                    <div className="col-sm-offset-3 col-sm-9 m-t-15">
                                                        <button type="submit" className="btn btn-primary" value="Submit">
                                                            Submit
                                                        </button>
                                                        <button type="reset" className="btn btn-default m-l-5">
                                                            Cancel
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

export default InsertProject;