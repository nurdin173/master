import React, { Component } from 'react';
// import Profile from './Profile';
import axios from 'axios';
import swal from 'sweetalert';
import "./../../auth/SpinnerLoader.css";
import * as Constant from '../../_helpers/constant';

let user = JSON.parse(localStorage.getItem('user'));

class DetailAnnual extends Component {
    constructor(props) {
        super(props);

        this.handleApprove = this.handleApprove.bind(this);
        this.handleReject = this.handleReject.bind(this);
        if(this.props.location.data == null) {
            window.location.href = '/bad-request'
        }
        this.state = {
            namauser: '',
            tglMulai: '',
            tglAkhir: '',
            keterangan: '',
            isLoading: false,
            redirect: false,
        }
    }

    handleApprove(annual) {
        this.setState({
            isLoading:true
        });
        this.approve(annual);
    }

    handleReject(annual) {
        this.setState({
            isLoading:true
        });
        this.reject(annual);
    }

    approve(annual){
        fetch(Constant.API_LIVE + '/request/Approved', {
            method: 'PATCH',
            body: JSON.stringify(annual),
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(res => { res.json()
            if (res.ok){
                this.setState({ isLoading: false })
                swal("Success!", "Data Annual Request has been Approved!", "success")
                .then(function() {
                    window.location.href = "/annual/request";
                })
            }else{
                swal("Failed!", "Failed to Update Annual Request", "error")
                this.setState({ isLoading: false })
            }
        })
        .catch(error => console.error('Error:', error))
    }

    reject(annual) {
        fetch(Constant.API_LIVE + '/request/Rejected', {
            method: 'PATCH',
            body: 
            JSON.stringify(annual),
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(res => { res.json()
            if (res.ok){
                this.setState({ isLoading: false })
                swal("Success!", "Data Annual Request has been Rejected!", "success")
                .then(function() {
                    window.location.href = "/annual/request";
                })
            }else{
                swal("Failed!", "Failed to Update Annual Request", "error")
                this.setState({ isLoading: false })
            }
        })
        .catch(error => console.error('Error:', error))
    }

    render() {
        const { data } = this.props.location;
        const { redirect, isLoading } = this.state;
        if(redirect){
            window.location.href = '/report/annual';
        }
        return(
            <>
            <div className="content-page">
                    <div className="content">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-12">
                                    {/* <div className="btn-group pull-right m-t-15">
                                        <button type="button" className="btn btn-default dropdown-toggle waves-effect waves-light" data-toggle="dropdown" aria-expanded="false"><span className="m-l-5"><i className="fa fa-chevron-circle-left"></i></span> Back To List Request</button>
                                    </div> */}
                                    <h4 className="page-title">Detail Annual</h4>
                                    <ol className="breadcrumb">
                                        <li>
                                            <a href="#">Attendee Application</a>
                                        </li>
                                        <li>
                                            <a href="#">Annual</a>
                                        </li>
                                        <li className="active">
                                            Detail Annual
                                        </li>
                                    </ol>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="card-box table-responsive">
                                    <h4 className="m-t-0 header-title"><b>Detail Annual Employee </b>
                                        {
                                            data.request.status.status == 'Approved' ?
                                                <small className="font-600" style={{color: 'green'}}>Approved</small>
                                            : data.request.status.status == 'Rejected' ?
                                                <small className="font-600" style={{color: 'red'}}>Rejected</small>
                                            : <small></small>
                                        }
                                        </h4>
                                        <hr />
                                            <div className="form-group clearfix">
                                                <label className="col-sm-2 control-label" >NIK</label>
                                                <div className="col-lg-6">
                                                    <input type="text" id="kode" name="kode" className="form-control" disabled value={data.request.userCompany.idUser.kode} placeholder="NIK"/>
                                                </div>
                                            </div>

                                            <div className="form-group clearfix">
                                                <label className="col-md-2 control-label" >Nama</label>
                                                <div className="col-lg-6">
                                                    <input type="text" id="nama" name="nama" className="form-control"  disabled value={data.request.userCompany.idUser.nama} placeholder="Nama"/>
                                                </div>                                    
                                            </div>
		                            
                                            <div className="form-group clearfix">
                                                <label className="col-md-2 control-label">Tanggal Cuti</label>
                                                <div className="col-lg-6">
                                                <div>
                                                    {/* {this.renderSelectionValue()} */}
                                                    <div className="input-group">
                                                        <input type="text" className="form-control" disabled placeholder={data.request.tglMulai} value={data.request.tglMulai} />
                                                        <span className="input-group-addon bg-custom b-0 text-white"> sampai </span>
                                                        <input type="text" className="form-control"disabled  placeholder={data.request.tglAkhir} value={data.request.tglAkhir} />
                                                    </div>
                                                </div>
                                                </div>
                                            </div>

                                            <div className="form-group clearfix">
                                                <label className="col-md-2 control-label">Keterangan Cuti</label>
                                                <div className="col-lg-6">
                                                    <textarea className="form-control" name="keterangan" disabled value={data.request.keterangan} rows="6"></textarea>
                                                </div>
                                            </div>

                                            <div className="form-group clearfix">
                                                <a className="col-md-2 control-label"   />
                                                <div className="col-sm-2 control-label">
                                                </div>
                                            </div>
                                            {
                                                data.request.status.status == "Request" && user.idCompanyUnitPosisi.idUnit.unit === 'HR' ?
                                                <div>
                                                    <div className="form-group clearfix">
                                                        <div className="control-label">
                                                            <button type="submit" className="btn btn-default waves-effect waves-light btn-md" id="sa-warning" value={data.request} onClick={() => this.handleApprove(data.request)} disabled={isLoading}> 
                                                                { isLoading && <i className="spinner-border"> </i> }
                                                                { isLoading && <span> Loading </span> }
                                                                { !isLoading && <span> Approve </span> }
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="form-group clearfix">
                                                        <div className="control-label">
                                                            <button type="submit" className="btn btn-danger waves-effect waves-light btn-md" id="sa-warning" value={data.request} onClick={() => this.handleReject(data.request)} disabled={isLoading}>
                                                                { isLoading && <i className="spinner-border"> </i> }
                                                                { isLoading && <span> Loading </span> }
                                                                { !isLoading && <span> Reject </span> }  
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                : <div></div>
                                            }
                                        {/* </form> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <footer className="footer">
                        © 2016. All rights reserved.
                    </footer>

                </div>
            </>
        );
    }
}

export default DetailAnnual;