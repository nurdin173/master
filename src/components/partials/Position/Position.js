import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import * as Constant from '../../_helpers/constant';
import { Table, Spinner } from 'react-bootstrap';
import Toggle from 'react-toggle';
import '../Unit/Toggle.css';
import swal from 'sweetalert';

let postUpdate = {};
let isChecked = {};
class Position extends Component {
    constructor(props) {
        super(props);
        this.handleClickEdit = this.handleClickEdit.bind(this);
        this.handleClickReset = this.handleClickReset.bind(this);

        this.state = {
            items: [],
            isLoading: true,
            edit: true
        }
    }

    updateSubmit(){
        this.setState({
            isLoading: true
        })
        fetch(Constant.API_LIVE + '/positions', {
            method: 'PUT',
            body: JSON.stringify(postUpdate),
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(res => { res.json()
            if(res.ok) {
                swal("Success!", "Data Successfully Updated!", "success");
                this.setState({ edit: true, isLoading: false })
            } else {
                swal("Success!", "Data Failed to Update!", "error");
                this.setState({ edit: true, isLoading: false })
            }
        })
        .catch(error => {
            swal("Failed!", "Data Failed to Update!", "error")
            this.setState({ edit: true, isLoading: false })
        })
    }

    componentDidMount() {
        this.getDataPosition();
    }

    changeStatus(posisi, isStatus, index) {
        let posisiUpdate = posisi;
        if(isStatus){
            posisiUpdate.idStatus.status = "Inactive"
            isChecked[index] = false
        } else{
            posisiUpdate.idStatus.status = "Active"
            isChecked[index] = true
        }
        if(postUpdate[index] == undefined || postUpdate[index] == null) {
            postUpdate[index] = posisiUpdate;
        } else {
            delete postUpdate[index]
        }
    }

    getDataPosition(){
        axios.get(Constant.API_LIVE + '/posisi', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => response.data)
        .then(data => {
            this.setState({
                items: data, isLoading: false
            })
        })
    }

    handleClickEdit(event) {
        event.preventDefault();
        this.setState({
            edit: false
        })
    }

    handleClickReset = async(event) => {
        event.preventDefault();
        this.setState({
            edit: true, isLoading: true
        })
        postUpdate = {};
        await this.getDataPosition();
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
                                <h4 className="page-title">Position</h4>
                                <ol className="breadcrumb">
                                    <li>
                                        <a href="#">Attendee Application</a>
                                    </li>
                                    <li>
                                        <a href="#">Position</a>
                                    </li>
                                    <li className="active">
                                        Position List
                                    </li>
                                </ol>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="card-box table-responsive">
                                    <h4 className="m-t-0 header-title"><b>Position List</b></h4>
                                    <br />
                                    <div className="button-list">
                                        {
                                            this.state.edit &&
                                            <NavLink to={'/position/form'}><button type="button" className="btn btn-default btn-rounded waves-effect waves-light">Create</button></NavLink>
                                        }
                                        {
                                        !this.state.edit && !this.state.isLoading &&
                                            <button type="button" className="btn btn-default btn-rounded waves-effect waves-light" onClick={()=>this.updateSubmit()}>Submit</button>    
                                        }
                                        {
                                            this.state.edit && !this.state.isLoading &&
                                            <button type="button" className="btn btn-default btn-rounded waves-effect waves-light" onClick={this.handleClickEdit}>Edit</button>
                                        }
                                        {
                                            !this.state.edit && !this.state.isLoading &&
                                            <button type="button" className="btn btn-default btn-rounded waves-effect waves-light" onClick={this.handleClickReset}>Cancel</button>    
                                        }
                                    </div>
                                    <hr/>
                                    <div>
                                        <Table striped bordered responsive>
                                            <thead>
                                                <tr>
                                                    <td>#</td>
                                                    <td>Position</td>
                                                    <td>Status</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    isLoading ?
                                                        <tr>
                                                            <td className="text-center" colSpan="3"><Spinner animation="border" variant="primary" style={spinnerStyle} /></td>
                                                        </tr> :
                                                        items.length > 0 ? items.map((posisi, index) => {
                                                            if(posisi.idStatus.status == "Active"){
                                                                isChecked[index] = true;
                                                            } else {
                                                                isChecked[index] = false
                                                            }
                                                            return(
                                                                <tr key={posisi.id}>
                                                                    <td>{ index + 1 }</td>
                                                                    <td>{ posisi.posisi }</td>
                                                                    <td>
                                                                        <Toggle 
                                                                            disabled={this.state.edit}
                                                                            defaultChecked={isChecked[index]}
                                                                            onClick={() => this.changeStatus(posisi, isChecked[index], index)}
                                                                        />
                                                                    </td>
                                                                </tr>
                                                            );
                                                        }) : <tr>
                                                            <td colSpan="4">No Record</td>
                                                        </tr>
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
                    © 2016. All rights reserved.
                </footer>

            </div>
        );  
    }
}

export default Position;
