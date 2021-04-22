import { combineReducers } from 'redux';

// CORE REDUCERS
import Alert from '../core/store/alert/reducer';
import Nav from '../core/store/menu/reducer';
import Modal from '../core/store/modal/reducer';
import Data from '../core/store/data/reducer';

// MODULES
import Auth from '../auth/store/reducer';
import Profile from '../profile/store/reducer';
import Dashboard from '../dashboard/store/reducer';
import Accounts from '../accounts/store/reducer';
import Exchange from '../exchange/store/reducer';

const rootReducer = combineReducers({
  // GLOBAL
  Alert,
  Nav,
  Modal,
  Data,
  // MODULES
  Auth,
  Profile,
  Dashboard,
  Accounts,
  Exchange,
});

export default rootReducer;
