import React, { Component } from 'react'
import ReactPaginate from 'react-paginate'
import { Card , Form} from 'react-bootstrap';
import {getRawData} from '../../assets/api-client.js'
import ImageModal from './ImageModal.js';

const imagePerPageList = [10,20,25,30,35,40,45,50];

class DataPagination extends Component {
    constructor(props){
        super(props);
        this.state={
            data : [],
            datasetName : "",
            datasetSplit: "",
            datasetType : "",
            offset : 0,
            imgData : [],
            perPage : imagePerPageList[0],
            currentPage : 0,
            pageCount : 0,
            selectedImage:"",
            jumpPage : "",

        }     
    }

    componentDidMount(){
            this.setState({data :  this.props.data , datasetName: this.props.datasetName , datasetType : this.props.datasetType , imgData : [],
                datasetSplit : this.props.datasetSplit ,  pageCount: Math.ceil(this.props.data.length / this.state.perPage)} , () =>{
                var indices = []
                if (this.state.data.length > this.state.perPage){
                    indices = this.state.data.slice(0,this.state.perPage) 
                    
                }else{
                    indices = this.state.data
                }
                this.recievedImageData(this.state.datasetName , this.state.datasetSplit ,this.state.datasetType, indices)
            })
        
        
        
    }


    recievedImageData(datasetName , datasetSplit , datasetType , indices){
        // call Image API Method
        if(indices.length !== 0){
            this.props.displaySpinner(true)
            getRawData(datasetName , datasetSplit , datasetType, indices).then((data) =>{
                let data_ = data.map(function(a) {return a.data}) 
                this.setState({imgData : data_} , ()=>{
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
            this.recievedImageData(this.state.datasetName , this.state.datasetSplit , this.state.datasetType , indices)
        })
    }

    handleImageClick = (e) =>{
        this.setState({selectedImage : ""}, () =>{
            this.setState({selectedImage :  e.target.src})
        })
    }




    handleImagesPerPage = (e) =>{
        this.setState({perPage: parseInt(e.target.value) , pageCount: Math.ceil(this.state.data.length / parseInt(e.target.value)) ,
             currentPage : 0 , offset : this.state.currentPage * this.state.perPage} , ()=>{
                var indices = []
                if (this.state.data.length > this.state.perPage){
                    indices = this.state.data.slice(0,this.state.perPage) 
                    
                }else{
                    indices = this.state.data
                }
         
                this.recievedImageData(this.state.datasetName , this.state.datasetSplit, this.state.datasetType , indices)
        })
    }

    handleJumpPage = (e) =>{
        this.setState({jumpPage:e.target.value},()=>{
            if(this.state.jumpPage && !isNaN(this.state.jumpPage) && (parseInt(this.state.jumpPage)-1) > 0  && (parseInt(this.state.jumpPage)-1) < this.state.pageCount && (parseInt(this.state.jumpPage)-1) !== this.state.currentPage){
                this.setState({currentPage :  parseInt(this.state.jumpPage)-1 , offset : (parseInt(this.state.jumpPage)-1) * this.state.perPage},()=>{
                    var indices = []
                    if (this.state.offset + this.state.perPage < this.state.data.length) {
                            indices = this.state.data.slice(this.state.offset , this.state.offset + this.state.perPage)
                    }else{
                        indices = this.state.data.slice(this.state.offset , this.state.data.length)
                    }
                    this.recievedImageData(this.state.datasetName , this.state.datasetSplit , this.state.datasetType, indices)
            
                })
            }

        })

    }
    render() {

        let renderContent = ""
        this.state.data.length > 0 ?  renderContent = 
        <Card bg="light" className="h-100">
                <Card.Body>
                <div className = "row"> 

                <div className="col-sm-2">
                    <label className=" form-label fw-bolder ">
                      Datas per Page :
                    </label>
                    <select
                      className="form-select form-select-solid form-select-sm"
                      value={this.state.perPage}
                      onChange={this.handleImagesPerPage}
                    >
                      {imagePerPageList.map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                  </div>
                <div className="col-sm-2 offset-sm-8">
                <label className=" form-label fw-bolder ">
                    Jump Page:
                </label>
                <Form.Control size="sm" type="text" placeholder="Enter page" value={this.state.jumpPage} onChange={this.handleJumpPage} />

                </div>
                    <div className = "col-sm-12 py-2">   
                            
                        <div className = "row">
                        {this.state.datasetType === "vision" ? 
                        
                        this.state.imgData.map((img , key) =>(
                            <div className="col-sm-1 py-2" key = {key}>
                    
                           <img key = {key} className = "img-with-click" src = {"data:image/png;base64,"+img} alt="pic" width="50" height = "50"
                           onClick = {this.handleImageClick} />
                           </div>
                        ))  :

                        this.state.imgData.map((data , key) =>(
                            <div className="col-sm-12 py-2" key = {key}>
                            <Card style = {{height:"200px"}}>
                                <Card.Body>
                                    <div style={{overflowY:"auto" , maxHeight : "170px"}}>
                                    <p>
                                        {data}
                                    </p>
                                    </div>
                                </Card.Body>
                            </Card>
                           </div>
                        ))
                    } 
                        
                        </div>
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
                            containerClassName="pagination py-2"
                            activeClassName="active"
                            renderOnZeroPageCount={null}
                            forcePage = {this.state.currentPage}
                        />
                          
                    </div>
                </div>
                </Card.Body>
                <ImageModal key = {this.state.selectedImage} imgData = {this.state.selectedImage}/>
            </Card>

        : renderContent = ""
        return (
            renderContent
        )
    }
}

export default DataPagination