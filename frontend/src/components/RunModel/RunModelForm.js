import React, { Component } from "react";
import {getDatasetName ,  getModelName , startRunModel } from "../../assets/api-client.js";
import { Card , Form  , Alert} from "react-bootstrap";
import ModelGraphsDisplay from "./ModelGraphsDisplay"

class RunModelForm extends Component {
  constructor() {
    super();
    this.state = {
      datasets:[],
      selectedDataset: "default",
      models: [],
      selectedModel: "default",
      numOfEpochs : "",
      learningRate : "",
      errorMessage : [],
      modelId : "",
    };
  }


  componentDidMount() {
    getDatasetName().then((data) => {
      this.setState({ datasets: data.datasetName });
    });

    getModelName().then((data) =>{
      this.setState({models : data.modelName})
    })
  }

  handleDatasetInput = (event) => {
    var data = event.target.value;
    this.setState({ selectedDataset: data});
  }

  handleModelInput = (event) =>{
    var data = event.target.value;
    this.setState({selectedModel : data});
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

      if(this.state.selectedModel === "default"){
        errorMessage.push("Please select Model")
      }

      if(!this.state.numOfEpochs){
        errorMessage.push("Please enter number of Epochs for the model")
      }else{
        if( !(!isNaN(this.state.numOfEpochs) && this.state.numOfEpochs % 1 === 0)){
          errorMessage.push("Please enter the correct number of Epochs")
        }
      }

      if(isNaN(this.state.learningRate)){
        errorMessage.append("Please enter the correct learning rate")
      }
      
      if(errorMessage.length <= 0){
        startRunModel(this.state.selectedDataset , this.state.selectedModel , this.state.numOfEpochs , this.state.learningRate).then((data) => {
          this.setState({modelId : data.modelId})


        })
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
                      Model Name :
                    </label>
                    <select
                      className="form-select form-select-solid form-select-sm"
                      value={this.state.selectedModel}
                      onChange={this.handleModelInput}
                    >
                      <option value="default" hidden disabled>
                        Select model name
                      </option>
                      {this.state.models.map((dataset) => (
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
        <ModelGraphsDisplay key = {this.state.modelId}  modelId = {this.state.modelId} numOfEpochs = {this.state.numOfEpochs}/>
 
      </>
    );
  }
}

export default RunModelForm;
