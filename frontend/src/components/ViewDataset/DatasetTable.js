import React, { Component } from 'react'
import { Card } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator';
import {getDataset} from '../../assets/api-client.js'

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
 class DatasetTable extends Component {
    constructor(props){
        super(props);
        this.state={
            data : [],
            selectedLabel: "",         
        }     
    }


    
    componentDidUpdate(prevProps){
        if (prevProps.data !== this.props.data){
                this.setState({data :  this.props.data , selectedLabel:""})
        }

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
            <Card bg="light">
                <Card.Body>
                <div className = "row"> 
                <div className = "col-9">
                <BootstrapTable hover condensed={true} keyField='id' data={this.state.data} columns={this.columns}  rowEvents = {this.rowEvents } 
                pagination={ paginationFactory(options) } selectRow = {selectRow}/>
                </div>
                <div className = 'col-3 center'>
                <img src = {this.state.selectedLabel ? "data:image/png;base64,"+this.state.selectedLabel.img : ""} alt = {this.state.selectedLabel.label} width="50" height = "50"/>
                </div>
                </div>
                </Card.Body>
            </Card>
        )
    }
}

export default DatasetTable