import React, { Component } from 'react';

class Sidebar extends Component {
    render(){
        return(
            <li>
                <a href={'/dashboard'} className="waves-effect"><i className="ti-home"></i> <span> Dashboard </span></a>
            </li>
        );
    }
}

export default Sidebar;