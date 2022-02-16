import React, { Component } from 'react'
import {Card , Tabs , Tab} from 'react-bootstrap'
import ModelGraphsDisplay from "./ModelGraphsDisplay"
import ContributionDisplay from './ContributionDisplay';
class ResultDisplay extends Component {

    constructor(props){
        super(props);
        this.state = {
            key : 1,
            modelId : "",
            numOfEpochs : "",
            isHYDRA : false,
            displayedContent : false
        }
    }

    componentDidMount(){
        if(this.props.modelId !== undefined && this.props.modelId !==""){
            this.setState({modelId : this.props.modelId , numOfEpochs : this.props.numOfEpochs , isHYDRA : this.props.isHYDRA , displayedContent : true})
        }
    }

    handleSelect = (key) =>{
        
        this.setState({key : key})

    }

  render() {
    let content

    if(this.state.displayedContent){
        if(!this.state.isHYDRA){
           content =  
           <Card bg="light">
            <Card.Body>
           <ModelGraphsDisplay key = {this.state.modelId}  modelId = {this.state.modelId} numOfEpochs = {this.state.numOfEpochs}  displaySpinner= {(b)=> {this.setState({displayedSpinner : b})}}/>
           </Card.Body>
            </Card>
        }else{
            content = 
            <>
        <Card bg="light">
        <Card.Body>
        <div>
        <Tabs activeKey={this.state.key} onSelect={this.handleSelect} 
       id="controlled-tab-example">
              <Tab eventKey={1} title="Graph Result">
              <ModelGraphsDisplay key = {this.state.modelId}  modelId = {this.state.modelId} numOfEpochs = {this.state.numOfEpochs}  displaySpinner= {(b)=> {this.setState({displayedSpinner : b})}}/>
              
              </Tab>
              <Tab eventKey={2} title="Contribution Result">
                {//<ContributionDisplay key = {this.state.modelId} modelId = {this.state.modelId}></ContributionDisplay>//
                }
                

              </Tab>
      </Tabs>      
        </div>
        </Card.Body>
        </Card>
        </>

        }
    }else{
        content = ""
    }
    return (content)
  }
}

export default ResultDisplay
