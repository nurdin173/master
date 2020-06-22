import React, { Component } from 'react';
import * as Constant from '../../_helpers/constant';

let token = localStorage.getItem('token');
let user = JSON.parse(localStorage.getItem('user'));

export default class Company extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            userCompany: [],
            id: null,
            kode: null,
            nama: null,
            alamat: null,
            email: null,
            tglLahir: null,
            telp: null,
            company: user.idCompanyUnitPosisi.idCompany.nama,
            unit: null,
            posisi: 'CEO',
            tipe: null,
            error: null
        }     
    }
    
    fetchUserCompany() {
        const userCom = {
            idUser:{
                nama: this.state.nama,
                alamat: this.state.alamat,
                email: this.state.email,
                tglLahir: this.state.tglLahir,
                telp: this.state.telp,
            },
            idCompanyUnitPosisi:{
                idCompany: {
                    nama: this.state.company,
                },
                idUnit: {
                    unit: this.state.unit,
                },
                idPosisi: {
                    posisi: this.state.posisi,
                },
            },
            idTipeUser:{
                tipe: this.state.tipe,
            }
        }

        fetch(Constant.API_LIVE + `/usercompany/filter`, {
            method: 'POST',
            body: JSON.stringify(userCom),
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        .then(response => response.json())
        .then(data =>
            this.setState({
                userCompany: data,
                // unit: data[0].id,
                isLoading: false,
            })
        )
        .catch(error => this.setState({ error, isLoading: false }));         /* fetch Method GET */
    }

    componentDidMount() {
        this.fetchUserCompany();
    }

    render(){
        const { userCompany } = this.state;
        return(
            <div className="content-page">
                <div className="content">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <h4 className="page-title">Detail Company</h4>
                                <ol className="breadcrumb">
                                    <li className="active">
                                        Company
                                    </li>
                                </ol>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="card-box table-responsive">
                                    {
                                        userCompany.length > 0 ? userCompany.map(uc => {
                                            return(
                                                <>
                                                <h4 className="page-title">{uc.idCompanyUnitPosisi.idCompany.nama}</h4>
                                                <hr />            
                                                    <div className="form-group clearfix">
                                                        <label className="col-md-2 control-label" >Nama</label>
                                                        <div className="col-lg-6">
                                                            <input type="text" id="nama" name="nama" className="form-control"  disabled value={uc.idUser.nama} placeholder="Nama"/>
                                                        </div>                                    
                                                    </div>
            
                                                    <div className="form-group clearfix">
                                                        <label className="col-md-2 control-label" >Unit</label>
                                                        <div className="col-lg-6">
                                                            <input type="text" id="alamat" name="alamat" className="form-control"  disabled value={uc.idCompanyUnitPosisi.idUnit.unit} placeholder="Alamat"/>
                                                        </div>                                    
                                                    </div>
            
                                                    <div className="form-group clearfix">
                                                        <label className="col-md-2 control-label" >Posisi</label>
                                                        <div className="col-lg-6">
                                                            <input type="text" id="tglLahir" name="tglLahir" className="form-control"  disabled value={uc.idCompanyUnitPosisi.idPosisi.posisi} placeholder="Tanggal Lahir"/>
                                                        </div>                                    
                                                    </div>
            
                                                    <div className="form-group clearfix">
                                                        <label className="col-md-2 control-label" >Tanggal Lahir</label>
                                                        <div className="col-lg-6">
                                                            <input type="date" id="telp" name="telp" className="form-control"  disabled value={uc.idUser.tglLahir} placeholder="Telepon"/>
                                                        </div>                                    
                                                    </div>
                                                </>
                                            );
                                        }) :
                                        null

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
