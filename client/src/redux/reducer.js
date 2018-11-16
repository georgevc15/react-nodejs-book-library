import { combineReducers } from 'redux';
import books from './reducers/books';
import common from './reducers/common';
import { routerReducer } from 'react-router-redux';
export default combineReducers({
  books,
  common,
  router: routerReducer
});