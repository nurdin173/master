import React, { Component } from 'react';
import axios from 'axios';
import { MDBDataTable } from 'mdbreact';
import * as Constant from '../../_helpers/constant';

let user = JSON.parse(localStorage.getItem('user'));

class ListNotifications extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            unit:  user.idCompanyUnitPosisi.idUnit == null ? null : user.idCompanyUnitPosisi.idUnit.unit
        }
    }

    componentDidMount = async() => {

        if(this.state.unit === 'HR'){
            await axios.get(Constant.API_LIVE + '/notification/' , {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(response => response.data)
            .then(data => {
                this.setState({ items: data })
            })
            .then(async() => {
                this.setState({ tableRows: this.assemblePosts() })
            })
        } else {
            // const filter = {
            //     request: {
            //         userCompany: {
            //             idUser: {
            //                 id: user.idUser.id
            //             }
            //         }
            //     }
            // }
            const filter = {
                request: {
                    userCompany: {
                        idCompanyUnitPosisi: {
                            idCompany: {
                                id: user.idCompanyUnitPosisi.idCompany.id
                            },
                            idUnit: {
                                unit: null
                            },
                            idPosisi: {
                                posisi: null
                            }
                        },
                        idUser: {
                            id: user.idUser.id
                        }
                    },
                    kode: null,
                    status: {
                        status: 'Request'
                    }
                },
                status: {
                    status: null
                }
            }
            await axios.post(Constant.API_LIVE + '/notification/approval', filter, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(response => response.data)
            .then(data => {
                this.setState({ items: data })
            })
            .then(async() => {
                this.setState({ tableRows: this.assemblePosts() })
            })
        }
    }

    assemblePosts = () => {
        let items = this.state.items.map((notif, index) => {
            return(
                {
                    nomor: index + 1,
                    user: notif.request.createdBy.nama,
                    tanggal: notif.request.createdAt,
                    keterangan: notif.request.keterangan,
                    status: notif.request.status.status
                }
            );
        });

        return items;
    }

    render(){
        const data = {
            columns: [
                {
                    label: '#',
                    field: 'nomor'
                },
                {
                    label: 'Nama',
                    field: 'user'
                },
                {
                    label: 'Tanggal Request',
                    field: 'tanggal'
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

            rows: this.state.tableRows,
        }
        return(
            <>
                <div className="content-page">
                <div className="content">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <h4 className="page-title">Notifications</h4>
                                <ol className="breadcrumb">
                                    <li>
                                        <a href="#">Attendee Application</a>
                                    </li>
                                    <li className="active">
                                        Notifications List
                                    </li>
                                </ol>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="card-box table-responsive">
                                    <h4 className="m-t-0 header-title"><b>Notifications List</b></h4>
                                    {/* <br />
                                    <NavLink to={'/position/form'}><button type="button" className="btn btn-default btn-rounded waves-effect waves-light">Create</button></NavLink> */}
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
            </>
        );
    }
}

export default ListNotifications;