import React, { Component } from "react";
import {
  getDatasetName,
  getDatasetLabel,
  getLabelIndices
} from "../../assets/api-client.js";
import { Card , Spinner } from "react-bootstrap";
import DataPagination from "./DataPagination.js";
const datasetSplit = [
  {
    type: "Train",
    value: 1,
  },
  {
    type: "Test",
    value: 2,
  },
  {
    type: "Validation",
    value: 3,
  },
];

class DatasetForm extends Component {
  constructor() {
    super();
    this.state = {
      datasets: [],
      labels: [],
      selectedDataset: "default",
      selectedDatasetSplit: datasetSplit[0].value,
      selectedDatasetLabel: "default",
      data: [],
      displayedSpinner : false,
      datasetType :"",
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
    var data = event.target.value;
    this.setState(
      { data : [] ,selectedDataset: data, labels: [], selectedDatasetLabel: "default" , displayedSpinner : true , datasetType : data.split("_")[1]},
      () => {
        getDatasetLabel(
          this.state.selectedDataset.split("_")[0],
          this.state.selectedDatasetSplit
        ).then((data) => {
          this.setState({ labels: data.datasetLabelName  , displayedSpinner : false});
        });
      }
    );
  };

  handleDatasetSplitInput = (event) => {
    this.setState({ selectedDatasetSplit: event.target.value , displayedSpinner : true}, () => {
      if (this.state.selectedDataset !== "default"  && this.state.selectedDatasetLabel !=="default") {
        getLabelIndices(
          this.state.selectedDataset.split("_")[0],
          this.state.selectedDatasetSplit,
          this.state.selectedDatasetLabel
        ).then((data_) => {
          this.setState({ data: data_.indices  , displayedSpinner : false});
        });
      }
    });
  };

  handleDatasetLabel = (event) => {
    this.setState(
      { selectedDatasetLabel: event.target.value, displayedSpinner : true },
      () => {
        if (this.state.selectedDatasetLabel !== "default") {
          getLabelIndices(
            this.state.selectedDataset.split("_")[0],
            this.state.selectedDatasetSplit,
            this.state.selectedDatasetLabel
          ).then((data_) => {
            this.setState({ data: data_.indices ,displayedSpinner : false});
          });
        }
      }
    );
  };


  render() {
    return (
      <>
        <div className="my-2">
          <Card bg="light">
            <Card.Body>
              <form>
                <div className="form-group row">
                  <div className="col-sm-3">
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
                     
                      <optgroup label = "Vision Dataset">
                      {this.state.datasets.datasettype_vision !== undefined ? this.state.datasets.datasettype_vision.map((dataset) => (
                        <option key={dataset} value={dataset+"_" + "vision"}>
                          {dataset}
                        </option>
                      )) : "" }
                      </optgroup>

                      <optgroup label = "Text Dataset">
                      {this.state.datasets.datasettype_text !== undefined ? this.state.datasets.datasettype_text.map((dataset) => (
                        <option key={dataset} value={dataset + "_" + "text"}>
                          {dataset}
                        </option>
                      )) : ""}
                      </optgroup>
                    </select>
                  </div>

                  <div className="col-sm-3">
                    <label className=" form-label fw-bolder ">
                      Dataset Split :
                    </label>
                    <select
                      className="form-select form-select-solid form-select-sm"
                      value={this.state.selectedDatasetSplit}
                      onChange={this.handleDatasetSplitInput}
                    >
                      {datasetSplit.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-sm-3">
                    <label className=" form-label fw-bolder ">
                      Dataset Label :
                    </label>
                    <select
                      className="form-select form-select-solid form-select-sm"
                      value={this.state.selectedDatasetLabel}
                      onChange={this.handleDatasetLabel}
                    >
                      <option value="default" hidden disabled>
                        Select dataset Label
                      </option>
                      {this.state.labels.map((label) => (
                        <option key={label.value} value={label.value}>
                          {label.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  {this.state.displayedSpinner ?  
                  <div className="col form-spinner"><Spinner animation="border" /></div> : ""}
                 
                </div>
              </form>
            </Card.Body>
          </Card>
        </div>
    
        <DataPagination key={this.state.data} data = {this.state.data} datasetName = {this.state.selectedDataset.split("_")[0]} datasetSplit = {this.state.selectedDatasetSplit} datasetType = {this.state.selectedDataset.split("_")[1]} displaySpinner = {(e) => {this.setState({displayedSpinner : e})}}/>
      </>
    );
  }
}

export default DatasetForm;
