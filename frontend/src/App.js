import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import NavBar from './components/NavBar/NavBar';
import OutputPanel from './components/ViewDataset/OutputPanel'
import InputPanel from './components/InputPanel';
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import {Navbar} from 'react-bootstrap'
function App() {


  return (
    <div className="App">
    <Navbar bg="light" fixed="top">
       <div className = "container-fluid">
    <Navbar.Brand>Federated Learning Demo</Navbar.Brand>
    </div>
  </Navbar>

      <div className = "container-fluid nav-offset main-content">
      <div className = 'row h-100'>
        <Router>
        <NavBar/>
        <Routes>
          <Route path='/' exact element= {<OutputPanel/>}/>
          <Route path='/test' element = {<InputPanel/>}/>
        </Routes>
      </Router> 
      </div>
      </div>
    </div>
  );
}

export default App;
