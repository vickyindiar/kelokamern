import thunk from 'redux-thunk';
import { compose, applyMiddleware, createStore, combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import dataReducer from './reducers/dataReducer';
import salesReducer from './reducers/salesReducer';
import tableReducer from './reducers/tableReducer';

const reducers = combineReducers({
    auth: authReducer, 
    data: dataReducer,
    sales: salesReducer,
    table: tableReducer
}); //todo
const store = createStore(reducers, compose(applyMiddleware(thunk)));
export default store;


