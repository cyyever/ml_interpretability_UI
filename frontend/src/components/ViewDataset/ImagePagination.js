import React, { Component } from 'react'
import ReactPaginate from 'react-paginate'
import { Card } from 'react-bootstrap';
import {getImageData} from '../../assets/api-client.js'
import ImageModal from './ImageModal.js';
class ImagePagination extends Component {
    constructor(props){
        super(props);
        this.state={
            data : [],
            datasetName : "",
            datasetType: "",
            offset : 0,
            imgData : [],
            perPage : 21,
            currentPage : 0,
            pageCount : 0,
            selectedImage:"",
        }     
    }

    componentDidMount(){
            this.setState({data :  this.props.data , datasetName: this.props.datasetName , 
                datasetType : this.props.datasetType ,  pageCount: Math.ceil(this.props.data.length / this.state.perPage)} , () =>{
                var indices = []
                if (this.state.data.length > this.state.perPage){
                    indices = this.state.data.slice(0,this.state.perPage) 
                    
                }else{
                    indices = this.state.data
                }
         
                this.recievedImageData(this.state.datasetName , this.state.datasetType , indices)
            })
        
        
        
    }


    recievedImageData(datasetName , datasetType , indices){
        // call Image API Method
        if(indices.length !== 0){
            this.props.displaySpinner(true)
            getImageData(datasetName , datasetType , indices).then((data) =>{
                 this.setState({imgData : data} , ()=>{
                     this.props.displaySpinner(false)
                 })
            })
        }

    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage : selectedPage,
            offset : offset
        } , () => {
            var indices = []
            if (this.state.offset + this.state.perPage < this.state.data.length) {
                    indices = this.state.data.slice(this.state.offset , this.state.offset + this.state.perPage)
            }else{
                indices = this.state.data.slice(this.state.offset , this.state.data.length)
            }
            this.recievedImageData(this.state.datasetName , this.state.datasetType , indices)
        })
    }

    handleImageClick = (e) =>{
        this.setState({selectedImage : ""}, () =>{
            this.setState({selectedImage :  e.target.src})
        })
    }

    render() {
        return (
            <Card bg="light">
                <Card.Body>
                <div className = "row"> 
                    <div className = "col">
                        {this.state.imgData.map((img , key) =>(
                           <img key = {key} src = {"data:image/png;base64,"+img} alt = "Image Picture" width="50" height = "50"
                           onClick = {this.handleImageClick}/>
                        ))}
                        <ReactPaginate
                            nextLabel="next >"
                            onPageChange={this.handlePageClick}
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={2}
                            pageCount={this.state.pageCount}
                            previousLabel="< previous"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            breakLabel="..."
                            breakClassName="page-item"
                            breakLinkClassName="page-link"
                            containerClassName="pagination"
                            activeClassName="active"
                            renderOnZeroPageCount={null}
                        />
                    </div>
                </div>
                </Card.Body>
                <ImageModal key = {this.state.selectedImage} imgData = {this.state.selectedImage}/>
            </Card>
        )
    }
}

export default ImagePagination