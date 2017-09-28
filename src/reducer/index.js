import { combineReducers } from 'redux';

import { test as project} from './project';

import { test as api}  from './api';

const app = combineReducers({
  project,
  api,
});

export default app;