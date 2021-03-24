import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';
import TodoList from './components/Todo/TodoList';

function App() {
  return (
    <Router>
       <Header/>
       <Switch>
         <Route path="/" component={TodoList}/>
       </Switch>

       <Footer/>
    </Router>
  );
}

export default App;
