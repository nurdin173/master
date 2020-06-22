import React, { Component } from 'react';

class Employee extends Component {
    render(){
        return(
            <li className="has_sub treeview">
                <a href="#" className="waves-effect"><i className="ti-user"></i> <span> Employee</span> <span className="menu-arrow"></span></a>
                <ul className="list-unstyled treeview-menu">
                    <li><a href={'/employee'} className="waves-effect">List Employee</a></li>
                    <li><a href={'/employee/form'} className="waves-effect">Add Employee</a></li>
                </ul>
            </li>
        );
    }
}

export default Employee;