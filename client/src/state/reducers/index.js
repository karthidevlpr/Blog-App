import {combineReducers} from 'redux';

import loginReducer from './login';
import blogReducer from './blog';

const reducers = combineReducers({
  auth: loginReducer,
  blog: blogReducer
})

export default reducers
