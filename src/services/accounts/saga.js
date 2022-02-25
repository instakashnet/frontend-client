import { put, all, fork, call, select, takeLatest, takeEvery } from "redux-saga/effects";
import Swal from "sweetalert2";
import * as types from "./types";
import * as actions from "./actions";
import { closeModal, setAlertInit } from "../../store/actions";
import history from "../../shared/history";

// API SERVICES
import { exchangeService, accountsService } from "../../api/axios";
import { getBanks, getCurrencies, getAccounts } from "../../api/services/accounts.service";

// UTILS
function* setAccountDetails({ accId }) {
  const accountDetails = yield select((state) => state.Accounts.accounts.find((account) => account.id === accId));
  yield put(actions.setAccountDetailsSuccess(accountDetails));
}

// SAGAS
function* getAccountsSaga({ accType }) {
  try {
    const accounts = yield call(getAccounts, accType);
    if (accType === "kash") return yield put(actions.getKashAccountSuccess(accounts.accounts));

    const [banks, currencies] = yield all([call(getBanks), call(getCurrencies)]);

    yield put(actions.getBanks(banks.banks));
    yield put(actions.getCurrencies(currencies.currencies));
    yield put(actions.getAccountsSuccess(accounts.accounts));
  } catch (error) {
    yield put(actions.accountsError());
  }
}

function* addAccount({ values, addType }) {
  try {
    const res = yield accountsService.post("/accounts", values);
    if (res.status === 201) {
      const accounts = yield call(getAccounts, addType);
      yield put(actions.getAccountsSuccess(accounts.accounts));

      yield put(actions.addAccountSuccess());
      yield put(setAlertInit("Cuenta agregada correctamente.", "success"));
      yield put(closeModal());
    }
  } catch (error) {
    yield put(actions.accountsError());
  }
}

function* editAccount({ id, values, setEdit }) {
  try {
    const res = yield accountsService.put(`/accounts/${id}`, values);
    if (res.status === 200) {
      const accounts = yield call(getAccounts, "users");
      yield put(actions.getAccountsSuccess(accounts.accounts));

      yield put(actions.editAccountSuccess());
      yield call(setAccountDetails, { accId: id });
      yield put(setAlertInit("Cuenta editada correctamente.", "success"));
      yield call(setEdit, false);
    }
  } catch (error) {
    yield put(actions.accountsError());
  }
}

function* withdrawKash({ values }) {
  try {
    const res = yield exchangeService.post("/withdrawals/user", values);
    if (res.status === 201) {
      yield call([Swal, "fire"], "Recibido", "La solicitud de retiro ha sido recibida. Puedes ver tu solicitud en la pantalla de actividades.", "success");
      yield put(actions.withdrawKashSuccess());
      yield put(closeModal());
      yield call([history, "push"], "/dashboard/recent");
    }
  } catch (error) {
    yield put(actions.accountsError());
  }
}

function* deleteAccount({ account }) {
  try {
    const result = yield call([Swal, "fire"], {
      icon: "warning",
      title: "Eliminar la cuenta",
      text: `¿Seguro deseas eliminar la cuenta con alias ${account.alias}?`,
      showCancelButton: true,
      confirmButtonText: "Si, eliminar",
      confirmButtonColor: "#ffeb4d",
      cancelButtonText: "Cancelar",
      cancelButtonColor: "#ff4b55",
    });

    if (result.isConfirmed) {
      yield accountsService.delete(`/accounts/${account.id}`);
      const accounts = yield call(getAccounts, "users");
      yield put(actions.getAccountsSuccess(accounts.accounts));

      yield put(actions.deleteAccountSuccess());
      yield put(setAlertInit("Cuenta eliminada correctamente.", "success"));
      yield put(closeModal());
    } else yield put(actions.accountsError());
  } catch (error) {
    yield put(actions.accountsError());
  }
}

export function* watchGetAccounts() {
  yield takeEvery(types.GET_ACCOUNTS.LOADING, getAccountsSaga);
}

export function* watchSetAccountDetails() {
  yield takeLatest(types.SET_ACCOUNT_DETAILS_INIT, setAccountDetails);
}

export function* wachAddAccount() {
  yield takeEvery(types.ADD_ACCOUNT_INIT, addAccount);
}

export function* wachEditAccount() {
  yield takeEvery(types.EDIT_ACCOUNT_INIT, editAccount);
}

export function* watchWithdrawKash() {
  yield takeLatest(types.WITHDRAW_KASH_INIT, withdrawKash);
}

export function* watchDeleteAccount() {
  yield takeEvery(types.DELETE_ACCOUNT_INIT, deleteAccount);
}

export default function* accountsSaga() {
  yield all([fork(watchGetAccounts), fork(wachAddAccount), fork(watchSetAccountDetails), fork(wachEditAccount), fork(watchDeleteAccount), fork(watchWithdrawKash)]);
}
