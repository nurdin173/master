import React, { Component } from 'react';

class Attendee extends Component {
    render(){
        return(
            <li className="has_sub treeview">
                <a href="#" className="waves-effect"><i className="ti-user"></i> <span> Attendee</span> <span className="menu-arrow"></span></a>
                <ul className="list-unstyled treeview-menu">
                    <li><a href={'/attendee/absen'} className="waves-effect">Absen</a></li>
                    <li><a href={'/attendee/detail'} className="waves-effect">Daily Detail</a></li>
                </ul>
            </li>
        );
    }
}

export default Attendee;