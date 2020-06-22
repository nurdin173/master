import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import * as Constant from '../../_helpers/constant';
import { Table, Spinner } from 'react-bootstrap';
import Toggle from 'react-toggle';
import './Toggle.css';
import swal from 'sweetalert';

let postUpdate = {};
let isChecked = {};
class Unit extends Component {
    constructor(props) {
        super(props);
        this.handleClickEdit = this.handleClickEdit.bind(this);
        this.handleClickReset = this.handleClickReset.bind(this);
        this.state = {
            items: [],
            isLoading: true,
            edit: true,
        }

    }

    updateSubmit(){
        this.setState({
            isLoading:true
        })
        fetch(Constant.API_LIVE + '/units', {
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
                this.setState({disabled:true,edit:true, isLoading:false})
                this.getData()
            }else{
                swal("Failed!", "Data Failed to update!", "error")
                this.setState({disabled:true,edit:true, isLoading:false})
            }
        })
        .catch(error => {
            swal("Failed!", "Data Failed to update!", "error")
            this.setState({disabled:true,edit:true, isLoading:false})
        })
    }

    changeStatus(unit,isStatus,index){
        let unitUpdate=unit;
        if(isStatus){
            unitUpdate.idStatus.status="Inactive"
            isChecked[index]=false
        }else{
            unitUpdate.idStatus.status="Active"
            isChecked[index]=true
        }
        if(postUpdate[index]==undefined||postUpdate[index]==null){
            postUpdate[index]=unitUpdate ;
        }else{
            delete postUpdate[index];
        }
    }

    getData() {
        axios.get(Constant.API_LIVE + '/unit', {
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

    handleClickEdit(event){
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
        postUpdate={};
        await this.getData();
    }

    componentDidMount(){
        this.getData();
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
                                <h4 className="page-title">Unit</h4>
                                <ol className="breadcrumb">
                                    <li>
                                        <a href="#">Attendee Application</a>
                                    </li>
                                    <li>
                                        <a href="#">Unit</a>
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
                                    <h4 className="m-t-0 header-title"><b>Unit List</b></h4>
                                    <br />
                                    {
                                        this.state.edit &&
                                        <NavLink to={'/unit/form'}><button type="button" className="btn btn-default btn-rounded waves-effect waves-light">Create</button></NavLink>
                                    }
                                    {
                                       ! this.state.edit && !this.state.isLoading &&
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
                                    <hr/>
                                    <div>
                                        {/* <MDBDataTable striped bordered data={data} /> */}
                                        <Table striped bordered responsive>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Unit</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    isLoading ?
                                                        <tr>
                                                            <td className="text-center" colSpan="3"><Spinner animation="border" variant="primary" style={spinnerStyle} /></td>
                                                        </tr> :
                                                        items.length > 0 ? items.map((unit, index) => {
                                                            if(unit.idStatus.status == "Active"){
                                                                isChecked[index] = true;
                                                            } else {
                                                                isChecked[index] = false
                                                            }
                                                            return(
                                                                <tr key={unit.id}>
                                                                    <td>{index + 1}</td>
                                                                    <td>{unit.unit}</td>
                                                                    <td>
                                                                        <Toggle 
                                                                            disabled={this.state.edit}
                                                                            defaultChecked={isChecked[index]}
                                                                            onClick={() => this.changeStatus(unit, isChecked[index], index)}
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
                    © 2016. All rights reserved.
                </footer>

            </div>
        );  
    }
}

export default Unit;
