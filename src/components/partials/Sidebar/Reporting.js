import React, { Component } from 'react';

class Report extends Component {
    render(){
        return(
            <li className="has_sub treeview">
                <a href="#" className="waves-effect"><i className="ti-agenda"></i> <span> Reporting</span> <span className="menu-arrow"></span></a>
                <ul className="list-unstyled treeview-menu">
                    <li><a href={'/report/attendee'} className="waves-effect">Report Attendee</a></li>
                    <li><a href={'/report/annual'} className="waves-effect">Report Annual</a></li>
                </ul>
            </li>
        );
    }
}

export default Report;