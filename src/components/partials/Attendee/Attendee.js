import React, { Component } from 'react';
import Webcam from 'react-webcam';
import { loadModels, getFullFaceDescription, createMatcher } from '../../../api/face';
import swal from 'sweetalert';
import moment from 'moment';
import * as Constant from '../../_helpers/constant';
import {history} from '../../_helpers/history';

const WIDTH = 420;
const HEIGHT = 420;
const inputSize = 160;

class Attendee extends Component {
    constructor(props) {
        super(props);
        this.webcam = React.createRef();
        this.state = {
            user: localStorage.getItem('user'),

            fetch: false,
            capture: true,
            time: new Date(),

            descriptors: null,
            detections: null,
            match: null,
            fullDesc: null,
            faceMatcher: null,
            facingMode: null,
            users: {
                user: null
            },
            absen: {
                kode: []
            }
        };
    }

    componentWillMount() {
        loadModels();
        this.setInputDevice();
        this.matcher();
        setTimeout(() => window.location.href = '/dashboard', 180000);
        setInterval(() => this.currentTime(), 500);
    }

    currentTime(){
        this.setState({
            time: new Date()
        })
    }

    setInputDevice = () => {
        navigator.mediaDevices.enumerateDevices().then(async devices => {
          let inputDevice = await devices.filter(
            device => device.kind === 'videoinput'
          );
          if (inputDevice.length < 2) {
            await this.setState({
              facingMode: 'user'
            });
          } else {
            await this.setState({
              facingMode: { exact: 'environment' }
            });
          }
          this.startCapture();
        });
    };

    matcher = async () => {
        await fetch(Constant.API_LIVE + '/user/descriptor'+JSON.parse(localStorage.getItem('user')).idUser.id, { 
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(async response => await response.json())
        .then(async data =>
            await this.setState({
                users: {
                    user:data
                }
            })
        );
        
        const faceMatcher = await createMatcher(this.state.users);
        this.setState({ faceMatcher });
    };

    getDescription = async () => {
        if(!!this.state.fullDesc) {
            await this.setState({
                descriptors: this.state.fullDesc.map(fd => fd.descriptor),
                detections: this.state.fullDesc.map(fd => fd.detection)
            });
            if(!!this.state.descriptors && !!this.state.faceMatcher){
                let match = await this.state.descriptors.map(descriptor => 
                    this.state.faceMatcher.findBestMatch(descriptor)
                );
                this.setState({ match });

                if(this.state.match.length!=0 && this.state.fetch==false){
                    this.setState({capture: false});
                    this.setState({fetch: true});
                    this.checkGeo();
                }
            }
        }
    };

    checkGeo = async () =>{
        if(this.state.match[0]._label===JSON.parse(localStorage.getItem('user')).idUser.id){
            // this.setState({
            //     absen: {
            //         jam: moment().format('YYYY-MM-DD hh:mm:ss'),
            //         lokasi: "Wisma Staco"
            //     }
            // });
            // this.absen();
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(this.setLocation);
            }
        }
        else{
            this.setState({capture: true});
            this.setState({fetch: false});
        }
    }

    setLocation = async (position) => {
        const lng = position.coords.longitude;
        const lat = position.coords.latitude;
        const __KEY = '*******';
        const latlng = lat + "," + lng;
        
        var temp=[];
        await fetch( `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng}&key=${__KEY}` )
        .then(async res => await res.json())
        .then(async data => await Promise.all(data.results.map(result => {
            if(result.plus_code != null){
                temp.push(result.plus_code.global_code)
            };
        })));
        await this.setState({
            absen: {
                kode: temp
            }
        })
        await this.absen();
    }

    absen = async () =>{
        await fetch( Constant.API_LIVE + '/user/absen', {
            method: 'POST',
            body: JSON.stringify(this.state.absen),
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(res => {res.json()
                if(res.ok){
                    swal("Success!", "Absen Berhasil!", "success")
                    .then(function() {
                        window.location.href = "/dashboard";
                    });
                }else{
                    swal("Failed!", "Silakan Absen Ulang!", "error")
                    .then(function() {
                        window.location.href = "/dashboard";
                    });
                }
        });
    }

    startCapture = () => {
        this.interval = setInterval(() => {
            if(this.state.capture){
                this.capture();
            }
        }, 1500);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    capture = async () => {
        if (!!this.webcam.current) {
            await getFullFaceDescription(
              this.webcam.current.getScreenshot(),
              inputSize
            ).then(fullDesc => this.setState({ fullDesc }));
        }
        await this.getDescription();
    };

    render(){
        const {facingMode, redirect} = this.state;
        let videoConstraints = null;
        let camera = '';

        if(!!facingMode) {
            videoConstraints = {
                width: WIDTH,
                height: HEIGHT,
                facingMode: facingMode
            };
            if(facingMode === 'user'){
                camera = 'Front';
            } else {
                camera = 'Back';
            }
        }
        return(
            <div className="content-page">
                <div className="content">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <h4 className="page-title">Dashboard</h4>
                                <ol className="breadcrumb">
                                 <li>
                                     <a href="#">Attendee Application</a>
                                 </li>
                                 <li>
                                     <a href="#">Attendee</a>
                                 </li>
                             </ol>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <ul class="nav nav-tabs tabs">
                                    <li class="active tab">
                                        <a href="#clock-in" data-toggle="tab" aria-expanded="false"> 
                                            <span class="visible-xs"><i class="fa fa-home"></i></span> 
                                            <span class="hidden-xs">Attendee</span> 
                                        </a> 
                                    </li>
                                </ul> 
                                
                                <div className="card-box table-responsive" id="clock-in">
                                    <h4 className="m-t-0 header-title"><b>Attendee In</b></h4>
                                    <h5 className="m-t-0 header-title">{this.state.time.toLocaleTimeString()}</h5>
                                    <div className="Camera" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                        <div style={{width: WIDTH, height: HEIGHT}}>
                                            <div style={{ position: 'relative', width: WIDTH }}>
                                                {!!videoConstraints ? (
                                                <div style={{ position: 'absolute' }}>
                                                    <Webcam 
                                                        audio={false}
                                                        width={WIDTH}
                                                        height={HEIGHT}
                                                        ref={this.webcam}
                                                        screenshotFormat="image/jpeg"
                                                        videoConstraints={videoConstraints}
                                                    />
                                                </div>
                                                ) : null }
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

export default Attendee;
