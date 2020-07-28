
import rootReducer from '../redux/reducers/rootReducer';

import { createStore } from 'redux';


const store = createStore(rootReducer);

export default store;