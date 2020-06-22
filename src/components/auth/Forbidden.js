import React from 'react'

export default function Forbidden(){
    return(
        <div class="wrapper-page">
            <div class="ex-page-content text-center">
                <div class="text-error"><span class="text-primary">4</span><i class="ti-face-sad text-pink"></i><span class="text-info">3</span></div>
                <h2>Forbidden</h2><br/>
                <p class="text-muted">You don't have permission to access this page.</p>
                <br/>
                <a class="btn btn-default waves-effect waves-light" href='/'> Return Home</a>
            </div>
        </div>
    );
}