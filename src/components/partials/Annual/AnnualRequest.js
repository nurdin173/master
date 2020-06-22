import React, { Component } from "react";
import * as Constant from '../../_helpers/constant';
import swal from 'sweetalert';
import axios from 'axios';
import { MDBDataTable } from 'mdbreact';


let token = localStorage.getItem('token');
class AnnualRequest extends Component {    
    constructor(props){
        super(props);

        this.handleApprove = this.handleApprove.bind(this);
        this.handleReject = this.handleReject.bind(this);
        this.state = {
            isLoading:false
        };
    }

    handleApprove (annual) {
        console.log(annual);  
        this.Approve(annual);
    };

    handleReject(annual){
        this.Reject(annual);
    };

    Approve(annual){
        fetch(Constant.API_LIVE +'/request/Approved', {
                method: 'PATCH',
                body: 
                    JSON.stringify(annual)
                ,
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(res => {res.json()
                
                if (res.ok){
                    swal("Success!", "Berhasil Menyetujui !", "success")
                    this.componentDidMount()
                    
                }else{
                    swal("Failed!", "Gagal Menyetujui!", "error")
                    
                    console.log(res.status)
                }})
            .catch(error => {console.error('Error:', error)
                swal("Failed!", "Gagal Menyetujui!", "error")
               
            })
            .then(response => console.log('Success:', response)
        ); 
    }

    Reject(annual){
        fetch(Constant.API_LIVE +'/request/Rejected', {
                method: 'PATCH',
                body: 
                    JSON.stringify(annual)
                ,
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(res => {res.json()
                
                if (res.ok){
                    swal("Success!", "Berhasil Menolak !", "success")
                    this.componentDidMount()
                    
                }else{
                    swal("failed!", "Gagal Menolak !", "error")
                    
                    console.log(res.status)
                }})
            .catch(error => {console.error('Error:', error)
                
                swal("failed!", "Gagal Menolak !", "error")
            })
            .then(response => console.log('Success:', response),
        ); 
    }

    componentDidMount= async() => {
        await axios.request(Constant.API_LIVE +'/request/company/Request', {
            method: 'GET',
            
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => response.data)
        .then(data => {
            this.setState({ items: data })
        })
        .then(async() => {
            this.setState({ tableRows:this.assemblePosts() })
            console.log(this.state.tableRows);
        })     
    }

    assemblePosts = () => {

        let items = this.state.items.map((annual, index) => {
            return(
                {
                    kode:annual.userCompany.idUser.kode,
                    nama:annual.userCompany.idUser.nama,
                    tglMulai:annual.tglMulai,
                    tglAkhir:annual.tglAkhir,
                    keterangan:annual.keterangan,
                    status:annual.status.status,
                    action: 
                    <div>
                    <button type="submit" name ="approve" className="btn btn-primary waves-effect waves-light m-l-10 btn-sm"
                        value={annual} onClick={() => this.handleApprove(annual)}> 
                        <b className="font-bold" >Setujui</b>
                    </button>

                    <button type="submit" name="reject" className="btn btn-danger waves-effect waves-light m-l-10 btn-sm" 
                        value={index} onClick={() => this.handleReject(annual)}>
                        <b className="font-bold" >Tolak</b>
                    </button>
                    </div>
                }
            );
        });

        return items;
    }

    render() {

        const data = {
            columns: [
                {
                    label: 'Kode',
                    field: 'kode',
                    width: 100
                },
                {
                    label: 'Nama',
                    field: 'nama',
                    width: 150
                },
                {
                    label: 'Tanggal Mulai',
                    field: 'tglAwal',
                    width: 150
                },
                {
                    label: 'Tanggal Selesai',
                    field: 'tglAkhir',
                    width: 150
                },
                {
                    label: 'Keterangan',
                    field: 'keterangan',
                    width: 150
                },
                {
                    label: 'Status',
                    field: 'status',
                    width: 150
                },
                {
                    label: 'Action',
                    field: 'action',
                    width: 100
                }
            ],

            rows: this.state.tableRows,
        }
        return (
        <div className="content-page">

            <div className="content">
                <div className="container">

                    <div className="row">
                        <div className="col-sm-12">

                            <h4 className="page-title">Request Annual</h4>
                            <ol className="breadcrumb">
                                <li>
                                    <a href="#">Annual</a>
                                </li>
                                <li className="active">
                                    request
                                </li>
                            </ol>
                        </div>
                    </div>

                    
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card-box">

                                <div className="form-group clearfix">
                                    <label className="col-sm-2 control-label" ></label>
                                    <div className="col-lg-6">
                                        <h4 className="m-t-0 header-title"><b>PERMINTAAN CUTI</b></h4>    
                                    </div>
                                </div>
                                <p className="text-muted m-b-30 font-13"></p>

                                <div className="table-rep-plugin">
                                    <div className="table-responsive" data-pattern="priority-columns">
                                    <div>
                                        <MDBDataTable striped bordered data={data} />
                                    </div>
                                    </div>
                                </div>  
                                </div>                        				
                            </div>
                        </div>
                    </div>
                </div>
            </div>      
        );   
    }
}

  
export default AnnualRequest;
