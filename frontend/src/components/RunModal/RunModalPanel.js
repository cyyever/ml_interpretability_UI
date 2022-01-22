import React, { Component } from 'react'
import './../components.css'
import { Col } from 'react-bootstrap'
import RunModalForm from './RunModalForm'
class RunModalPanel extends Component{

    render(){
        return(
            <Col className="offset-from-sideBar"> 
            <RunModalForm/>
            </Col>
        )
    }
}
  


export default RunModalPanel



