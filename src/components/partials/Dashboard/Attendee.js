import React from 'react'

export default class Attendee extends React.Component{
    render(){
        return(
        <div class="card-box">
            <h4 class="text-dark header-title m-t-0 m-b-30">Total Revenue</h4>

            <div class="widget-chart text-center">
                <div id="sparkline3"></div>
                <ul class="list-inline m-t-15">
                    <li>
                        <h5 class="text-muted m-t-20">Target</h5>
                        <h4 class="m-b-0">$1000</h4>
                    </li>
                    <li>
                        <h5 class="text-muted m-t-20">Last week</h5>
                        <h4 class="m-b-0">$523</h4>
                    </li>
                    <li>
                        <h5 class="text-muted m-t-20">Last Month</h5>
                        <h4 class="m-b-0">$965</h4>
                    </li>
                </ul>
            </div>
        </div>
        );
    }
}