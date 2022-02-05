import React, { Component } from "react";
import {getDatasetName ,  getModelName , startRunModel , getLearningRateScheduler , getOptimizers} from "../../assets/api-client.js";
import { Card , Form  , Alert} from "react-bootstrap";
import ModelGraphsDisplay from "./ModelGraphsDisplay"

const modelType = ['Regular' , 'HYDRA'];

const optimizersForHYDRA = ["SGD"]
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
      learningRateSchedulers : [],
      selectedLearningRateScheduler : "",
      optimizers : [],
      selectedOptimizers : "",
      selectedModelType : modelType[0],
      isOptimizerDisabled : false,
    };
  }


  componentDidMount() {
    getDatasetName().then((data) => {
      this.setState({ datasets: data.datasetName });
    });

    getModelName().then((data) =>{
      this.setState({models : data.modelName})
    })

    getLearningRateScheduler().then((data) => {
      this.setState({learningRateSchedulers : data.learning_rate_schedulers , selectedLearningRateScheduler : data.learning_rate_schedulers[0]})
    })

    getOptimizers().then((data) =>{
      this.setState({optimizers : data.optimizers , selectedOptimizers : data.optimizers[0]})
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
  handleLearningRateScheduler = (event) =>{
    var data = event.target.value
    this.setState({selectedLearningRateScheduler : data})
  }

  handleOptimizer = (event) =>{
    var data = event.target.value
    this.setState({selectedOptimizers : data})
  }

  handleModelTypeInput = (event) =>{
    var modelType = event.target.value
   if (modelType === "HYDRA"){
     this.setState({optimizers : optimizersForHYDRA , selectedOptimizers : optimizersForHYDRA[0], selectedModelType : modelType})
   }else{
    getOptimizers().then((data) =>{
      this.setState({optimizers : data.optimizers , selectedOptimizers : data.optimizers[0],  selectedModelType : modelType})
    })
   }
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
        startRunModel(this.state.selectedDataset , this.state.selectedModel , this.state.numOfEpochs , this.state.learningRate 
          , this.state.selectedLearningRateScheduler , this.state.selectedOptimizers).then((data) => {
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
                      Model Type:
                    </label>
                    <select
                      className="form-select form-select-solid form-select-sm"
                      value={this.state.selectedModelType}
                      onChange={this.handleModelTypeInput}
                    >
                      {modelType.map((modeltype) => (
                        <option key={modeltype} value={modeltype}>
                          {modeltype}
                        </option>
                      ))}
                    </select>
                  </div>


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

                  <div className="col-sm-6 my-1">
                    <label className="form-label fw-bolder">
                      Learning Rate Scheduler:
                    </label>
                    <select
                      className="form-select form-select-solid form-select-sm"
                      value={this.state.selectedLearningRateScheduler}
                      onChange={this.handleLearningRateScheduler}
                    >
                    {this.state.learningRateSchedulers.map((learingRateScheduler) => (
                        <option key={learingRateScheduler} value={learingRateScheduler}>
                          {learingRateScheduler}
                        </option>
                      ))} 
                      </select>
                     </div>

                     <div className="col-sm-6 my-1">
                    <label className="form-label fw-bolder">
                      Optimizer:
                    </label>
                    <select
                      className="form-select form-select-solid form-select-sm"
                      value={this.state.selectedOptimizers}
                      onChange={this.handleOptimizer}
                    >
                    {this.state.optimizers.map((optimizer) => (
                        <option key={optimizer} value={optimizer}>
                          {optimizer}
                        </option>
                      ))} 
                      </select>
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
