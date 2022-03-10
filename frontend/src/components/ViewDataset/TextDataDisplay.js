import React, { Component } from 'react';
import {Card} from 'react-bootstrap'
class TextDataDisplay extends Component {
    constructor(props){
        super(props);
        this.state = {
            data : "",
        }
    }
    componentDidMount(){
        if(this.props.data !== this.state.data){
            this.setState({data : this.props.data})
        }
    }
    render() {
        return (
            <Card bg="light" className="h-100">
                <Card.Body>
            <div className = "px-2">
                <p>{this.state.data}</p>
            </div>
            </Card.Body>
            </Card>
        );
    }
}

export default TextDataDisplay;