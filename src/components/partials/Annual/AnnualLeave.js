import React, { Component } from "react";
import { MDBDataTable } from 'mdbreact';
import Layout from '../../layout/Layout';
import axios from 'axios';
import moment from "moment";
import * as Constant from '../../_helpers/constant';
import constants from "jest-haste-map/build/constants";

let user = JSON.parse(localStorage.getItem('user'));
class AnnualLeave extends Component {
    constructor(props){
        super(props);
        this.state = {
            items: [],
            isLoading: true,
            tableRows: [],
        };
    }

    
    componentWillMount=async() => {
        let data =JSON.stringify({
            id:{
                kode:null
            } })
        await axios.post(Constant.API_LIVE + '/annual/saldo',data,
            {
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
            this.setState({ tableRows:this.assemblePosts(), isLoading:false });
        })
            
    }

    assemblePosts= () => {
        let items = this.state.items.map((annual) => {
            return (
                {
                    nik:annual.id.kode,
                    nama:annual.nama,
                    unit:annual.unit,
                    posisi:annual.posisi,
                    sisaCuti:annual.sisaCuti,
                    tahun:annual.id.tahun
                }
                
            )
        });

        return items;
    }

    render() {
        const data = {
            columns: [
                {
                    label: 'Kode',
                    field: 'nik'
                },
                {
                    label: 'Nama',
                    field: 'nama'
                },
                {
                    label: 'Unit',
                    field: 'unit'
                },
                {
                    label: 'Posisi',
                    field: 'posisi'
                },
                {
                    label: 'Sisa Cuti',
                    field: 'sisaCuti'
                },
                {
                    label: 'Tahun',
                    field: 'tahun'
                }
            ],

            rows:this.state.tableRows,
        }   
            return (
                <div className="content-page">
                    <div className="content">
                        <div className="container">
                            
                            <div className="row">
                                <div className="col-sm-12">

                                    <h4 className="page-title">Annual Leave</h4>
                                    <ol className="breadcrumb">
                                        <li>
                                            <a href="#">Annual</a>
                                        </li>
                                        <li className="active">
                                            Leave
                                        </li>
                                    </ol>
                                </div>
						    </div>
                            

                                    <div className="card-box table-responsive" id="shift-list">
                                        <h4 className="m-t-0 header-title"><b>Daftar Sisa Cuti Karyawan </b></h4>
                                        <MDBDataTable striped bordered data={data} />
                                    </div>
                                      
                        </div>
                    </div>
                </div>
            );
        }


    }
export default AnnualLeave;