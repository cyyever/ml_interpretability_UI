import React, { Component } from 'react';
import {Spinner, Form} from 'react-bootstrap';
import {getModelResult , getContributionResult} from '../../assets/api-client'
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
            learning_result : [],
            displayedSpinner:false,
            accCheckBox :true,
            lossCheckBox : true,
            learningRateCheckBox : true,
        }     
    }
  
    componentDidMount(){
        if(this.props.modelId !== undefined && this.props.modelId !== ""){
        this.setState({modelId : this.props.modelId , numOfEpochs : this.props.numOfEpochs , displayedSpinner : true} , ()=>{
          var id = setInterval(() => {
                getModelResult(this.state.modelId , this.state.intervalId).then((data) =>{
                    this.setState({data : data.result} , () =>{
                        let valid_acc = []
                        let train_acc = []
                        let valid_loss = []
                        let train_loss = []
                        let learning_rates = []
                        let labels = []
                        if (data.result !== []){
                        data.result.forEach((result) => {
                            valid_acc.push(result.validation_acc)
                            train_acc.push(result.training_acc)
                            valid_loss.push(result.validation_loss)
                            train_loss.push(result.training_loss)
                            learning_rates.push(result.learning_rate)
                            labels.push(result.epoch)

                        })

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

                        let learning_rate_result = [
                          {
                           label : 'Learning Rate',
                           lineTension:0.4,
                           data : learning_rates,
                           borderColor: "#273974",

                          }
                    
                      ]

                        let data_ = { labels : labels , datasets : acc_result}
                        let data__ = {labels : labels , datasets : loss_result}
                        let data___ = {labels : labels , datasets : learning_rate_result}
                                            
                        this.setState({acc_result: data_ , loss_result : data__ , learning_result : data___})
                    }     
                        if(data.flag === true){
                          this.setState({displayedSpinner : false})
                            clearInterval(this.state.intervalId)
                            getContributionResult(this.state.modelId).then((data) =>{
                              this.props.passContributionData(data.contribution)
                            })
                            


                    }
                })
                })
            } , 10000)
            this.setState({intervalId : id})
            })
        }
    }

    handleAccCheckBox = () =>{
      this.setState({accCheckBox : ! this.state.accCheckBox})
    }

    handleLossCheckBox = () =>{
      this.setState({lossCheckBox : ! this.state.lossCheckBox})
    }

    handleLearningRateCheckBox = () =>{
      this.setState({learningRateCheckBox : ! this.state.learningRateCheckBox})
    }

    render() {
    
        const options_acc = {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
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
                position: 'top',
              },
              title: {
                display: true,
                text: 'Validation Loss vs Training Loss',
              },
            },
          };

          const options_learningRate = {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Learning Rate',
              },
            },
          };

    let renderContent = ""
        this.state.data.length > 0 || this.state.displayedSpinner ?   renderContent = 
        <>
            <div className = "row my-2">
            <div className = "col-12 py-2 mx-2">
                <Form>
                  <div className = "row">
                    <div className = "col-2">
                    <Form.Switch label = "Accuracy" defaultChecked = {this.state.accCheckBox} onChange={this.handleAccCheckBox}/>
                    </div>
                    <div className = "col-2">
                    <Form.Switch label = "Loss" defaultChecked = {this.state.lossCheckBox} onChange={this.handleLossCheckBox}/>
                    </div>
                    <div className = "col-2">
                    <Form.Switch label = "Learning Rate" defaultChecked = {this.state.learningRateCheckBox} onChange={this.handleLearningRateCheckBox}/>
                    </div>

                    {this.state.displayedSpinner ?  
                  <div className="col-2 form-spinner"><Spinner animation="border" /></div> : ""}
                  </div>
                </Form>
              </div>
            {this.state.data.length > 0 && this.state.accCheckBox  ?  
            <div className = "col-6">
                <Line data = {this.state.acc_result} options = {options_acc}/>
            </div> : ""}
               
            {this.state.data.length > 0 && this.state.lossCheckBox ?  
             <div className = "col-6">
                <Line data = {this.state.loss_result} options = {options_loss}/> 
               </div> : ""}
            
               {this.state.data.length > 0 && this.state.learningRateCheckBox?  
             <div className = "col-6">
                <Line data = {this.state.learning_result} options = {options_learningRate}/> 
               </div> : ""}
        

            </div>
        </>

        : renderContent = ""
    return(renderContent)
  }
}

export default ModelGraphsDisplay;
