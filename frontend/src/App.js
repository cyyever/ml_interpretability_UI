import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';


import {Container , Row} from 'react-bootstrap'
import InputPanel from './components/InputPanel';
import OutputPanel from './components/OutputPanel';
import React, { useState } from 'react';

function App() {

  const[datasetId , setDataId] = useState(0);

  function updateDatasetId(datasetId){
    setDataId(datasetId);
  }

  return (
    <div className="App">
      <Container fluid className = "h-100">
        <Row className="h-100">
          <InputPanel updateDatasetId = {updateDatasetId}/>
          <OutputPanel/>
        </Row>
      </Container>

      
    </div>
  );
}

export default App;
