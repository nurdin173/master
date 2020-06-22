import React, { Component } from 'react';
import "react-daterange-picker/dist/css/react-calendar.css";
import originalMoment from "moment";
import { extendMoment } from "moment-range";
import { MDBDataTable } from 'mdbreact';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import * as Constant from '../../_helpers/constant';

const moment = extendMoment(originalMoment);

class DetailReportAttendee extends Component {
    constructor(props) {
        super(props);      
        this.state = {
            items: [],
            isLoading: false,
            submitted: false,
        }
    }

    componentDidMount() {
        this.requestAttendee();
    }

    requestAttendee = async() => {
        const data = {
            idUserShiftProject: {
                userCompany: {
                    idUser: {
                        id: this.props.location.data.attendee.id
                    }
                }
            },
            masuk: originalMoment(this.props.location.data.value.start.format('YYYY-MM-DD'), 'YYYY-MM-DD').format('YYYY-MM-DD HH:mm:ss'),
            pulang: originalMoment(this.props.location.data.value.end.format('YYYY-MM-DD'), 'YYYY-MM-DD').format('YYYY-MM-DD HH:mm:ss')
        }
        await axios.post(Constant.API_LIVE + '/attendee/recap', data, {
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
                    namaUser: item.idUserShiftProject.userCompany.idUser.nama,
                    project: item.idUserShiftProject.shiftProject.project.namaProject,
                    shiftMasuk: item.idUserShiftProject.shiftProject.shift.masuk,
                    shiftPulang: item.idUserShiftProject.shiftProject.shift.pulang,
                    tanggal: item.masuk == null ? "-" : moment(item.masuk, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD'),
                    jamMasuk: item.masuk == null ? "-" : moment(item.masuk, 'YYYY-MM-DD HH:mm:ss').format('HH:mm:ss'),
                    lokasiMasuk: item.lokasiMasuk == null ? "-" : item.lokasiMasuk,
                    jamPulang: item.pulang == null ? "-" : moment(item.pulang, 'YYYY-MM-DD HH:mm:ss').format('HH:mm:ss'),
                    lokasiPulang: item.lokasiPulang == null ? "-" : item.lokasiPulang,
                    keterangan: item.keterangan == null ? "-" : item.keterangan
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
                    label: 'Project',
                    field: 'project'
                },
                {
                    label: 'Shift Masuk',
                    field: 'shiftMasuk'
                },
                {
                    label: 'Shift Pulang',
                    field: 'shiftPulang'
                },
                {
                    label: 'Tanggal',
                    field: 'tanggal'
                },
                {
                    label: 'Jam Masuk',
                    field: 'jamMasuk'
                },
                {
                    label: 'Lokasi Masuk',
                    field: 'lokasiMasuk'
                },
                {
                    label: 'Jam Pulang',
                    field: 'jamPulang'
                },
                {
                    label: 'Lokasi Pulang',
                    field: 'lokasiPulang'
                },
                {
                    label: 'Keterangan',
                    field: 'keterangan'
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
                                        <NavLink to='/report/attendee'>
                                            <button type="button" className="btn btn-default btn-rounded waves-effect waves-light">
                                                <span className="btn-label"><i className="fa fa-arrow-left"></i></span>
                                                Back
                                            </button>
                                        </NavLink>
                                    </div>
                                    <h4 className="page-title">Report Attendee</h4>
                                    <ol className="breadcrumb">
                                        <li>
                                            <a href="/dashboard">Dashboard</a>
                                        </li>
                                        <li>
                                            <a href="/report/attendee">Attendee</a>
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
                                        <h4 className="m-t-0 header-title"><b>Detail Report Attendee {this.props.location.data.attendee.name}</b></h4>
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

export default DetailReportAttendee;