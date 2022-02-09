import { combineReducers } from "redux";

// CORE REDUCERS
import Alert from "../services/core/alert/reducer";
import Nav from "../services/core/menu/reducer";
import Modal from "../services/core/modal/reducer";
import Data from "../services/core/data/reducer";

// MODULES
import Auth from "../services/auth/reducer";
import Profile from "../services/profile/reducer";
import Activity from "../services/activity/reducer";
import Accounts from "../services/accounts/reducer";
import Exchange from "../services/exchange/reducer";
import { affiliatesReducer as Affiliates } from "../services/affiliates/reducer";

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
