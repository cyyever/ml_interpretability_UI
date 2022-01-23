import React, { Component } from 'react'
import './../components.css'
import { Col } from 'react-bootstrap'
import RunModelForm from './RunModelForm'
class RunModelPanel extends Component{

    render(){
        return(
            <Col className="offset-from-sideBar"> 
            <RunModelForm/>
            </Col>
        )
    }
}
  


export default RunModelPanel



