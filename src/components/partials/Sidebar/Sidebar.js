import React, { Component } from 'react';
import Dashboard from './Dashboard';
import TimeSheet from './TimeSheet';
import Employee from './Employee';
import Annual from './Annual';
import Unit from './Unit';
import Posisi from './Posisi';
import Company from './Company';
import Reporting from './Reporting';
import Attendee from './Attendee';
import "./../Header/ScrollbarPage.css";

let user = JSON.parse(localStorage.getItem('user'));

class Sidebar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isSuperAdmin: false,
            isAdmin: false
        };
    }

    componentDidMount() {
        if(user.idTipeUser.tipe === 'Super Admin') {
            this.setState({
                isSuperAdmin: true
            })
        } else if(user.idTipeUser.tipe === 'Admin'){
            this.setState({
                isAdmin: true
            })
        }
    }

    render(){
        const { isSuperAdmin, isAdmin } = this.state;
        const scrollNavigasi = { width:"auto", maxHeight: "100% auto" }
        return(
            <div className="left side-menu" >
                <div className="sidebar sidebar-inner slimscrollleft mx-auto" style={scrollNavigasi}>
                    <div id="sidebar-menu">
                        <ul>
                            <li className="text-muted menu-title">Navigation</li>
                            <Dashboard />
                            <Attendee 
                                isSuperAdmin={isSuperAdmin}
                            />
                            <Company />
                            <Annual 
                                isSuperAdmin={isSuperAdmin}
                                isAdmin={isAdmin}
                            />
                            <TimeSheet />
                            { isSuperAdmin && 
                                <>
                                <Unit />
                                <Posisi />
                                </>
                            }
                            { (isAdmin || isSuperAdmin) && 
                                <>
                                <Employee />
                                <Reporting />
                                </>
                            }
                        </ul>
                        <div className="clearfix"></div>
                    </div>
                    <div className="clearfix"></div>
                </div>
            </div>
        );
    }
} 

export default Sidebar;

