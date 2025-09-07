import React from 'react';
import Navbar from './assets/Navbar.jsx';
import Dashboard from './assets/Dashboard.jsx';
import Customer from './assets/CustomerTable.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
//import CustomerManager from "./CustomerManager";
 
function App() {
  return (
<Router>
<div className="App">
<Navbar />
<Routes>
<Route path="/" element={<Dashboard />} /> {/* Default route */
}
<Route path="/customers" element={<Customer/>} /> {/* Customer route */
}
</Routes>
</div>
</Router>
  );
}
 
export default App;





/*

import React from 'react';
import Navbar from './assets/Navbar.jsx'; // Updated path for clarity
import Dashboard from './assets/Dashboard.jsx'; // Updated path for clarity
import Customer from './assets/Customer'; // Updated path for Customer Component
//import Orders from './assets/Orders'; // New Orders Component
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} /> {/* Home/Dashboard */
        /*}
          <Route path="/customers" element={<Customer />} /> {/* Customer Management */
        /*}
          <Route path="/orders" element={<Orders />} /> {/* Orders Management */
        /*}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
*/