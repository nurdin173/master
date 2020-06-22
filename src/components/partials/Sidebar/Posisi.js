import React, { Component } from 'react';

class Posisi extends Component {
    render(){
        return(
            <li>
                <a href={'/position'} className="waves-effect"><i className="icon-people"></i> <span> Position </span></a>
            </li>
        );
    }
}

export default Posisi;