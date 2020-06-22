import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import swal from 'sweetalert';
import "./../../auth/SpinnerLoader.css";
import { history } from '../../_helpers';
import * as Constant from '../../_helpers/constant';

let user = JSON.parse(localStorage.getItem('user'));

class EditUnit extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            isLoading: false,
            id: this.props.location.data.id,
            unit: this.props.location.data.unit,
            createdBy: this.props.location.data.createdBy,
            createdAt: this.props.location.data.createdAt,
            status: this.props.location.data.idStatus.status,
        }
    }

    handleSubmit = e => {
        e.preventDefault();

        this.setState({
            isLoading: true
        })

        const data = {
            id: this.state.id,
            unit: this.state.unit,
            idStatus: {
                status: this.state.status
            },
            createdAt: this.state.createdAt,
            createdBy: this.state.createdBy
        }

        fetch(Constant.API_LIVE + '/unit', {
            method: 'PUT',
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(res => { res.json()
            if(res.ok) {
                swal("Success!", "Data Successfully Updated!", "success")
                .then(function() {
                    history.push( "/unit");
                })
            }else{
                swal("Failed!", "Data Failed to add!", "error")
                this.setState({
                isLoading:false
            })
            }
        })
        .then(response => console.log('Success', response))
        .catch(error => {swal("Failed!", error, "error")
            swal("Failed!", "Data Failed to add!", "error")
            this.setState({
                isLoading:false
            })
        })
    }

    handleChange = (event) => {
        this.setState({ 
            [event.target.name]: event.target.value
         })
    }

    render(){
        const { isLoading } = this.state;

        return(
            <>
                <div className="content-page">
                <div className="content">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="btn-group pull-right m-t-15">
                                    <NavLink to='/unit'>
                                        <button type="button" className="btn btn-default btn-rounded waves-effect waves-light">
                                            <span className="btn-label"><i className="fa fa-arrow-left"></i></span>
                                            Back
                                        </button>
                                    </NavLink>
                                </div>
                                <h4 className="page-title">Form Unit</h4>
                                <ol className="breadcrumb">
                                    <li>
                                        <a href="#">Attendee Application</a>
                                    </li>
                                    <li>
                                        <a href="#">Unit</a>
                                    </li>
                                    <li className="active">
                                        Form
                                    </li>
                                </ol>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="card-box">
                                    <h4 className="m-t-0 header-title"><b>Add New Unit</b></h4>
                                    <br />
                                    <form onSubmit={this.handleSubmit}>
										<div className="form-group clearfix">
                                            <div className="col-sm-6">
                                                <label>Unit *</label>
                                                <input type="text" name="unit" readOnly value={this.state.unit} onChange={this.handleChange} required placeholder="Eg: Finance" className="form-control" />
										    </div>
                                        </div>
                                        <div className="form-group clearfix">
                                            <div className="col-sm-6">
                                                <label>Status *</label>
                                                    <select className="form-control" value={this.state.status} name="status" onChange={this.handleChange} required>                                                     
                                                        <option value="Inactive">Inactive</option>
                                                        <option value="Active">Active</option>       
                                                    </select>
										    </div>
                                        </div>
                                        
										<div className="form-group clearfix">
                                            <div className="col-sm-6">
                                                <button type="submit" className="btn btn-success btn-rounded waves-effect waves-light" disabled={isLoading}>
                                                   <span className="btn-label"><i className="fa fa-check"></i></span>
                                                   { isLoading &&  <i className="spinner-border"> </i> }
                                                    { isLoading &&  <span> Loading </span> }
                                                    { !isLoading &&  <span> Submit </span> }
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
            </>
        );
    }
}

export default EditUnit;