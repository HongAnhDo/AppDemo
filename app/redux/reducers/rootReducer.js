import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import homeReducer from './homeReducer';

const rootReducer = combineReducers({
  loginReducer: loginReducer,
  homeReducer: homeReducer
});
export default rootReducer;