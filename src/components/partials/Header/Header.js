import React, { Component } from 'react';
import Navbar from './Navbar';
import Notifications from './Notifications';
import Profile from './Profile';

export default class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            scriptLoaded: false,
            scriptError: false,
        }
    }

    render(){
        return(
            <>
            <div className="topbar">
                <div className="topbar-left">
                    <div className="text-center">
                        <a href="#" className="logo">
                            <i className="icon-magnet icon-c-logo"></i><span>Attendee</span>
                        </a>
                    </div>
                </div>
                <div  className="navbar navbar-default" role="navigation">
                    <div  className="container">
                        <div className="">
                            <Navbar/>
                                <ul className="nav navbar-nav navbar-right pull-right">
                                    <Notifications />
                                    <Profile />
                                </ul> 
                            </div>
                        </div>
                </div>
            </div>
            </>
        );
    }
}