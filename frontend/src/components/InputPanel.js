import React, { Component } from 'react'
import './components.css'
import { Col } from 'react-bootstrap'
import InputForm from './InputForm'
class InputPanel extends Component{
    constructor(props){
        super(props)

    }

    render(){
        return(
            <Col className="with-border ms-1 my-1">
            <h5 className='panel-header'>Input Panel</h5>
            <InputForm/>
            </Col>
        )
    }
}
  


export default InputPanel



