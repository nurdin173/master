import React, { Component } from 'react';
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

class Libur extends Component {
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

    fetchLibur() {
        axios.get(Constant.API_LIVE + '/libur', {
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
        fetch(Constant.API_LIVE + '/liburs', {
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

    changeStatus(libur, isStatus, index){
        let liburUpdate = libur;

        if(isStatus){
            liburUpdate.status.status = "Inactive"
            isChecked[index] = false
        } else {
            liburUpdate.status.status = "Active"
            isChecked[index] = true
        }
        if(postUpdate[index] === undefined || postUpdate[index] == null){
            postUpdate[index] = liburUpdate;
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
        await this.fetchLibur();
    }

    componentDidMount() {
        this.fetchLibur();
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
                                <h4 className="page-title">Holiday</h4>
                                <ol className="breadcrumb">
                                    <li>
                                        <a href="/">Attendee</a>
                                    </li>
                                    <li>
                                        <a href="#">Time Sheet</a>
                                    </li>
                                    <li className="active">
                                        Holiday
                                    </li>
                                </ol>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="card-box table-responsive">
                                    <h4 className="m-t-0 header-title"><b>Holiday List</b></h4>
                                    <br />
                                    {
                                        this.state.edit &&
                                        <NavLink to={'/timesheet/insert-libur'}><button type="button" className="btn btn-default btn-rounded waves-effect waves-light">Create</button></NavLink>
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
                                                    <th>Holiday Name</th>
                                                    <th>Start Date</th>
                                                    <th>End Date</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {
                                                    isLoading ?
                                                        <tr>
                                                            <td className="text-center" colSpan="3"><Spinner animation="border" variant="primary" style={spinnerStyle} /></td>
                                                        </tr> :
                                                        items.length > 0 ? items.map((libur, index) => {
                                                            if(libur.status.status === "Active") {
                                                                isChecked[index] = true;
                                                            } else {
                                                                isChecked[index] = false
                                                            }
                                                            return(
                                                                <tr key={libur.id}>
                                                                    <td>{index + 1}</td>
                                                                    <td>{libur.nama}</td>
                                                                    <td>{libur.tglMulai}</td>
                                                                    <td>{libur.tglAkhir}</td>
                                                                    <td>
                                                                        <Toggle 
                                                                            disabled={this.state.edit}
                                                                            defaultChecked={isChecked[index]}
                                                                            onClick={() => this.changeStatus(libur, isChecked[index], index)}
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

export default Libur;