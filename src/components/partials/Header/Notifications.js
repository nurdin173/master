import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import Profile from './Profile';
import axios from 'axios';
import "./ScrollbarPage.css";
import * as Constant from '../../_helpers/constant';

let user = JSON.parse(localStorage.getItem('user'));

class Notifications extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            unit: user.idCompanyUnitPosisi.idUnit == null ? null : user.idCompanyUnitPosisi.idUnit.unit,
            posisi: null,
            company: user.idCompanyUnitPosisi.idCompany.nama
        }
    }
    
    getAllNotification() {
        // const filter = {
        //     request: {
        //         status: {
        //             status: 'Request'
        //         }
        //     }
        // }

        const filter = {
            request: {
                userCompany: {
                    idCompanyUnitPosisi: {
                        idCompany: {
                            id: null
                        },
                        idUnit: {
                            unit: null
                        },
                        idPosisi: {
                            posisi: null
                        }
                    },
                    idUser: {
                        id: null
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
        
        axios.post(Constant.API_LIVE + '/notification/request', filter, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => response.data)
        .then(data => {
            this.setState({ items: data })
        })
        .catch(error => console.log('Error: ', error));
    }

    componentDidMount() {
        if(this.state.unit === 'HR'){
            this.getAllNotification();
        } else {
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
                    status: 'Unread'
                }
            }
            axios.post(Constant.API_LIVE + '/notification/approval', filter, {
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(response => response.data)
            .then(data => {
                this.setState({ items: data })
            })
            .catch(error => console.log('Error: ', error));
        }
    }

    handleRead(notif) {
        fetch(Constant.API_LIVE + '/notification', {
            method: 'PATCH',
            body: JSON.stringify(notif),
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(res => res.json())
        .catch(error => console.error('Error: ', error))
    }

    render(){
        const { items } = this.state;
        const scrolleContainerStyle = { width:"300px auto", maxHeight: "200px" };
        return(
            <li className="dropdown top-menu-item-xs">
                <a href="#" data-target="#" className="dropdown-toggle waves-effect waves-light" data-toggle="dropdown" aria-expanded="true">
                    <i className="icon-bell"></i> 
                    {
                        items.length > 0 ? 
                        <span className="badge badge-xs badge-danger">{ items.length }</span>
                        : <span></span>
                    }
                </a>
                <ul className="dropdown-menu dropdown-menu-lg">
                    <li className="notifi-title">Notification</li>
                    <li className="list-group slimscroll-noti notification-list">
                        <div className="scrollbar mx-auto" style={scrolleContainerStyle}>
                            {
                                items.length > 0 ? items.map((notif, index) => {
                                    return(
                                        <Link to={{
                                            pathname: "/annual/detail",
                                            data: notif
                                        }} value={notif} onClick={() => this.handleRead(notif)} className="list-group-item" key={notif.id} >
                                            <div className="media">
                                                <div className="pull-left p-r-10">
                                                    <em className="fa fa-check-square-o noti-primary"></em>
                                                </div>
                                                <div className="media-body">
                                                    <h5 className="media-heading">Annual Request</h5><small>Date Request: { notif.request.createdAt }</small>
                                                    <p className="m-0">
                                                        <small>From: { notif.request.createdBy.nama }</small>
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                }) : 
                                <div className="list-group-item text-right">
                                    <small className="font-1000">You don't have new notification</small>
                                </div>
                            }
                        </div>
                    </li>
                    <li>
                        <a href={'/notifications'} className="list-group-item text-right">
                            <small className="font-600">See all notifications</small>
                        </a>
                    </li>
                </ul>
            </li>
        );
    }
}

export default Notifications;