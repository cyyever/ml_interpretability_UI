import React, { Component } from 'react'
import { Form  , Row , Col , Spinner} from 'react-bootstrap'
import {getImageData} from '../../assets/api-client'
class ContributionDisplay extends Component {
    constructor(props){
        super(props)
        this.state = {
        contributionData :[],
        numOfData : "",
        datasetName : "",
        maxImageData :[],
        minImageData :[],
        }

    }

    componentDidMount(){
        if(this.props.contributionData !== undefined && this.props.contributionData !== ""){
            this.setState({contributionData : this.props.contributionData , datasetName : this.props.datasetName})
        }
    }


    handlenumOfData = (event) =>{
      var data = event.target.value;
      this.setState({numOfData : data})
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
        console.log(max_indices)
        max_indices = max_indices.filter(function(item) { return item.value >= 0 })
        min_indices = min_indices.filter(function(item) { return item.value < 0 }) 

        let max_result = max_indices.map(function(a) {return a.index}).reverse()
        let min_result = min_indices.map(function(a){return a.index}).reverse()

        getImageData(this.props.datasetName , 1 , max_result).then((data) =>{
          this.setState({maxImageData : data})
        })
        getImageData(this.props.datasetName, 1 , min_result).then((data) =>{
         this.setState({minImageData : data})
        })
        
    }
  render() {
    let positiveDisplay =""
    this.state.maxImageData.length > 0 ? positiveDisplay = 
    <div className = "col-12 py-2 mx-2">
    <div className = "row">
        <div className = "col-12">
          <h3>Positive Contribution</h3>
        </div>
          {this.state.maxImageData.map((img , key) =>(
                        <div className="col-sm-1 py-2" key = {key}>
                       <img key = {key} src = {"data:image/png;base64,"+img} alt="pic" width="50" height = "50"/>
                       </div>
                    ))}
    </div>
    </div> : positiveDisplay = ""


    let negativeDisplay = ""
    this.state.minImageData.length > 0 ? negativeDisplay = 
    <div className = "col-12 py-2 mx-2">
    <div className = "row">
        <div className = "col-12">
          <h3>Negative Contribution</h3>
        </div>
          {this.state.minImageData.map((img , key) =>(
                        <div className="col-sm-1 py-2" key = {key}>
                       <img key = {key} src = {"data:image/png;base64,"+img} alt="pic" width="50" height = "50"/>
                       </div>
                    ))}
    </div>
  </div> : negativeDisplay = ""


  let displayContent = ""

  this.state.contributionData.length > 0 ? displayContent =
  <> 
  <div className = "col-12 py-2 mx-2">
    <Form>
        <Form.Group as={Row} controlId = "numsOfContributionData">
          <Form.Label className = "form-label fw-bolder">
            Number to display :
          </Form.Label>
          <Col sm="2">
              <Form.Control type="textfield" className = "form form-solid form-sm" size = "sm" placeholder="Enter number of data to display" value={this.state.numOfData} onChange={this.handlenumOfData}/>
          </Col> 

          <Col sm = "1">
          <button type ="button" className="btn btn-dark" onClick={this.handleFormSubmit}>Submit</button>
          </Col>
        </Form.Group>
    </Form>
  </div>
    {positiveDisplay}
    {negativeDisplay}
    </>
 : displayContent =   <div className="col-2 form-spinner"><Spinner animation="border" /></div>
    return (
    <div className = "row my-2">
      {displayContent}
    </div>)
  }
}

export default ContributionDisplay
