import { put, all, fork, call, select, takeLatest, takeEvery } from 'redux-saga/effects';
import * as types from './types';
import * as actions from './actions';
import { closeModal, setAlertInit } from '../../store/actions';
import axios from '../helpers/axios';
import exchangeAxios from '../../exchange/helpers/axios';
import Swal from 'sweetalert2';

function* getAccounts({ accType }) {
  try {
    const res = yield axios.get(`/accounts?type=${accType}`);
    if (res.status === 200) {
      if (accType === 'kash') return yield put(actions.getKashAccountSuccess(res.data.accounts));

      return yield put(actions.getAccountsSuccess(res.data.accounts));
    }
  } catch (error) {
    yield put(setAlertInit(error.message, 'error'));
    yield put(actions.accountsError());
  }
}

function* getKashAccount() {
  try {
    const res = yield axios.get('/accounts?type=kash');
    if (res.status === 200) yield put(actions.getKashAccountSuccess(res.data.accounts));
  } catch (error) {
    yield put(setAlertInit(error.message, 'error'));
    yield put(actions.accountsError());
  }
}

function* setAccountDetails({ accId }) {
  const accountDetails = yield select((state) => state.Accounts.accounts.find((account) => account.id === accId));
  yield put(actions.setAccountDetailsSuccess(accountDetails));
}

function* addAccount({ values, accType }) {
  const accountValues = {
    ...values,
    accountId: +values.accountId,
  };

  try {
    const res = yield axios.post('/accounts', accountValues);
    if (res.status === 201) {
      yield put(actions.addAccountSuccess());
      yield call(getAccounts, { accType });
      yield put(setAlertInit('Cuenta agregada correctamente.', 'success'));
      yield put(closeModal());
    }
  } catch (error) {
    yield put(setAlertInit(error.message, 'error'));
    yield put(actions.accountsError());
  }
}

function* editAccount({ id, values, setEdit }) {
  try {
    const res = yield axios.put(`/accounts/${id}`, values);
    if (res.status === 200) {
      yield put(actions.editAccountSuccess());
      yield call(getAccounts);
      yield call(setAccountDetails, { accId: id });
      yield put(setAlertInit('Cuenta agregada correctamente.', 'success'));
      yield call(setEdit, false);
    }
  } catch (error) {
    yield put(setAlertInit(error.message, 'error'));
    yield put(actions.accountsError());
  }
}

function* withdrawKash({ values }) {
  try {
    const res = yield exchangeAxios.post('/withdrawals/user', values);
    if (res.status === 201) {
      yield call([Swal, 'fire'], 'Recibido', 'La solicitud de retiro ha sido recibida. Puedes ver tu solicitud en la pantalla de actividades.', 'success');
      yield put(actions.withdrawKashSuccess());
      yield call(getKashAccount);
      yield put(closeModal());
    }
  } catch (error) {
    yield put(setAlertInit(error.message, 'error'));
    yield put(actions.accountsError());
  }
}

function* deleteAccount({ account }) {
  try {
    const result = yield call([Swal, 'fire'], {
      icon: 'warning',
      title: 'Eliminar la cuenta',
      text: `¿Seguro deseas eliminar la cuenta con alias ${account.alias}?`,
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      confirmButtonColor: '#ffeb4d',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#ff4b55',
    });

    if (result.isConfirmed) {
      yield axios.delete(`/accounts/${account.id}`);
      yield call(getAccounts);
      yield put(setAlertInit('Cuenta eliminada correctamente.', 'success'));
      yield put(actions.deleteAccountSuccess());
      yield put(closeModal());
    } else yield put(actions.accountsError());
  } catch (error) {
    yield put(setAlertInit(error.message, 'error'));
    yield put(actions.accountsError());
  }
}

export function* watchGetAccounts() {
  yield takeEvery(types.GET_ACCOUNTS_INIT, getAccounts);
}

export function* watchGetKashAccount() {
  yield takeEvery(types.GET_KASH_ACCOUNT_INIT, getKashAccount);
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
  yield all([
    fork(watchGetAccounts),
    fork(wachAddAccount),
    fork(watchSetAccountDetails),
    fork(wachEditAccount),
    fork(watchDeleteAccount),
    fork(watchGetKashAccount),
    fork(watchWithdrawKash),
  ]);
}
