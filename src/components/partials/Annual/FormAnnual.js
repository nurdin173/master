import React, { Component } from "react";
import "react-datepicker/dist/react-datepicker.css";
import originalMoment from "moment";
import { extendMoment } from "moment-range";
import * as Constant from '../../_helpers/constant';
import swal from 'sweetalert';
import { history } from '../../_helpers';
import "./../../auth/SpinnerLoader.css";
import DatePicker from 'react-datepicker';
import { getDay, subDays } from 'date-fns';

const moment = extendMoment(originalMoment);
let user = JSON.parse(localStorage.getItem('user'));

class FormAnnual extends Component {
    constructor(props,context){
        super(props,context);
        const today = moment(); 
        this.handleRequest = this.handleRequest.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleStartDate = this.handleStartDate.bind(this);
        this.handleEndDate = this.handleEndDate.bind(this);

        this.state = {
            saldo:[],
            namauser:user.idUser.nama,
            tglMulai: new Date(),
            tglAkhir: new Date(),
            sisaCuti:'',
            keterangan:'',
            value: moment.range(today.clone().add(1,"day"), today.clone().add(1,"day")),
            submitted: false,
            isLoading: false,
            redirect: false,
            loadingData:true,
            startDate: new Date(),
            endDate: new Date(),
            libur: []
        }    
    }

    handleStartDate = date => {
        this.setState({
            tglMulai: date, tglAkhir:date
        })
    }

    handleEndDate = date => {
        this.setState({
            tglAkhir: date
        })
    }

    handleChange = event => {
        this.setState({
            [event.target.name]:event.target.value,
        })
    }

    //react-toggle

    handleRequest = event => {
        event.preventDefault(); 
        this.setState({ submitted: true, isLoading: true });
        this.Request();
    }

    onSelect = (value, states) => {
        this.setState({ value, states });
        
    }

    getLibur() {
        fetch(Constant.API_LIVE + '/attendees/libur-company', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => response.json())
        .then(data => {
            this.setState({ libur: data })
        })
    }
    
    componentDidMount() {
        fetch(Constant.API_LIVE +'/annual/saldo', {
            method: 'POST',
            body:JSON.stringify({
                id:{
                    kode:user.idUser.kode
                }
            }),
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(res => 
            res.json()
        )
        .then(saldo => this.setState({
            sisaCuti:saldo[0].sisaCuti,loadingData:false
        }))
        .catch(error => {
            console.log('parsing failed', error)
            swal("Failed!", "Failed to get annual leave!", "error")

            history.push("/annual/form")
        });
        
        this.getLibur();
    }

    Request(){
        fetch(Constant.API_LIVE +'/request', {
                method: 'POST',
                body: JSON.stringify({
                    
                    kode:"",
                    userCompany:{
                        id:user.id,
                        idUser:{
                            id:user.idUser.id
                        }
                    },
                    tglMulai:moment(this.state.tglMulai).format("YYYY-MM-DD"),
                    tglAkhir:moment(this.state.tglAkhir).format("YYYY-MM-DD"),
                    keterangan:this.state.keterangan
                
                }),
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(res => {res.json()
                if (res.ok){
                    swal("Success!", "Request Successfully!", "success")

                    history.push("/dashboard")
                    this.setState({isLoading:false})
                }else{
                    swal("Failed!", "Request Failled!", "erroe")

                    this.setState({isLoading:false})
                }}
                )
            .catch(error => {console.error('Error:', error)
                swal("Failed!", "Request Failled!", "error")
                
                this.setState({isLoading:false})
            }
            )
            .then(response => console.log('Success:', response)     
            ); 
    }

    render() {
        const { isLoading, startDate, endDate } = this.state;

        var list=[];
        this.state.libur.map((libur) => {
            var d=moment(libur.libur.tglAkhir).diff(moment(libur.libur.tglMulai),'days')
            
            let s=new Date(libur.libur.tglMulai)
            for (let index = 0; index <=d; index++) {
                var result = new Date(libur.libur.tglMulai);
                result.setDate(s.getDate() + index);
                list.push(result)
            }
        })

        const isWeekday = date => {
            const day = getDay(date);
            return day !== 0 && day !== 6;
        }
       
        const highlightWithRanges = [
            {
                "react-datepicker__day--highlighted-custom-1": 
                list
                
            }
        ]
        return (
            <div id="render" className="content-page">

                <div className="content">
                    <div className="container">

                        <div className="row">
                            <div className="col-sm-12">

                                <h4 className="page-title">Form Annual</h4>
                                <ol className="breadcrumb">
                                    <li>
                                        <a href="#">Annual</a>
                                    </li>
                                    <li className="active">
                                        Form
                                    </li>
                                </ol>
                            </div>
                        </div>
                        
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card-box">

                                    {
                                    this.state.loadingData && <div>Please wait, getting your data  <i className="spinner-border"> </i></div> }
                                    { !this.state.loadingData && 
                                    <div>
                                            <div className="form-group clearfix">
                                            <label className="col-sm-2 control-label" ></label>
                                            <div className="col-lg-6">
                                                <h4 className="m-t-0 header-title"><b>PENGAJUAN CUTI</b></h4>    
                                            </div>
                                            </div>
                                            <form id="basic-form"  onSubmit={this.handleRequest} >   
                                                
                                                <div className="form-group clearfix">
                                                    <label className="col-sm-2 control-label" >Kode</label>
                                                    <div className="col-lg-6">
                                                        <input type="text" id="kode" name="kode" className="form-control" disabled value={user.idUser.kode} placeholder="NIK"/>
                                                    </div>
                                                </div>
                                            

                                            <div className="form-group clearfix">
                                                <label className="col-md-2 control-label" >Nama</label>
                                                <div className="col-lg-6">
                                                    <input type="text" id="nama" name="nama" className="form-control"  disabled value={this.state.namauser} placeholder="Nama"/>
                                                </div>
                                            </div>

                                            <div className="form-group clearfix">
                                                <label className="col-md-2 control-label" >Sisa Cuti</label>
                                                <div className="col-lg-6">
                                                <label className="col-md-2 control-label" >{this.state.sisaCuti}</label>
                                                </div>
                                            </div>

                                            <div className="form-group clearfix">
                                                <label className="col-md-2 control-label">Tanggal Cuti</label>
                                                <div className="col-lg-6">
                                                    <div className="input-group">
                                                        <DatePicker
                                                            placeholderText={this.state.tglMulai}
                                                            selected={this.state.tglMulai} 
                                                            minDate={this.state.startDate} 
                                                            onChange={date => this.handleStartDate(date)} 
                                                            filterDate={isWeekday}
                                                            highlightDates={highlightWithRanges}
                                                            className="form-control"
                                                        />
                                                        <span className="input-group-addon bg-custom b-0 text-white"> sampai </span>
                                                        {/* <span>Sampai</span> */}
                                                        <DatePicker
                                                            placeholderText={this.state.tglAkhir}
                                                            selected={this.state.tglAkhir}
                                                            minDate={this.state.tglMulai} 
                                                            onChange={date => this.handleEndDate(date)} 
                                                            filterDate={isWeekday}
                                                            highlightDates={highlightWithRanges}
                                                            className="form-control"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="form-group clearfix">
                                                <label className="col-md-2 control-label">Keterangan Cuti</label>
                                                <div className="col-lg-6">
                                                    <textarea className="form-control" name="keterangan" required onChange={this.handleChange} rows="6"></textarea>
                                                </div>
                                            </div>

                                                <div className="form-group clearfix">
                                                    <a className="col-md-2 control-label"   />
                                                    <div className="col-sm-2 control-label">
                                                    </div>
                                                </div>
                                                
                                                <div className="form-group clearfix">
                                                    <label  className="col-sm-6 control-label"></label>
                                                    <div className="col-sm-2 control-label">
                                                        <button type="submit" className="btn btn-default waves-effect waves-light btn-lg" data-style="contract" id="sa-warning" disabled={isLoading}>
                                                        { isLoading &&  <i className="spinner-border">  </i> }
                                                        { isLoading &&  <span> Loading </span> }
                                                        { !isLoading &&  <span> Submit </span> }
                                                        </button>
                                                    </div>
                                                </div>
                                                
                                            </form>
                                        </div>
                                    }
        
                        				</div>                        				
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                        
        );

    }
}

export default FormAnnual;
