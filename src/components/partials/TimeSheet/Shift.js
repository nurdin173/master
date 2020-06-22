import React, { Component } from 'react';
import { MDBDataTable } from 'mdbreact';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import * as Constant from '../../_helpers/constant';
import { Table, Spinner } from 'react-bootstrap';
import Toggle from 'react-toggle';
import './Toggle.css';

let token = localStorage.getItem('token');
let postUpdate = {};
let isChecked = {};

class Shift extends Component {
    constructor(props){
        super(props);

        this.handleClickEdit = this.handleClickEdit.bind(this);
        this.handleClickReset = this.handleClickReset.bind(this);

        this.state = {
            items: [],

            isLoading: true,
            edit: true
        }
    }

    fetchShiftProject() {
        axios.get(Constant.API_LIVE + '/shift-project',{
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        .then(response => response.data)
        .then(data => {
            this.setState({
                items: data,
                isLoading: false
            })
        });
    }

    handleUpdate() {
        this.setState({
            isLoading:true
        })
        fetch(Constant.API_LIVE + '/shifts', {
            method: 'PUT',
            body: JSON.stringify(postUpdate),
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        .then(res => { res.json()
            if(res.ok) {
                swal("Success!", "Data successfully updated!", "success");

                this.setState({
                    disabled: true,
                    edit: true,
                    isLoading: false
                })
                this.fetchLibur()
            } else {
                swal("Failed!", "Update failed!", "error");

                this.setState({
                    disabled: true,
                    edit: true,
                    isLoading: false
                })
            }
        })
        .catch(error => console.error('Error:', error))
    }

    changeStatus(shift, isStatus, index){
        let shiftUpdate = shift;

        if(isStatus){
            shiftUpdate.status.status = "Inactive"
            isChecked[index] = false
        } else {
            shiftUpdate.status.status = "Active"
            isChecked[index] = true
        }
        if(postUpdate[index] === undefined || postUpdate[index] == null){
            postUpdate[index] = shiftUpdate;
        } else {
            delete postUpdate[index];
        }
    }

    handleClickEdit = event => {
        event.preventDefault();

        this.setState({
            edit: false
        })
    }

    handleClickReset = async(event) => {
        event.preventDefault();

        this.setState({
            edit: true,
            isLoading: true
        })
        postUpdate = {};
        await this.fetchShiftProject();
    }

    componentDidMount() {
        this.fetchShiftProject();
    }

    render(){
        const { items, isLoading } = this.state;
        const spinnerStyle = { width:"100px", height: "100px" };

        return(
            <div className="content-page">
                <div className="content">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <h4 className="page-title">Shift</h4>
                                <ol className="breadcrumb">
                                    <li>
                                        <a href="/">Attendee</a>
                                    </li>
                                    <li>
                                        <a href="#">Time Sheet</a>
                                    </li>
                                    <li className="active">
                                        Shift
                                    </li>
                                </ol>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="card-box table-responsive">
                                    <h4 className="m-t-0 header-title"><b>Shift List</b></h4>
                                    <br />
                                    {
                                        this.state.edit &&
                                        <NavLink to={'/timesheet/insert-shift'}><button type="button" className="btn btn-default btn-rounded waves-effect waves-light">Create</button></NavLink>
                                    }
                                    {
                                        !this.state.edit && !this.state.isLoading &&
                                        <button type="button" className="btn btn-default btn-rounded waves-effect waves-light" onClick={()=>this.handleUpdate()}>Submit</button>
                                    }
                                    {
                                        this.state.edit && !this.state.isLoading &&
                                        <button type="button" className="btn btn-default btn-rounded waves-effect waves-light" onClick={this.handleClickEdit}>Edit</button>
                                    }
                                    {
                                        !this.state.edit && !this.state.isLoading &&
                                        <button type="button" className="btn btn-default btn-rounded waves-effect waves-light" onClick={this.handleClickReset}>Cancel</button>    
                                    }
                                    <hr/>
                                    <div>
                                        <Table striped bordered responsive>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Clock In</th>
                                                    <th>Clock Out</th>
                                                    <th>Project Name</th>
                                                    <th>Project Location</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {
                                                    isLoading ?
                                                        <tr>
                                                            <td className="text-center" colSpan="3"><Spinner animation="border" variant="primary" style={spinnerStyle} /></td>
                                                        </tr> :
                                                        items.length > 0 ? items.map((shiftProject, index) => {
                                                            if(shiftProject.shift.status.status === "Active") {
                                                                isChecked[index] = true;
                                                            } else {
                                                                isChecked[index] = false
                                                            }
                                                            return(
                                                                <tr key={shiftProject.id}>
                                                                    <td>{index + 1}</td>
                                                                    <td>{shiftProject.shift.masuk}</td>
                                                                    <td>{shiftProject.shift.pulang}</td>
                                                                    <td>{shiftProject.project.namaProject}</td>
                                                                    <td>{shiftProject.project.lokasi}</td>
                                                                    <td>
                                                                        <Toggle 
                                                                            disabled={this.state.edit}
                                                                            defaultChecked={isChecked[index]}
                                                                            onClick={() => this.changeStatus(shiftProject, isChecked[index], index)}
                                                                        />
                                                                    </td>
                                                                </tr>
                                                            );
                                                        }) : null
                                                }
                                            </tbody>
                                        </Table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <footer className="footer">
                    © 2019. All rights reserved.
                </footer>

            </div>
        );
    }
}

export default Shift;