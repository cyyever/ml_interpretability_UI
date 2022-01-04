import React, { Component } from "react";
import {
  getDatasetName,
  getDatasetLabel,
  getLabelIndices
} from "../../assets/api-client.js";
import { Card , Spinner } from "react-bootstrap";
import ImagePagination from "./ImagePagination.js";
const datasetType = [
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
      selectedDatasetType: datasetType[0].value,
      selectedDatasetLabel: "default",
      data: [],
      displayedSpinner : false,
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
      { selectedDataset: data, labels: [], selectedDatasetLabel: "default" , displayedSpinner : true },
      () => {
        getDatasetLabel(
          this.state.selectedDataset,
          this.state.selectedDatasetType
        ).then((data) => {
          this.setState({ labels: data.datasetLabelName  , displayedSpinner : false});
        });
      }
    );
  };

  handleDatasetTypeInput = (event) => {
    this.setState({ selectedDatasetType: event.target.value , displayedSpinner : true}, () => {
      if (this.state.selectedDataset !== "default"  && this.state.selectedDatasetLabel !=="default") {
        getLabelIndices(
          this.state.selectedDataset,
          this.state.selectedDatasetType,
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
            this.state.selectedDataset,
            this.state.selectedDatasetType,
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
                      {this.state.datasets.map((dataset) => (
                        <option key={dataset} value={dataset}>
                          {dataset}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-sm-3">
                    <label className=" form-label fw-bolder ">
                      Dataset Type :
                    </label>
                    <select
                      className="form-select form-select-solid form-select-sm"
                      value={this.state.selectedDatasetType}
                      onChange={this.handleDatasetTypeInput}
                    >
                      {datasetType.map((type) => (
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

        <ImagePagination key={this.state.data} data = {this.state.data} datasetName = {this.state.selectedDataset} datasetType = {this.state.selectedDatasetType} displaySpinner = {(e) => {this.setState({displayedSpinner : e})}}/>


      </>
    );
  }
}

export default DatasetForm;
