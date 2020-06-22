import React from 'react'
import axios from 'axios';
import * as Constant from '../../_helpers/constant';

export default class LeaveRequest extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            requests: []
        }
    }

    componentWillMount(){
        axios.get(Constant.API_LIVE + '/request/'+"Approved" , {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => response.data)
        .then(data => {
            this.setState({ requests: data })
        })
    }

    render(){
        return(
            <div class="card-box">
                <h4 class="m-t-0 m-b-20 header-title"><b>Leave Request</b></h4>
                <ul class="list-unstyled transaction-list">
                    {this.state.requests.map(request =>{
                        return(
                        <li>
                            <span class="tran-text">{request.keterangan}</span>
                            <span class="pull-right label label-success tran-price">{request.status.status}</span>
                            <span class="pull-right text-muted">{request.tglMulai} - {request.tglAkhir}</span>
                            <span class="clearfix"></span>
                        </li>)
                    })}
                </ul>
            </div>
        );
    }
}