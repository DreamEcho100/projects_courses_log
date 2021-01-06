import React from "react";
import "../App.css";
import Main from "./Main";

import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { searchRobots, requestRobots } from './reducers';

const logger = createLogger();
const rootReducer = combineReducers({searchRobots, requestRobots });
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, logger));

const App = () => (
	<Provider store={ store }>
		<Main />
	</Provider>
);

export default App;