import { combineReducers } from "redux";

// MODULES
import Accounts from "../services/accounts/reducer";
import Activity from "../services/activity/reducer";
import { affiliatesReducer as Affiliates } from "../services/affiliates/reducer";
// MODULE
import Auth from "../services/auth/reducer";
// CORE REDUCERS
import Alert from "../services/core/alert/reducer";
import Data from "../services/core/data/reducer";
import Nav from "../services/core/menu/reducer";
import Modal from "../services/core/modal/reducer";
// MODULES
import Exchange from "../services/exchange/reducer";
import Profile from "../services/profile/reducer";

const rootReducer = combineReducers({
  // GLOBAL
  Alert,
  Nav,
  Modal,
  Data,
  // MODULES
  Auth,
  Profile,
  Activity,
  Accounts,
  Exchange,
  Affiliates,
});

export default rootReducer;
