import React, { Component } from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator';
import {getDataset} from '../assets/api-client.js'

 const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">
      Showing { from } to { to } of { size } Results
    </span>
  );

const options = {
  paginationSize: 10,
  pageStartIndex: 0,
  firstPageText: 'First',
  prePageText: 'Back',
  nextPageText: 'Next',
  lastPageText: 'Last',
  nextPageTitle: 'First page',
  prePageTitle: 'Pre page',
  firstPageTitle: 'Next page',
  lastPageTitle: 'Last page',
  showTotal: true,
  paginationTotalRenderer: customTotal,
  disablePageTitle: true,
  sizePerPageList: [15]
};


const selectRow = {
    mode: 'radio',
    hideSelectColumn: true,
    clickToSelect: true,
    bgColor : '#00BFFF',

};
 class OutputTable extends Component {

    constructor(){
        super();
        this.state={
            data : [],
            selectedLabel: "",
        }     
    }

    componentDidMount(){
        getDataset("CIFAR10")
        .then((data_) =>{
            this.setState({data : data_})
        })
    }
    columns = [
        {
            dataField:'label',
            text:'Image Label',
            sort:true
        },
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
            <div className='row ps-2'>
                <div className = 'col-9'>
                <BootstrapTable hover condensed={true} keyField='id' data={this.state.data} columns={this.columns}  rowEvents = {this.rowEvents } 
                pagination={ paginationFactory(options) } selectRow = {selectRow}/>
                </div>
                <div className = 'col-3 center'>
                <img src = {this.state.selectedLabel ? "data:image/png;base64,"+this.state.selectedLabel.img : ""} alt = {this.state.selectedLabel.label} width="200" height = "200"/>
                </div>
            </div>
        )
    }
}

export default OutputTable