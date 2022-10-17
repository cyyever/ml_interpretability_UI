import React, { Component } from "react";
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

  handleModalShowHide() {
    this.setState({ showHide: !this.state.showHide, imgData: "" });
  }

  setIndexOfImages(index) {
    this.setState( {
      index: index,
    });
  }

  render() {
    
    let renderContent = "";
    this.state.data.length > 0 && this.state.imgData !== ""
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
          onImageLoadError={() => 
            {
            this.handleModalShowHide();
            toast.error("Error loading image", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            })}
          }

        />
        : renderContent = ""
          return renderContent;
  }
}

export default ImageModal;
