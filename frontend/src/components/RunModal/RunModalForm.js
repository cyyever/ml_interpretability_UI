import React, { Component } from "react";
import {getDatasetName ,  getModalName} from "../../assets/api-client.js";
import { Card , Form  , Alert} from "react-bootstrap";


class RunModalForm extends Component {
  constructor() {
    super();
    this.state = {
      datasets:[],
      selectedDataset: "default",
      modals: [],
      selectedModal: "default",
      numOfEpochs : "",
      learningRate : "",
      errorMessage : [],
    };
  }


  componentDidMount() {
    getDatasetName().then((data) => {
      this.setState({ datasets: data.datasetName });
    });

    getModalName().then((data) =>{
      this.setState({modals : data.modalName})
    })
  }

  handleDatasetInput = (event) => {
    var data = event.target.value;
    this.setState({ selectedDataset: data});
  }

  handleModalInput = (event) =>{
    var data = event.target.value;
    this.setState({selectedModal : data});
  }

  handleNumOfEpochs = (event) =>{
    var data = event.target.value;
    this.setState({numOfEpochs : data})
  }

  handleLearningRate = (event) =>{
    var data = event.target.value;
    this.setState({learningRate : data})

  }

  handleFormSubmit = () =>{
    this.setState({errorMessage : []} , ()=>{
      var errorMessage = []
      if(this.state.selectedDataset === "default"){
        errorMessage.push("Please select Dataset")
      }

      if(this.state.selectedModal === "default"){
        errorMessage.push("Please select Modal")
      }

      if(!this.state.numOfEpochs){
        errorMessage.push("Please enter number of Epochs for the modal")
      }else{
        if( !(!isNaN(this.state.numOfEpochs) && this.state.numOfEpochs % 1 === 0)){
          errorMessage.push("Please enter the correct number of Epochs")
        }
      }

      if(!this.state.learningRate){
        errorMessage.push("Please enter the learning rate for the modal")
      }else{
        if(isNaN(this.state.learningRate)){
        errorMessage.append("Please enter the correct learning rate")
        }
      }
      if(errorMessage.length < 0){

      }else{
        this.setState({errorMessage : errorMessage})
      }

     
    })
    
  }
  render() {
    return (
      <>
        <div className="my-2">
          <Card bg="light">
            <Card.Body>
              <div className = "row">
                <div className = "col-6">
                <form>
                <div className="form-group row">
                  <div className="col-sm-6 my-1">
                    <label className="form-label fw-bolder">
                      Dataset Name :
                    </label>
                    <select
                      className="form-select form-select-solid form-select-sm"
                      value={this.state.selectedDataset}
                      onChange={this.handleDatasetInput}
                    >
                      <option value="default" hidden disabled>
                        Select dataset name
                      </option>
                      {this.state.datasets.map((dataset) => (
                        <option key={dataset} value={dataset}>
                          {dataset}
                        </option>
                      ))}
                    </select>
                  </div>


                  <div className="col-sm-6 my-1">
                    <label className="form-label fw-bolder">
                      Modal Name :
                    </label>
                    <select
                      className="form-select form-select-solid form-select-sm"
                      value={this.state.selectedModal}
                      onChange={this.handleModalInput}
                    >
                      <option value="default" hidden disabled>
                        Select modal name
                      </option>
                      {this.state.modals.map((dataset) => (
                        <option key={dataset} value={dataset}>
                          {dataset}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-sm-6 my-1">
                    <label className="form-label fw-bolder">
                      Number of Epochs :
                    </label>
                    <Form.Control size="sm" type="text" placeholder="Enter Number of Epochs" value={this.state.numOfEpochs} onChange={this.handleNumOfEpochs} />

                  </div>

                  <div className="col-sm-6 my-1">
                    <label className="form-label fw-bolder">
                      Learning Rate :
                    </label>
                    <Form.Control size="sm" type="text" placeholder="Enter Learning Rate" value={this.state.learningRate} onChange={this.handleLearningRate} />
                  </div>                  
                  </div>
                  <button type ="button" className="btn btn-dark my-2 " onClick={this.handleFormSubmit}>Submit</button>
                  { this.state.errorMessage.length > 0 ? <Alert variant="danger"><ul>
                    {this.state.errorMessage.map((error) => (
                      <li><p>{error}</p></li>
                    ))}
                    </ul></Alert> :""}
              </form>
                </div>
              </div>
          
            </Card.Body>
          </Card>
        </div>

 
      </>
    );
  }
}

export default RunModalForm;
