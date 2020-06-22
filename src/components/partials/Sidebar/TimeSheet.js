import React, { Component } from 'react';

class TimeSheet extends Component {
    render(){
        return(
            <li className="has_sub treeview">
                <a href="#" className="waves-effect"><i className="ti-alarm-clock"></i> <span> Time Sheet</span> <span className="menu-arrow"></span></a>
                <ul className="list-unstyled treeview-menu">
                    <li><a href={'/timesheet/shift'} className="waves-effect">Shift</a></li>
                    <li><a href={'/timesheet/project'} className="waves-effect">Project</a></li>
                    <li><a href={'/timesheet/libur'} className="waves-effect">Libur</a></li>
                </ul>
            </li>
        );
    }
}

export default TimeSheet;