import React, { Component } from 'react'
import { Col } from 'react-bootstrap'
import './components.css'
import OutputTable from './OutputTable'


class OutputPanel extends Component {
    render() {
        return (
            <Col xs = {10} className="with-border mx-1 my-1"> 
            <h5  className='panel-header'>Output Panel</h5>
            <OutputTable/>
            </Col>
        )
    }
}

export default OutputPanel
