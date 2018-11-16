import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import './App.css';

import Header from './components/Header';
import BookView from './components/BookView';
import Feed from './components/Feed';
import AddBook from './components/AddBook';


class App extends Component {
  render() {
      return ( 
          <div className="app">
             <Header />
              <Switch>          
                  <Route exact path="/" component={Feed} />
                  <Route path="/bookview/:id" component={BookView} />
                  <Route path="/addbook" component={AddBook} />
                  <Route path="**" component={Feed} />
              </Switch>
          </div>
      );
  }
}

export default App;
