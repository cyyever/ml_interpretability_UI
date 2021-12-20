import React, { Component } from 'react'
import InputModal from './InputModal';
import { getDatasetName } from '../assets/api-client.js'
//dataset example data
/*
const datasets = [
    {
        id: 1,
        name: 'dataset 1',
        label:'dataset 1 label',
        uploadDate: '1/12/2021'
    },
    {
        id: 2,
        name: 'dataset 2',
        label:'dataset 2 label',
        uploadDate: '2/12/2021'
    },
    {
        id: 3,
        name: 'dataset 3',
        label:'dataset 3 label',
        uploadDate: '3/12/2021'
    },
]
*/


class InputForm extends Component {

    constructor(){
        super();
        this.state={
            datasets : [],
            selectedDataset: "",
        }
    }

  /*  
 handleInput = (e) => {
     this.setState({[e.target.name]: e.target.value} , () =>{
         alert(this.state.selectedDataset)
     })
 
 }
 */

    componentDidMount(){
        getDatasetName()
        .then((data) => {
            this.setState({datasets : data.datasetName , selectedDataset: data.datasetName[0]})
            })
    }

    handleDatasetInput = event =>{
        var data = this.state.datasets.find(dataset => dataset.id === parseInt(event.target.value))
        this.setState({selectedDataset : data});

    }
    render() {

        return (
            <div className='px-2'>
               <form>
                    <div className="form-group row">

                        <div>
                       <label className = "col-form-label pe-2">Dataset : </label>
                        <select className = "form-select-sm px-3" value = {this.state.selectedDataset} onChange = {this.handleDatasetInput}>
                        {this.state.datasets.map(dataset =>(<option key = {dataset} value = {dataset}>{dataset}</option>))} 
                        </select>
                      
                        <InputModal/>
                        </div>
                        <div>
                        <label className = "col-form-label pe-2" >Label : </label>
                        <span>{/*this.state.selectedDataset.label*/}</span>
                        </div>

                        <div>
                        <label className = "col-form-label pe-2"> Upload Date : </label>
                        <span>{/*this.state.selectedDataset.uploadDate*/}</span>
                        </div>
                    </div>

    
                </form> 
               
            </div>
        )
    }
}

export default InputForm
