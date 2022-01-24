import React, { Component } from 'react';
import {Spinner, Card} from 'react-bootstrap';
import {getModelResult} from '../../assets/api-client'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

class ModelGraphsDisplay extends Component {

    constructor(props){
        super(props);
        this.state={
            data : [],
            intervalId :"",
            modelId : "",
            numOfEpochs : "",
            acc_result : [],
            loss_result : [],
            displayedSpinner:false,
        }     
    }
  
    componentDidMount(){
        if(this.props.modelId !== undefined && this.props.modelId !== ""){
        this.setState({modelId : this.props.modelId , numOfEpochs : this.props.numOfEpochs , displayedSpinner : true} , ()=>{
            var id = setInterval(() => {
                getModelResult(this.state.modelId , this.state.intervalId).then((data) =>{
                    this.setState({data : data} , () =>{
                        let valid_acc = []
                        let train_acc = []
                        let valid_loss = []
                        let train_loss = []
                        if (data !== []){
                        data.map((result) => {
                            valid_acc.push(result.validation_acc)
                            train_acc.push(result.training_acc)
                            valid_loss.push(result.validation_loss)
                            train_loss.push(result.training_loss)
                        })
                        let labels = Array.from({length: data.length }, (_, i) => i + 1)

                        let acc_result = [
                            {
                             label : 'Validation Accuracy',
                             lineTension:0.4,
                             data : valid_acc,
                             borderColor: "#273974",

                            },
                            {
                                label : 'Training Accuracy',
                                lineTension:0.4,
                                data : train_acc,
                                borderColor: "#f01d32",
                            },
                        ]

                        let loss_result = [
                            {
                             label : 'Validation Loss',
                             lineTension:0.4,
                             data : valid_loss,
                             borderColor: "#273974",

                            },
                            {
                                label : 'Training Loss',
                                lineTension:0.4,
                                data : train_loss,
                                borderColor: "#f01d32",
                            },
                        ]

                        let data_ = { labels : labels , datasets : acc_result}
                        let data__ = {labels : labels , datasets : loss_result}

                        this.setState({acc_result: data_ , loss_result : data__})
                    }     
                        if(data.length === parseInt(this.state.numOfEpochs)){
                            this.setState({displayedSpinner : false})
                            clearInterval(this.state.intervalId)


                    }
                })
                })
            } , 10000)
            this.setState({intervalId : id})
            })
        }
    }

    render() {
    
        const options_acc = {
            responsive: true,
            plugins: {
              legend: {
                position: 'right',
              },
              title: {
                display: true,
                text: 'Validation Acc vs Training Acc',
              },
            },
          };

          const options_loss = {
            responsive: true,
            plugins: {
              legend: {
                position: 'right',
              },
              title: {
                display: true,
                text: 'Validation Loss vs Training Loss',
              },
            },
          };


    let renderContent = ""
        this.state.data.length > 0 || this.state.displayedSpinner ?   renderContent = 
        <>
        <Card bg="light">
            <Card.Body>
            <div className = "row">
            {this.state.displayedSpinner ?  
                  <div className="col-12 form-spinner"><Spinner animation="border" /></div> : ""}
                <div className = "col-6">
            {this.state.data.length > 0 ?  
                <Line data = {this.state.acc_result} options = {options_acc}/> : ""}
                </div>
                <div className = "col-6">
            {this.state.data.length > 0 ?  
                <Line data = {this.state.loss_result} options = {options_loss}/> : ""}
                </div>
            </div>
            </Card.Body>
        </Card>
        </>

        : renderContent = ""
    return(renderContent)
  }
}

export default ModelGraphsDisplay;
