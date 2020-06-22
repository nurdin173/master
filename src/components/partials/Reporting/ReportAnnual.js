import React, { Component } from 'react';
import DateRangePicker from 'react-daterange-picker';
import "react-daterange-picker/dist/css/react-calendar.css";
import { Link } from 'react-router-dom';
import originalMoment from "moment";
import { extendMoment } from "moment-range";
import { MDBDataTable } from 'mdbreact';
import axios from 'axios';
import * as Constant from '../../_helpers/constant';

const moment = extendMoment(originalMoment);

let user = JSON.parse(localStorage.getItem('user'));

class ReportAnnual extends Component {
    constructor(props) {
        super(props);
        const today = moment();  
         
        this.state = {
            items: [],
            isLoading: false,
            submitted: false,
            value: moment.range(today.clone().subtract(7, "days"), today.clone())
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onSelect = (value, states) => {
        this.setState({ value, states, isOpen: false });
    };

    onToggle = () => {
        this.setState({ isOpen: !this.state.isOpen });
    };

    handleSubmit = event => {
        event.preventDefault();
        this.requestAnnual();
        this.setState({ 
            submitted:true, isLoading: true
        });
    }

    requestAnnual = async() => {
        await axios.request(Constant.API_LIVE + '/annual/recap/start-date/' + this.state.value.start.format('YYYY-MM-DD') + '/end-date/' + this.state.value.end.format('YYYY-MM-DD'), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => response.data)
        .then(data =>  {
            this.setState({ items: data })
        })
        .then(async() => {
            this.setState({ tableRows:this.assemblePosts(), isLoading:false })
        })
    }

    assemblePosts= () => {
        const {value} = this.state;
        let items = this.state.items.map((annual) => {
            return (
                {
                    namaUser:annual.namaUser,
                    unit:annual.unit == null ? "-" : annual.unit,
                    posisi:annual.posisi == null ? "-" : annual.posisi,
                    sisaCuti:annual.sisaCuti,
                    tahun:annual.tahun,
                    detail: <Link to={{pathname: "/report/annual/detail", data: {annual, value}}} className="btn btn-inverse" key={annual.id} ><i className="fa fa-user"></i></Link>
                }
            )
        });

        return items;
    }

    downloadAsPDF = () => {
		fetch(Constant.API_LIVE + '/annual/recap/start-date/' + this.state.value.start.format('YYYY-MM-DD') + '/end-date/' + this.state.value.end.format('YYYY-MM-DD')+'/report/pdf',{
            
                headers:{
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
        })
		.then(response => {
            if (response.ok){
                response.blob([response.data], 
                    {type: 'application/pdf'}).then(blob => {
                    var fileDownload = require('js-file-download');
                    fileDownload(blob, 'report-annual-leave.pdf');
                })
            }else{
                console.log(response.status)
            };
		}).catch(error=>
            console.log(error)
        );
    }
    
    downloadAsExcel = () => {
		fetch(Constant.API_LIVE + '/annual/recap/start-date/' + this.state.value.start.format('YYYY-MM-DD') + '/end-date/' + this.state.value.end.format('YYYY-MM-DD')+'/report/excel',{
            
                headers:{
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
        })
		.then(response => {
            if (response.ok){
                response.blob([response.data], 
                    {type: 'application/vnd.ms-excel'}).then(blob => {
                    var fileDownload = require('js-file-download');
                    fileDownload(blob, 'report-annual-leave.xlsx');
                })
            }else{
                console.log(response.status)
            };
		}).catch(error=>
            console.log(error)
        );
	}
    
	render() {
        const data = {
            columns: [
                {
                    label: 'Nama User',
                    field: 'namaUser'
                },
                {
                    label: 'Unit',
                    field: 'unit'
                },
                {
                    label: 'Posisi',
                    field: 'posisi'
                },
                {
                    label: 'Sisa Cuti',
                    field: 'sisaCuti'
                },
                {
                    label: 'Tahun',
                    field: 'tahun'
                },
                {
                    label: 'Detail',
                    field: 'detail'
                }
            ],

            rows:this.state.tableRows,
        }
        const { submitted, isLoading } = this.state;
		return (
        <div className="content-page">
            <div className="content">
                <div className="container">

                    <div className="row">
                        <div className="col-sm-12">
                            <h4 className="page-title">Report Annual</h4>
                            <ol className="breadcrumb">
                                <li>
                                    <a href="#">Report</a>
                                </li>
                                <li className="active">
                                    Annual
                                </li>
                            </ol>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card-box table-responsive">
                                <h4 className="m-t-0 header-title"><b>Report Annual List</b></h4>
                                <div className="btn-group pull-right m-t-15">
                                        <button type="button" className="btn btn-default dropdown-toggle waves-effect waves-light" data-toggle="dropdown" aria-expanded="false">Export <span className="m-l-5"><i className="fa fa-cog"></i></span></button>
                                        <ul className="dropdown-menu drop-menu-right" role="menu">
                                            <li><a href="#" onClick={this.downloadAsPDF}>PDF</a></li>
                                            <li><a href="#" onClick={this.downloadAsExcel}>Excel</a></li>
                                        </ul>
                                    </div>

                                <form className="form-horizontal" id="basic-form" onSubmit={this.handleSubmit}>
                                    <div className="form-row">
                                        <div className="form-group clearfix">
                                            <div className="col-sm-6">
                                                <label className="control-label">Date Range</label>
                                                <div className="input-group" >
                                                    <input type="text" className="form-control" onClick={this.onToggle} readOnly placeholder={this.state.value.start.format('YYYY-MM-DD')}/>
                                                    <span className="input-group-addon bg-custom b-0 text-white">to</span>
                                                    <input type="text" className="form-control" onClick={this.onToggle} readOnly placeholder={this.state.value.end.format('YYYY-MM-DD')} />
                                                </div>

                                                {this.state.isOpen && (
                                                <DateRangePicker
                                                    value={this.state.value}
                                                    onSelect={this.onSelect}
                                                    singleDateRange={true}
                                                    />
                                                )}
                                            </div>
                                        </div>
                    
                                        <div className="form-group">
                                            <button type="submit" className="btn btn-primary">
                                                { isLoading &&  <i className="spinner-border"> </i> }
                                                { isLoading &&  <span> Loading </span> }
                                                { !isLoading &&  <span> Search </span> }
                                            </button>
                                        </div>
                                    </div>  
                                </form>
                                    <hr />
                                    <MDBDataTable striped bordered data={data} />
                            </div>
                        </div>
                    </div>
            
                </div>
            </div>
        </div>
		)
	}

}

export default ReportAnnual;