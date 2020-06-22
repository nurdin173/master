import React, { Component } from 'react';
import {APPROVE_PRIVILAGES} from '../../_helpers/constant';

class Annual extends Component {
    render(){
        const {isAdmin, isSuperAdmin} = this.props;
        var val = false;
        if(JSON.parse(localStorage.getItem('user')).idCompanyUnitPosisi.idUnit != null){
            if((JSON.parse(localStorage.getItem('user')).idCompanyUnitPosisi.idUnit.unit === APPROVE_PRIVILAGES)){
                val = true;
            }
        }
        return(
            <li>
                <a href="#" className="waves-effect "><i className="ti-agenda"></i> <span> Annual </span> <span className="menu-arrow"></span></a>
                <ul className="list-unstyled treeview-menu">
                    <li>
                        <a href={"/annual/form"}  className="waves-effect">Annual Form</a>
                    </li>
                    { (isAdmin || isSuperAdmin 
                        || val) &&
                    <>
                        <li>
                            <a href={"/annual/list"} className="waves-effect">Annual List</a>
                        </li>
                        <li>
                            <a href={"/annual/request"} className="waves-effect">Annual Request</a>
                        </li>
                    </>
                    }
                </ul>
            </li>
        );
    }
}

export default Annual;