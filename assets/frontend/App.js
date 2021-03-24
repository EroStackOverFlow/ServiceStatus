import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';
import ServiceList from './components/Service/ServiceList';

function App() {
    return (
        <Router>
            <Header/>
            <ServiceList/>
            <Footer/>
        </Router>
    );
}

export default App;
