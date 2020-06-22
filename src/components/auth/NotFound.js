import React, { Component } from 'react';

class NotFound extends Component {
    render(){
        return(
            <div class="wrapper-page">
                <div class="ex-page-content text-center">
                    <div class="text-error"><span class="text-primary">4</span><span class="text-pink">0</span><span class="text-info">4</span></div>
                    <h2>Not Found</h2><br/>
                    <p class="text-muted">Where are you going?</p>
                    <br/>
                    <a class="btn btn-default waves-effect waves-light" href="/dashboard"> Return Home</a>
                    
                </div>
            </div>
        );
    }
}

export default NotFound;