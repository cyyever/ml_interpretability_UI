import React, { Component } from 'react';
import { Card} from 'react-bootstrap';
import {getModelResult} from '../../assets/api-client'
class ModelGraphsDisplay extends Component {

    constructor(props){
        super(props);
        this.state={
            data : [],
            intervalId :"",
            modelId : "",
            numOfEpochs : "",
        }     
    }
  
    componentDidMount(){
        if(!this.props.modelId && this.props.modelId !== undefined && this.props.modelId !== ""){
        this.setState({modelId : this.props.modelId , numOfEpochs : this.props.numOfEpochs} , ()=>{
            var id = setInterval(() => {
                getModelResult(this.state.modelId , this.state.intervalId).then((data) =>{
                    this.setState({data : data})
                    if(data.length === parseInt(this.state.numOfEpochs)){
                        clearInterval(this.state.intervalId)
                }
                })
            } , 10000)
            this.setState({intervalId : id})
            })
        }
    }

    render() {

    let renderContent = ""
        this.state.data.length > 0 ?  renderContent = 
        <>
        <Card bg="light">
            <Card.Body>

            </Card.Body>
        </Card>
        </>

        : renderContent = ""
    return(renderContent)
  }
}

export default ModelGraphsDisplay;
