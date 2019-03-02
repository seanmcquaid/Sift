import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Redux set up
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import reducers from "./reducers/rootReducer.js";
import reduxPromise from "redux-promise";

const middleware = applyMiddleware(reduxPromise);
const theStore = middleware(createStore);
const theStoreWithMiddlewareAndReducers = theStore(reducers)


ReactDOM.render(
    <Provider store={theStoreWithMiddlewareAndReducers}>
        <App />
    </Provider>, 
    document.getElementById('root')
);