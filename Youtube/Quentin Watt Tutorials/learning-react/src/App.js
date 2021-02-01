import React from 'react';
// npm install react-router-dom
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from 'react-router-dom';
// https://tailwindcss.com/docs/installation/
import './tailwind.css';
import Header from './Components/Header.js';
import Footer from './Components/Footer.js';
import Home from './Components/Views/Home.js';
import About from './Components/Views/About.js';
import Product from './Components/Views/Product.js';
import Extra from './Components/Views/Extra.js';

function App() {
  return (
    <div className="relative pb-10 min-h-screen">
      <Router>

        <Header/>


        <div className='p-3'>
	      	<Switch>
	      	  <Route exact path="/">
	      		  <Home />
	      	  </Route>
	      	  <Route path="/About">
	      		  <About />
	      	  </Route>
	      	  <Route path="/Product">
	      		  <Product />
	      	  </Route>
	      	  <Route path="/Extra">
	      		  <Extra />
	      	  </Route>
	        </Switch>
        </div>

        <Footer/>
      </Router>

      

    </div>
  );
}

export default App;