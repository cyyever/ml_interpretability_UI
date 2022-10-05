import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "../components.css"
import { toast } from 'react-toastify';
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

class ImageModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      showHide: false,
      imgData: "",
      maxZoom: 4,
      intiZoom: 1,
      originHeight: 0,
      originWidth: 0,
      imgHeight: 0,
      imgWidth: 0,
      sliderValue: 0,
      index: 0,
    };
  }

  getImageDimensions(file) {
    return new Promise(function (resolved, rejected) {
      var i = new Image();
      i.onload = function () {
        resolved({ w: i.width, h: i.height });
      };
      i.src = file;
    });
  }

  componentDidMount() {
    if (this.props.imgData !== "") {
      console.log(this.props.imgData, this.props.index);
      var base64Data = []
      this.props.data.forEach((data, index) => {
        base64Data.push("data:image/png;base64," + data);
      });
      this.setState(
        { 
          imgData: this.props.imgData, 
          showHide: !this.state.showHide,
          data: base64Data,
          index: this.props.index,
        },
        () => {
          var dimensions = this.getImageDimensions(this.state.imgData);
          dimensions.then((a) => {
            this.setState({ imgHeight: a.h, imgWidth: a.w, originHeight: a.h, originWidth: a.w });
          });
        }
      );
    }
  }

  handleScroll = event => {
    console.log('scrollTop: ', event.currentTarget.scrollTop);
    console.log('offsetHeight: ', event.currentTarget.offsetHeight);
  };

  handleModalShowHide() {
    this.setState({ showHide: !this.state.showHide, imgData: "" });
  }

  handleImageOnClick = (e) => {
    var zoom = this.state.intiZoom + 1;
    if (zoom <= this.state.maxZoom) {
      this.setState({
        intiZoom: zoom,
        imgHeight: this.state.imgHeight * 2,
        imgWidth: this.state.imgWidth * 2,
      });
    } else {
      this.setState({
        intiZoom: 1,
        imgHeight: this.state.imgHeight / 2 ** (this.state.maxZoom - 1),
        imgWidth: this.state.imgWidth / 2 ** (this.state.maxZoom - 1),
      });
    }
  };

  changeImageSize = (value) => {
    var zoom = 0;
    switch (value){
        case 0:
            zoom = 0;
            break;
        case 25:
            zoom = 1;
            break;
        case 50:
            zoom = 2;
            break;
        case 75:
            zoom = 3;
            break;
        case 100:
            zoom = 4;
            break;
        default:
            toast.error("Something went wrong with the slider", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            break;
    };

    this.setState(
        {
            intiZoom: zoom,
            imgHeight: this.state.originHeight * (2 * zoom),
            imgWidth: this.state.originWidth * (2 * zoom),
        }
    );
  }

  handleSlider = () => {
    this.setState({
      sliderValue: 0 
    });
  }

  setIndexOfImages(index) {
    this.setState( {
      index: index,

    });
  }

  render() {
    
    let renderContent = "";
    this.state.data.length > 0 && this.state.imgData != ""
    ? renderContent =
      <Lightbox 
          wrapperClassName="modal-overlay"
          mainSrc={this.state.data[(this.state.index)]}
          nextSrc={this.state.data[(this.state.index + 1) % this.state.data.length]}
          prevSrc={
            this.state.data[(this.state.index + this.state.data.length - 1) % this.state.data.length]
          }
          onCloseRequest={() => this.handleModalShowHide()}
          onMovePrevRequest={() =>
              this.setIndexOfImages((this.state.index + this.state.data.length - 1) % this.state.data.length)
          }
          onMoveNextRequest={() => 
            this.setIndexOfImages(
              (this.state.index + this.state.data.length + 1) % this.state.data.length)
          }
        />
        : renderContent = ""
          return renderContent;
        /*return (
      <Modal
        className="img-transition"
        show={this.state.showHide}
        onHide={() => this.handleModalShowHide()}
        onScroll={this.handleScroll}
        animation={false}
        dialogClassName="modal-dialog-img"
        contentClassName="modal-content-img"
        centered
      >
        <div className="modal-outside">
          <div className="slider-limit">
              <Slider
              onChange={this.changeImageSize}
              min={0}
              defaultValue={0}
              value={this.state.sliderValue}
              marks={{ 0: {
                  style: {
                      color: 'white'
              }, label: <strong>100</strong>}, 
              25: {
                  style: {
                      color: 'white'
              }, label: <strong>125</strong>}, 
              50: {
                  style: {
                      color: 'white'
              }, label: <strong>150</strong>}, 
              75: {
                  style: {
                      color: 'white'
              }, label: <strong>175</strong>}, 
              100: {
                  style: {
                      color: 'red'
              }, label: <strong>200</strong>} }}
              step={null}
              />
            </div>
        </div>
        <Modal.Body>
          {this.state.imgData ? (
            <img
              src={this.state.imgData}
              className="img-fluid"
              alt="missing pic"
              width={this.state.imgWidth}
              height={
                this.state.imgHeight
              } onClick={this.handleImageOnClick}
            />
          ) : (
            ""
          )}
        </Modal.Body>
      </Modal>
    );*/
  }
}

export default ImageModal;
