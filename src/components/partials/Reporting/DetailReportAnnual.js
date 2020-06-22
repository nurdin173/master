import React, { Component } from 'react';
import "react-daterange-picker/dist/css/react-calendar.css";
import originalMoment from "moment";
import { extendMoment } from "moment-range";
import { MDBDataTable } from 'mdbreact';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import * as Constant from '../../_helpers/constant';

const moment = extendMoment(originalMoment);

class DetailReportAnnual extends Component {
    constructor(props) {
        super(props);      
        this.state = {
            items: [],
            isLoading: false,
            submitted: false,
        }
    }

    componentDidMount() {
        this.requestAnnual();
    }

    requestAnnual = async() => {
        const data = {
            userCompany: {
                idUser: {
                    id: this.props.location.data.annual.id
                }
            },
            tglMulai: originalMoment(this.props.location.data.value.start.format('YYYY-MM-DD'), 'YYYY-MM-DD').format('YYYY-MM-DD'),
            tglAkhir: originalMoment(this.props.location.data.value.end.format('YYYY-MM-DD'), 'YYYY-MM-DD').format('YYYY-MM-DD')
        }
        await axios.post(Constant.API_LIVE + '/annual/recap', data, {
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
        let items = this.state.items.map((item) => {
            return (
                {
                    namaUser: item.userCompany.idUser.nama,
                    unit: item.userCompany.idCompanyUnitPosisi.idUnit == null ? "-" : item.userCompany.idCompanyUnitPosisi.idUnit.unit,
                    posisi: item.userCompany.idCompanyUnitPosisi.idPosisi == null ? "-" : item.userCompany.idCompanyUnitPosisi.idPosisi.posisi,
                    tglMulai: item.tglMulai == null ? "-" : moment(item.tglMulai, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD'),
                    tglAkhir: item.tglAkhir == null ? "-" : moment(item.tglAkhir, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD'),
                    keterangan: item.keterangan == null ? "-" : item.keterangan,
                    status: item.status.status
                }
            )
        });

        return items;
    }

    render(){
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
                    label: 'Tanggal Mulai',
                    field: 'tglMulai'
                },
                {
                    label: 'Tanggal Akhir',
                    field: 'tglAkhir'
                },
                {
                    label: 'Keterangan',
                    field: 'keterangan'
                },
                {
                    label: 'Status',
                    field: 'status'
                }
            ],

            rows:this.state.tableRows,
        }
        return(
            <div>
                <div className="content-page">
                    <div className="content">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="btn-group pull-right m-t-15">
                                        <NavLink to='/report/annual'>
                                            <button type="button" className="btn btn-default btn-rounded waves-effect waves-light">
                                                <span className="btn-label"><i className="fa fa-arrow-left"></i></span>
                                                Back
                                            </button>
                                        </NavLink>
                                    </div>
                                    <h4 className="page-title">Report Annual</h4>
                                    <ol className="breadcrumb">
                                        <li>
                                            <a href="/dashboard">Dashboard</a>
                                        </li>
                                        <li>
                                            <a href="/report/annual">Annual</a>
                                        </li>
                                        <li className="active">
                                            Detail Report
                                        </li>
                                    </ol>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="card-box table-responsive">
                                        <h4 className="m-t-0 header-title"><b>Detail Report Annual {this.props.location.data.annual.name}</b></h4>
                                        <hr />
                                        <MDBDataTable striped bordered data={data} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <footer className="footer">
                        © 2016. All rights reserved.
                    </footer>

                </div>
            </div>
        );
    }
}

export default DetailReportAnnual;