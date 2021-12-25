import React, { Component } from "react";
import { getDatasetName , getDatasetLabel , getDataset} from "../../assets/api-client.js";
import { Card } from "react-bootstrap";
import DatasetTable from "./DatasetTable.js";

const datasetType = [
  {
    type : "Train",
    value : 1
  },
  {
    type : "Test",
    value : 2
  },
  {
    type : "Validation",
    value : 3
  },

];

class DatasetForm extends Component {
  constructor() {
    super();
    this.state = {
      datasets: [],
      labels: [],
      selectedDataset: "default",
      selectedDatasetType: datasetType[0].value,
      selectedDatasetLabel: "default",
      data : [],
    };
  }

  /*  
 handleInput = (e) => {
     this.setState({[e.target.name]: e.target.value} , () =>{
         alert(this.state.selectedDataset)
     })
 
 }
 */

  componentDidMount() {
    getDatasetName().then((data) => {
      this.setState({ datasets: data.datasetName });
    });
  }

  handleDatasetInput = (event) => {
    var data = event.target.value
    this.setState({ selectedDataset: data , labels: []  , selectedDatasetLabel : "default"} ,  () =>{
      getDatasetLabel(this.state.selectedDataset , this.state.selectedDatasetType).then((data) => {
        this.setState({labels: data.datasetLabelName})
      })

    });
  };

  handleDatasetTypeInput = (event) =>{
    this.setState({selectedDatasetType : event.target.value , selectedDatasetLabel: "default"} , () =>{
      if(this.state.selectedDataset !== "default"){
        getDatasetLabel(this.state.selectedDataset , this.state.selectedDatasetType).then((data) => {
          this.setState({labels: data.datasetLabel , data : []})
        })
      }
    })
  };

  handleDatasetLabel = (event) =>{
    this.setState({selectedDatasetLabel : event.target.value , data:[]} , () =>{
      if(this.state.selectedDatasetLabel !== "default"){
        getDataset(this.state.selectedDataset , this.state.selectedDatasetType , this.state.selectedDatasetLabel).then((data_) =>{
          this.setState({data : data_})
      })
      }
    })
  }

  render() {
    return (
      <>
      <div className="my-2">
        <Card bg="light">
          <Card.Body>
            <form>
              <div className="form-group row">
                  <div className="col-sm-3"> 
                    <label className="form-label fw-bolder">Dataset Name :</label>
                    <select className="form-select form-select-solid form-select-sm" value={this.state.selectedDataset} onChange={this.handleDatasetInput}>
                      <option value="default" hidden disabled>
                        Select dataset name
                      </option>
                      {this.state.datasets.map((dataset) => (<option key={dataset} value={dataset}>{dataset}</option> ))}
                    </select>
                  </div>

                  <div className="col-sm-3">
                    <label className=" form-label fw-bolder ">Dataset Type :</label>
                    <select className="form-select form-select-solid form-select-sm" value={this.state.selectedDataset} onChange={this.handleDatasetTypeInput}>
                      {datasetType.map((type) => (<option key={type.value} value={type.value}> {type.type} </option>))}
                    </select>
                  </div>

                  <div className="col-sm-3">
                    <label className=" form-label fw-bolder ">Dataset Label :</label>
                    <select className="form-select form-select-solid form-select-sm" value={this.state.selectedDatasetLabel} onChange={this.handleDatasetLabel}>
                      <option value="default" hidden disabled>
                        Select dataset Label
                      </option>
                      {this.state.labels.map((label) => (<option key={label.value} value={label.value}>{label.label}</option>))}
                    </select>
                  </div>
                </div>
            </form>
          </Card.Body>
        </Card>
      </div>

      <DatasetTable data = {this.state.data}/>
      </>
    );
  }
}

export default DatasetForm;
