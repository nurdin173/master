import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import DateRangePicker from 'react-daterange-picker';
import swal from 'sweetalert';
import Moment from 'moment';
import * as Constant from '../../_helpers/constant';

let token = localStorage.getItem('token');

class InsertLibur extends Component {
    constructor(props){
        super(props);
        const today = Moment();
        this.state = {
            id: '',
            nama: '',
            // tglMulai: Moment('', Moment.ISO_8601),
            // tglAkhir: Moment('', Moment.ISO_8601),
            tglMulai: '',
            tglAkhir: '',
            status: '',
            createdBy: '',
            updatedBy: '',
            createdAt: '',
            updatedAt: '',
            dateValue: Moment.range(today.clone(), today.clone()),

            libur: [],
            error: null
        }
    }

    onSelect = (dateValue, states) => {
        this.setState({ dateValue, states, isOpen: false });
    };

    onToggle = () => {
        this.setState({ isOpen: !this.state.isOpen });
    };

    handleChange = event => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleSubmit = event =>{
        event.preventDefault();

        const data = { 
            nama: this.state.nama, 
            // tglMulai: this.state.tglMulai,
            // tglAkhir: this.state.tglAkhir
            tglMulai: this.state.dateValue.start.format("YYYY-MM-DD"),
            tglAkhir: this.state.dateValue.end.format("YYYY-MM-DD"),
        }

        fetch(Constant.API_LIVE + '/libur', { 
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
                    window.location.href = "/timesheet/libur";
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
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="btn-group pull-right m-t-15">
                                    <NavLink to='/timesheet/libur'>
                                        <button type="button" className="btn btn-default btn-rounded waves-effect waves-light">
                                            <span className="btn-label"><i className="fa fa-arrow-left"></i></span>
                                            Back
                                        </button>
                                    </NavLink>
                                </div>

                                <h4 className="page-title">Holiday</h4>
                                <ol className="breadcrumb">
									<li>
										<a href="#">Attendee</a>
									</li>
									<li>
										<a href="#">Time Sheet</a>
									</li>
                                    <li>
                                        <a href="/timesheet/libur">Holiday</a>
                                    </li>
									<li className="active">
										Insert Holiday
									</li>
								</ol>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm-12">
                                <div className="card-box">
            			            <h4 className="m-t-0 header-title"><b>Holiday Form</b></h4>
                                    <div className="row">
										<div className="col-lg-6">
                                            <form className="form-horizontal group-border-dashed" onSubmit={this.handleSubmit}>
                                                <div className="form-group">
                                                    <label className="col-md-2 control-label">Holiday Name</label>
                                                    <div className="col-md-8">
                                                        <input type="text" name="nama" className="form-control" required placeholder="Name" onChange={this.handleChange} />
                                                    </div>
                                                </div>

                                                <div className="form-group">
                                                    <label className="col-md-2 control-label">Date</label>
                                                    <div className="col-md-8">
                                                        {/* <div className="input-daterange input-group">
                                                            <input type="date" className="form-control" required name="tglMulai" onChange={this.handleChange} />
                                                            <span className="input-group-addon bg-custom b-0 text-white">to</span>
                                                            <input type="date" className="form-control" required name="tglAkhir" onChange={this.handleChange} />
                                                        </div> */}
                                                        <div className="input-group">
                                                            <input type="text" className="form-control" onClick={this.onToggle} readOnly placeholder={this.state.dateValue.start.format('YYYY-MM-DD')}/>
                                                            <span className="input-group-addon bg-custom b-0 text-white">to</span>
                                                            <input type="text" className="form-control" onClick={this.onToggle} readOnly placeholder={this.state.dateValue.end.format('YYYY-MM-DD')} />
                                                        </div>

                                                        {this.state.isOpen && (
                                                            <DateRangePicker
                                                                value={this.state.dateValue}
                                                                onSelect={this.onSelect}
                                                                singleDateRange={true}
                                                            />
                                                        )}
                                                        {console.log(this.state.dateValue.start.format("YYYY-MM-DD"))}
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

export default InsertLibur;