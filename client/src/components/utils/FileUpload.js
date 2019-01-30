/**
 * FILE UPLOAD COMPONENT
 * ref: https://github.com/react-dropzone/react-dropzone
 */
import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPlusCircle from '@fortawesome/fontawesome-free-solid/faPlusCircle';
import faTimesCircle from '@fortawesome/fontawesome-free-solid/faTimesCircle';
import faTrash from '@fortawesome/fontawesome-free-solid/faTrash';
import CircularProgress from '@material-ui/core/CircularProgress';

class FileUpload extends Component {
  state = {
    uploadedFiles: [],
    uploading: false
  };

  // handle the dropping event
  onDrop = files => {
    this.setState({ uploading: true });

    // prepare the files and send to server
    let formData = new FormData();
    const config = {
      header: { 'content-type': 'multipart/form-data' }
    };
    formData.append('file', files[0]);

    // 1) send POST request to server to upload an image,
    // 2) get the result back: data{url, public_id}
    // 3) update the state: uploading, uploadedFiles
    // 4) inform parent the images list is changed
    axios.post('/api/users/uploadimage', formData, config).then(res => {
      this.setState(
        {
          uploading: false,
          uploadedFiles: [...this.state.uploadedFiles, res.data]
        },
        () => {
          this.props.imagesHandler(this.state.uploadedFiles);
        }
      );
    });
  };

    // 1) send GET request to server to remove an image from server
    // 3) update the state
    // 4) inform parent the images list is changed
  onRemove = imageId => {
    axios.get(`/api/users/removeimage?public_id=${imageId}`).then(res=> {
      let newUploadedFiles = this.state.uploadedFiles.filter(item => {
        return item.public_id !== imageId
      })
      this.setState({ uploadedFiles: newUploadedFiles}, () => {
        this.props.imagesHandler(newUploadedFiles)
      })
    })
  };

  // render the uploaded images inside the dropzone
  showUploadedImages = () => (
    this.state.uploadedFiles.map(item => (
      <div
        key={item.public_id}
        className="dropzone-box__wrapper"
        onClick={() => this.onRemove(item.public_id)}
      >
        <div
          className="dropzone-box remove"
          style={{ background: `url(${item.url}) no-repeat` }}
        >
          <FontAwesomeIcon icon={faTrash} />
        </div>
      </div>
    ))
  )


  // initial the state when this component re-render
  static getDerivedStateFromProps(props, state) {
    if (props.reset) {
      return state = {
        uploadedFiles: []
      }
    }
    return null;
  }

  render() {
    console.log(this.state.uploadedFiles)
    const {uploading} = this.state
    return (
      <div>
        <section>
          <div className="dropzone clear">
            <Dropzone
              onDrop={event => this.onDrop(event)}
              multiple={true}
              className="dropzone-box__wrapper"
              disableClick={uploading}
            >
              <div className={`dropzone-box ${uploading && 'uploading'}`}>
                <FontAwesomeIcon icon={!uploading ? faPlusCircle : faTimesCircle} />
              </div>
            </Dropzone>

            {this.showUploadedImages()}
            {uploading ? (
              <div
                className="dropzone-box__wrapper"
                style={{
                  textAlign: 'center',
                  paddingTop: '6rem'
                }}
              >
                {' '}
                <CircularProgress style={{ color: '#686868' }} thickness={7} />
              </div>
            ) : null}
          </div>
        </section>
      </div>
    );
  }
}

export default FileUpload;
