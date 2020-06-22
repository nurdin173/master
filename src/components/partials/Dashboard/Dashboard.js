import React, { Component } from 'react';
import LeaveRequest from './LeaveRequest';
import Attendee from './Attendee';

class Dashboard extends Component {
    render(){
        return(
            <div className="content-page">
                <div className="content">
                    <div className="container">
                    <div class="row">
							<div class="col-sm-12">
								<h4 class="page-title">Dashboard</h4>
								<ol class="breadcrumb">
									<li>
										<a href="/dashboard">Dashboard</a>
									</li>
								</ol>
							</div>
						</div>
                        <div class="row">
                            <div class="col-lg-5">
                        	    <LeaveRequest/>
                            </div>
                            <div class="col-lg-4">
                                <Attendee/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;