import React, { Component } from 'react'
import { Modal } from 'react-bootstrap';

class ImageModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            showHide:false,
            imgData : "",
        }
    }

    componentDidUpdate(prevProps){
        if(prevProps.imgData !== this.props.imgData){
            this.setState({imgData : this.props.imgData , showHide : !this.state.showHide})
        }
    }

    handleModalShowHide(){
        this.setState({showHide : !this.state.showHide , imgData : ""})
    }
    
    render() {
        return (
        <Modal show={this.state.showHide} onHide = {()=> this.handleModalShowHide()} animation={false} dialogClassName='modal-dialog-img' contentClassName='modal-content-img' 
        centered>
            <Modal.Body>
            {this.state.imgData ?  <img src = {this.state.imgData} className="img-fluid" alt = "Image Picture"/> : ""}
            </Modal.Body>
        </Modal>
        )
    }
}

export default ImageModal;
