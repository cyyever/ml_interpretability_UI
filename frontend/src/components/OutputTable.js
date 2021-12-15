import React, { Component } from 'react'
import images from '../assets'
import BootstrapTable from 'react-bootstrap-table-next'
const data = [
    {
        id:1,
        datasetId : 1,
        label:0,
        predicted:0,
        images:images.dataset.image0.default
    },
    {
        id:2,
        datasetId : 1,
        label:1,
        predicted:1,
        images:images.dataset.image1.default
    },
    {
        id:3,
        datasetId : 1,
        label:2,
        predicted:2,
        images:images.dataset.image2.default
    },
    {
        id:4,
        datasetId : 1,
        label:3,
        predicted:3,
        images:images.dataset.image3.default
    },
    {
        id:5,
        datasetId : 1,
        label:4,
        predicted:4,
        images:images.dataset.image4.default
    },
    {
        id:6,
        datasetId : 1,
        label:5,
        predicted:5,
        images:images.dataset.image5.default
    },
    {
        id:7,
        datasetId : 1,
        label:6,
        predicted:6,
        images:images.dataset.image6.default
    },
    {
        id:8,
        datasetId : 1,
        label:7,
        predicted:7,
        images:images.dataset.image7.default
    },
    {
        id:9,
        datasetId : 1,
        label:8,
        predicted:8,
        images:images.dataset.image8.default
    },
    {
        id:10,
        datasetId : 1,
        label:9,
        predicted:9,
        images:images.dataset.image9.default
    },
 ]





 class OutputTable extends Component {

    constructor(){
        super();
        this.state={
            selectedLabel: ""
        }     
    }

    columns = [
        {
            dataField:'id',
            text:'Image Id',
            sort:true
        },
        {
            dataField:'label',
            text:'Image Label',
            sort:true
        },
        {
            dataField: 'predicted',
            text:'Predicted Image Label',
            sort:true
        }
    ]
    
    rowEvents = {
        onClick : (e , row , rowIndex) => {
            this.setState({selectedLabel : row} , () => {
                console.log(this.state.selectedLabel)
            })
        }
    };


    render() {
        return (
            <div className='row'>
                <div className = 'col-10'>
                <BootstrapTable className='test' hover condensed={true} keyField='id' data={data} columns={this.columns}  rowEvents = {this.rowEvents }/>
                </div>
                <div className = 'col-2' align="center" >
                <img src = {this.state.selectedLabel.images}/>
                </div>
            </div>
        )
    }
}

export default OutputTable