import React, { Component } from 'react'
import { Modal } from 'react-bootstrap';

class ImageModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            showHide:false,
            imgData : "",
            maxZoom : 4,
            intiZoom : 1,
            imgHeight : 0,
            imgWidth : 0,
        }
        
    
    }

    getImageDimensions(file) {
        return new Promise (function (resolved, rejected) {
          var i = new Image()
          i.onload = function(){
            resolved({w: i.width, h: i.height})
          };
          i.src = file
        })
      }

    componentDidMount(){
        if(this.props.imgData !== ""){
            this.setState({imgData : this.props.imgData , showHide : !this.state.showHide}, ()=>{
                var dimensions = this.getImageDimensions(this.state.imgData)
                dimensions.then((a) => {
                    this.setState({imgHeight : a.h , imgWidth : a.w})
                })
            })

        }
    }

    handleModalShowHide(){
        this.setState({showHide : !this.state.showHide , imgData : ""})
    }
    
    handleImageOnClick = (e) =>{
       var zoom = this.state.intiZoom + 1
       if (zoom <= this.state.maxZoom){
           this.setState({intiZoom :zoom , imgHeight : this.state.imgHeight * 2, imgWidth : this.state.imgWidth * 2 })
       }else{
           this.setState({intiZoom : 1 , imgHeight : this.state.imgHeight / (2** (this.state.maxZoom-1))  , imgWidth : this.state.imgWidth / (2** (this.state.maxZoom-1))})
       }
    }
    render() {
        return (
        <Modal show={this.state.showHide} onHide = {()=> this.handleModalShowHide()} animation={false}dialogClassName='modal-dialog-img' contentClassName='modal-content-img' 
        centered>
            <Modal.Body>
            {this.state.imgData ?  <img src = {this.state.imgData} className="img-fluid img-with-click" alt = "Image Picture" width = {this.state.imgWidth} height = {this.state.imgHeight} onClick={this.handleImageOnClick}/> : ""}
            </Modal.Body>
        </Modal>
        )
    }
}

export default ImageModal;
