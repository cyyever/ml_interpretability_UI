import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';


import {Container , Row} from 'react-bootstrap'
import InputPanel from './components/InputPanel';
import OutputPanel from './components/OutputPanel';

function App() {
  return (
    <div className="App">
      <Container fluid className = "h-100">
        <Row className="h-100">
          <InputPanel/>
          <OutputPanel/>
        </Row>
      </Container>

      
    </div>
  );
}

export default App;
