import React, { Component } from 'react'
import { Form  , Row , Col , Spinner , Tabs , Tab} from 'react-bootstrap'
import {getImageData} from '../../assets/api-client'
import {ContributionTable} from  './ContributionTable'

class ContributionDisplay extends Component {
    constructor(props){
        super(props)
        this.state = {
        key : 1,
        contributionData :[],
        numOfData : 1,
        datasetName : "",
        maxImageData :[],
        minImageData :[],
        }

    }

    componentDidMount(){
        if(this.props.contributionData !== undefined && this.props.contributionData !== ""){
            this.setState({contributionData : this.props.contributionData , datasetName : this.props.datasetName},()=>{
              this.handleFormSubmit()
            })

        }
    }


    handlenumOfData = (event) =>{
      var data = event.target.value;
      this.setState({numOfData : data})
    }

    handleSelect = (key) =>{
      this.setState({key : key})
  }

    handleFormSubmit = () =>{
      let max_indices = []  
      let min_indices = []
      if (this.state.contributionData.length <= this.state.numOfData){
        for (let i = 0 ; i < this.state.contributionData.length ; i++){
          max_indices.push({value : this.state.contributionData[i] , index : i})
          min_indices.push({value : this.state.contributionData[i] , index : i})
        }
        }else{
          for (let i = 0 ; i < this.state.contributionData.length ; i++){
            if (max_indices.length < this.state.numOfData){
              max_indices.push({value : this.state.contributionData[i] , index : i})
              min_indices.push({value : this.state.contributionData[i] , index : i})
              if(max_indices.length === this.state.numOfData){
                max_indices.sort((a,b) => a.value - b.value)
                min_indices.sort((a,b) => b.value - a.value)
              }
            }else{
              if(this.state.contributionData[i] > max_indices[0].value ){
                  max_indices[0] = {value:this.state.contributionData[i] , index: i}
                  max_indices.sort((a,b) => a.value - b.value)
                }
                if(this.state.contributionData[i] < min_indices[0].value){
                  min_indices[0] = {value:this.state.contributionData[i] , index: i}
                  min_indices.sort((a,b) => b.value - a.value)
                }
            }
          }
        }

        max_indices = max_indices.filter(function(item) { return item.value >= 0 }).reverse()
        min_indices = min_indices.filter(function(item) { return item.value < 0 }).reverse()

        let max_result = max_indices.map(function(a) {return a.index})
        let min_result = min_indices.map(function(a){return a.index})

        if(max_result.length > 0){
        getImageData(this.props.datasetName , 1 , max_result).then((data) =>{
         
          for(let i = 0 ; i < data.length ; i++){
              data[i].value = max_indices[i].value
          }
          this.setState({maxImageData : data})
        })
      }

      if(min_result.length > 0){

        getImageData(this.props.datasetName, 1 , min_result).then((data) =>{
          for(let i = 0 ; i < data.length ; i++){
            data[i].value = min_indices[i].value
        }
        this.setState({minImageData : data})
        })
      }
    }
  
  render() {

  let displayContent = ""

  this.state.contributionData.length > 0 ? displayContent =
  <> 
  <div className = "col-12 py-2 mx-2">
    <Form>
        <Form.Group as={Row} controlId = "numsOfContributionData">
          <Form.Label  column sm ="2" className = "form-label fw-bolder">
            Top K Dataset Contribution:
          </Form.Label >
          <Col sm="2">
              <Form.Control type="textfield" className = "form form-solid form-sm" size = "sm" placeholder="default value of 1 " value={this.state.numOfData} onChange={this.handlenumOfData}/>
          </Col> 

          <Col sm = "1">
          <button type ="button" className="btn btn-dark" onClick={this.handleFormSubmit}>Submit</button>
          </Col>
        </Form.Group>
    </Form>
    <div className = "row">
      <div className = "col-12 my-2">
      <Tabs activeKey={this.state.key} onSelect={this.handleSelect} id="controlled-tab-example">
      <Tab eventKey={1} title="Positive Contribution">
      <ContributionTable id = {this.state.maxImageData} data_={this.state.maxImageData}/> 
      </Tab>
      <Tab eventKey={2} title="Negative Contribution">
      <ContributionTable id = {this.state.maxImageData} data_={this.state.minImageData}/> 
      </Tab>
      </Tabs>

        </div> 
    </div>
  </div>
    
    </>
 : displayContent =   <div className="col-2 form-spinner"><Spinner animation="border" /></div>
    return (
    <div className = "row my-2">
      {displayContent}
    </div>)
  }
}

export default ContributionDisplay
