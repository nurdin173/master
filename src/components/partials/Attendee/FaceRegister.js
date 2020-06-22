import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import swal from 'sweetalert';
import {
  loadModels,
  getFullFaceDescription,
  isFaceDetectionModelLoaded
} from '../../../api/face';
import * as Constant from '../../_helpers/constant';

const MaxWidth = 600;

const INIT_STATE = {
  url: null,
  imageURL: [],
  fullDesc: [],
  imageDimension: null,
  error: null,
  loading: false,
  image: null
};

class FaceRegister extends Component {
  constructor(props) {
    super(props);
    if(this.props.location.data == null) {
      window.location.href = '/bad-request'
    }
    this.state = {
      ...INIT_STATE,
      showDescriptors: false,
      WIDTH: null,
      HEIGHT: 0,
      isModelLoaded: !!isFaceDetectionModelLoaded()
    };
  }

  componentWillMount() {
    this.resetState();
    let _W = document.documentElement.clientWidth;
    if (_W > MaxWidth) _W = MaxWidth;
    this.setState({ WIDTH: _W });
    this.mounting();
  }

  mounting = async () => {
    await loadModels();
  };

  handleFileChange = async event => {
    this.resetState();
    this.setState({loading: true});
    this.setState({image:event.target.files[0]});
    await Promise.all(Array.from(event.target.files).map(async file =>(
      await this.setState(prevState => ({
        imageURL: [...prevState.imageURL, URL.createObjectURL(file)],
      }))
    )));
    this.handleImageChange();
  };

  handleURLChange = event => {
    this.setState({ url: event.target.value });
  };

  handleButtonClick = event => {
    event.preventDefault();
    var tempInside = [];
    var temp = [];
    this.state.fullDesc.forEach((fd,i) => {
      fd.forEach(fdd => (
        fdd.descriptor.forEach(desc => (
          tempInside.push(desc)
        ))
      ));
      temp.push(tempInside);
      tempInside = [];
    });
    const data = {
        name: this.props.location.data.idUser.id,
        descriptors: temp
    }
    
    const formData = new FormData();
    formData.append('file',this.state.image);
    formData.append('id',this.props.location.data.idUser.kode+this.props.location.data.idUser.nama+"FACE");

    fetch(Constant.API_LIVE + '/user/descriptor/register/json', { 
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
    .then(res => {res.json()
        if(res.ok){
          fetch(Constant.API_LIVE + '/user/descriptor/register/image', { 
              method: 'POST',
              body: formData,
              headers:{
                  'Authorization': 'Bearer ' + localStorage.getItem('token')
              }
          }).then(res => {res.json()
            if(res.ok){
              swal("Success!", "Absen Berhasil!", "success")
              .then(function() {
                window.location.href = "/employee";
              });
            }
          });
        }
    });
  };

  handleImageChange = async (images = this.state.imageURL) => {
    console.log(images);
    await Promise.all(Array.from(images).map(async image =>(
      await this.getImageDimension(image),
      await getFullFaceDescription(image).then(fullDesc => {
        if(fullDesc.length > 0){
          this.setState(prevState =>({fullDesc:[...prevState.fullDesc, fullDesc]}));
        }
      })
    )));
    console.log(this.state.fullDesc);
    this.setState({loading:false});
  };

  getImageDimension = imageURL => {
    let img = new Image();
    img.onload = () => {
      let HEIGHT = (this.state.WIDTH * img.height) / img.width;
      this.setState({
        HEIGHT,
        imageDimension: {
          width: img.width,
          height: img.height
        }
      });
    };
    img.src = imageURL;
  };

  handleDescriptorsCheck = event => {
    this.setState({ showDescriptors: event.target.checked });
  };

  resetState = () => {
    this.setState({ ...INIT_STATE });
  };
  
  render() {
    const {
      WIDTH,
      imageURL,
      fullDesc,
      isModelLoaded,
      error,
      loading
    } = this.state;

    // Display working status
    let status = <p>Status: Model Loaded = {isModelLoaded.toString()}</p>;
    if (!!error && error.toString() === 'TypeError: Failed to fetch') {
      status = (
        <p style={{ color: 'red' }}>Status: Error Failed to fetch Image URL</p>
      );
    } else if (loading) {
      status = <p style={{ color: 'blue' }}>Status: LOADING...</p>;
    } else if (!!fullDesc && !!imageURL && !loading) {
      if (fullDesc.length < 2)
        status = <p>Status: {fullDesc.length} Descriptor Detected</p>;
      if (fullDesc.length > 1)
        status = <p>Status: {fullDesc.length} Descriptors Detected</p>;
    }

    return (
      <div className="content-page">
        <div className="content">
          <div className="container card-box">
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              {status}
              <div style={{width: WIDTH, padding: 10, border: 'solid', marginTop: 10}}>
                <p>Input Image file</p>
                <input id="myFileUpload" type="file" multiple onChange={this.handleFileChange} accept=".jpg, .jpeg, .png"/>
                <br />
                { (fullDesc.length > 0) &&
                  <div>
                    <button type="submit" onClick={this.handleButtonClick} class="btn btn-success waves-effect waves-light m-l-10 btn-md"> 
                        Submit
                    </button>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>           
    );
  }
}

export default withRouter(FaceRegister);