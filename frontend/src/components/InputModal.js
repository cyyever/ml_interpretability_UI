import React, { Component } from 'react'
import { Button , Form, Modal , Row , Alert } from 'react-bootstrap';

const datasets = [
    {
        id: 1,
        name: 'dataset 1',
        label:'dataset 1 label',
        uploadDate: '1/12/2021'
    },
    {
        id: 2,
        name: 'dataset 2',
        label:'dataset 2 label',
        uploadDate: '2/12/2021'
    },
    {
        id: 3,
        name: 'dataset 3',
        label:'dataset 3 label',
        uploadDate: '3/12/2021'
    },
]


class InputModal extends Component {
    constructor(){
        super();
        this.state = {
            showHide:false,
            selectedEdit:"",
            errorMessage:"",
            datasets : datasets,
            selectedDataset:datasets[0]
        }
    }


    handleModalShowHide(){
        this.setState({showHide : !this.state.showHide , selectedEdit:"" , errorMessage:"" , selectedDataset:datasets[0]});
    }

    handleModalNext(){
        if (this.state.selectedEdit === ""){
            this.setState({errorMessage: "Please select at least one option"});
        }else{
            this.setState({errorMessage: ""});
        }
    }

    handleModalBack(){
        this.setState({selectedEdit:"" , errorMessage:""})
    }
    onEditDataChanged = (e) =>{
        this.state.selectedEdit = e.target.value;
    }

    handleDatasetInput = event =>{
        var data = datasets.find(dataset => dataset.id === parseInt(event.target.value))
        this.setState({selectedDataset : data});
    
     }


    handleModalDeleteDataset(){
        this.handleModalShowHide();
        alert("delete")
    }
    handleModalNewDatasetUpload(){
        this.handleModalShowHide();
        alert("upload");
    }
    render() {
        const selectedEdit = this.state.selectedEdit;
        let modelContent;
        
        modelContent  = <>
                        <Modal.Body>
                            <form>
                                 <div className="form-group row">
                                    <Form.Group as={Row} className="mb-3 mx-2">
                                        <label className = "col-form-label" >Edit Dataset : </label>
                                            <div className="mx-2">
                                                <Form.Check type = "radio" value="add" label="Add New Dataset" name="editDatasetRadio" id = "AddNewDatasetRadio" onChange={this.onEditDataChanged}></Form.Check>
                                                <Form.Check type = "radio" value="delete" label="Delete Dataset" name="editDatasetRadio" id = "DeleteatasetRadio" onChange={this.onEditDataChanged}></Form.Check>
                                            </div>
                                    </Form.Group>
                                </div>
                             </form>

                             { this.state.errorMessage ? <Alert variant = 'danger' className="py-1">{this.state.errorMessage}</Alert> : ""}
                             
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => this.handleModalShowHide()}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={() => this.handleModalNext()}>
                                Next
                            </Button>
                        </Modal.Footer>
                        </>;
 
       
        if(selectedEdit === "add"){

            modelContent  = <>
            <Modal.Body>
            <form class="form-horizontal">
                <div className="form-group row py-2">
                    <label class="col-sm-4 control-label">Dataset Name:</label>
                    <div class="col-sm-8">
                    <input type="text" class="form-control" id="newDatasetName" placeholder="Enter new Dataset Name"/>
                    </div>
                </div>

                <div className="form-group row py-2">
                    <label class="col-sm-4 control-label">Dataset Upload:</label>
                    <div class="col-sm-8">
                    <input type="file" class="form-control-file" id="newDatasetFile"/>
                    </div>
                </div>
            </form>



                { this.state.errorMessage ? <Alert variant = 'danger' className="py-1">{this.state.errorMessage}</Alert> : ""}
                 
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => this.handleModalBack()}>
                    Back
                </Button>
                <Button variant="primary" onClick={() => this.handleModalNewDatasetUpload()}>
                    Add New Dataset
                </Button>
            </Modal.Footer>
            </>
            
        }else if(selectedEdit === "delete"){
            modelContent  = <>
            <Modal.Body>
            <form class="form-horizontal">
                <div className="form-group row py-2">
                    <label class="col-sm-4 control-label">Dataset Name:</label>
                    <div class="col-sm-8">
                    <select className = "form-select-sm px-3" value = {this.state.selectedDataset.id} onChange = {this.handleDatasetInput}>
                       {this.state.datasets.map(dataset =>(<option key = {dataset.id} value = {dataset.id}>{dataset.name}</option>))}
                    </select> 
                    </div>
                </div>

            </form>
                { this.state.errorMessage ? <Alert variant = 'danger' className="py-1">{this.state.errorMessage}</Alert> : ""}
                 
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => this.handleModalBack()}>
                    Back
                </Button>
                <Button variant="primary" onClick={() => this.handleModalDeleteDataset()}>
                    Delete Dataset
                </Button>
            </Modal.Footer>
            </>
        }
        
        return (
            <>
            <i className="fa fa-edit ms-2 fa-lg" onClick={() => this.handleModalShowHide()}></i>

            <div>
                <Modal show={this.state.showHide} onHide={() => this.handleModalShowHide()}  >
                    <Modal.Header closeButton>
                        <Modal.Title>Dataset Setting</Modal.Title>
                    </Modal.Header>
                    {modelContent}
                </Modal>
            </div>
            </>
        )
    }
}

export default InputModal
