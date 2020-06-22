import React from 'react';
import Moment from 'moment';
import swal from 'sweetalert';
import * as Constant from '../_helpers/constant';

export default class Registrasi extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            namaCompany:'',
            namaUser:'',
            jatahCuti:'',
            toleransiKeterlambatan:'',
            alamat:'',
            tglLahir: Moment().format('YYYY-MM-DD'),
            telp:'',
            email:'',
        };
    }

    handleChange = event =>{
        this.setState({ 
            [event.target.name]:event.target.value
         })
    }

    handleSubmit = event => {
        event.preventDefault();
        const data = {
            user: {
                nama:this.state.namaUser,
                alamat:this.state.alamat,
                tglLahir:this.state.tglLahir,
                telp:this.state.telp,
                email:this.state.email
            },
            company: {
                nama:this.state.namaCompany,
                jatahCuti:this.state.jatahCuti,
                toleransiKeterlambatan:this.state.toleransiKeterlambatan,
            }
        }

        fetch(Constant.API_LIVE + '/company', {
                method: 'POST',
                body: (JSON.stringify(data)),
                headers:{
                    'Content-Type': 'application/json' 
                }
            })
            .then(res => {res.json()
                if(res.ok){
                    swal("Success!", "Registrasi Berhasil!", "success")
                    .then(function() {
                        window.location.href = "/";
                    });
                }
            }); 
    }

    render(){
        return(
            <div>
                <div className="content">
                    <div className="container">
                        <div className="col-sm-2"></div>
                        <div className="col-sm-8">
                            <div className="card-box">
                                <div className="panel-heading">
                                    <h1 className="text-center"><b>Registration Form</b></h1>
                                </div>
                                
                                <form className="form-horizontal group-border-dashed" onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label className="col-sm-3 control-label">Company Name</label>
                                        <div className="col-sm-6">
                                            <input type="text" name="namaCompany" className="form-control" required placeholder="Type something" onChange={this.handleChange}/>
                                        </div>
                                    </div>
            
                                    <div className="form-group">
                                        <label className="col-sm-3 control-label">Jatah Cuti</label>
                                        <div class="col-sm-3">
                                            <input data-parsley-type="number" name="jatahCuti" type="text" class="form-control" required placeholder="Enter only numbers" onChange={this.handleChange}/>
                                        </div>
                                    </div>
            
                                    <div className="form-group">
                                        <label className="col-sm-3 control-label">Toleransi Keterlambatan</label>
                                        <div class="col-sm-3">
                                            <input data-parsley-type="number" name="toleransiKeterlambatan" type="text" class="form-control" required placeholder="Enter only numbers" onChange={this.handleChange}/>
                                        </div>
                                    </div>
            
                                    <div className="form-group">
                                        <label className="col-sm-3 control-label">Owner Name</label>
                                        <div className="col-sm-6">
                                            <input type="text" className="form-control" name="namaUser" required placeholder="Type something" onChange={this.handleChange}/>
                                        </div>
                                    </div>
            
                                    <div className="form-group">
                                        <label className="col-sm-3 control-label">Alamat</label>
                                        <div className="col-sm-6">
                                            <input type="text" className="form-control" name="alamat" required placeholder="Type something" onChange={this.handleChange}/>
                                        </div>
                                    </div>
            
                                    <div className="form-group">
                                        <label className="col-sm-3 control-label">Tanggal Lahir</label>
                                        <div className="col-sm-6">
                                            <div className="input-group">
                                                <input type="text" className="form-control" readOnly name="tglLahir" placeholder="mm/dd/yyyy" id="datepicker-autoclose" onChange={this.handleChange}/>
                                                <span className="input-group-addon bg-custom b-0 text-white"><i className="icon-calender"></i></span>
                                            </div>
                                        </div>
                                    </div>
            
                                    <div className="form-group">
                                        <label className="col-sm-3 control-label">Telepon</label>
                                        <div class="col-sm-3">
                                            <input data-parsley-type="number" name="telp" type="text" class="form-control" required placeholder="Enter only numbers" onChange={this.handleChange}/>
                                        </div>
                                    </div>
            
                                    <div className="form-group">
                                        <label className="col-sm-3 control-label">E-Mail</label>
                                        <div className="col-sm-6">
                                            <input type="email" className="form-control" name="email" required parsley-type="email" placeholder="Enter a valid e-mail" onChange={this.handleChange}/>
                                        </div>
                                    </div>
                                    
                                    <div class="form-group m-b-0">
                                        <div class="col-sm-offset-3 col-sm-9 m-t-15">
                                            <button type="submit" value="Submit" class="btn btn-primary">
                                                Submit
                                            </button>
                                            <button type="reset" class="btn btn-default m-l-5">
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-12 text-center">
                                <p>
                                    Already have account?<a href={'/'} class="text-primary m-l-5"><b>Sign In</b></a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        );
    }
}