import React, { Component } from 'react'
import { Col } from 'react-bootstrap'
import './../components.css'
import DatasetForm  from './DatasetForm'

class DataGalleryPanel extends Component {
    render() {
        return (
            <Col className="offset-from-sideBar"> 
            <DatasetForm/>
            </Col>
        )
    }
}

export default DataGalleryPanel
