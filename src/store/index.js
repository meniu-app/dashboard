import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers";
import initialState from '../reducers/initialState';
import thunk from 'redux-thunk';

export default function configureStore(state = initialState) {
  return createStore(rootReducer, state, applyMiddleware(thunk));
}
 