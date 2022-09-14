import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.min.css';

import React from 'react';
import NavBar from './components/NavBar/NavBar';
import DataGalleryPanel from './components/ViewDataset/DataGalleryPanel'
import RunModalPanel from './components/RunModel/RunModelPanel';
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import {Navbar} from 'react-bootstrap'
function App() {


  return (
    <div className="App">
    <Navbar bg="light" fixed="top">
       <div className = "container-fluid">
    <Navbar.Brand>Deep Learning Demo</Navbar.Brand>
    </div>
  </Navbar>
    
  <ToastContainer
      position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          >

          </ToastContainer>
      <div className = "container-fluid nav-offset main-content">
      <div className = 'row h-100'>
        <Router>
        <NavBar/>
        <Routes>
          <Route path='/' exact element= {<DataGalleryPanel/>}/>
          <Route path='/run_model' element = {<RunModalPanel/>}/>
        </Routes>
      </Router> 
      </div>
      </div>
    </div>
  );
}

export default App;
