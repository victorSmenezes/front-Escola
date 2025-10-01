import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import history from '../../../services/history';
import * as types from '../types';
import api from '../../../services/axios';
import * as actions from './actions';

function* loginRequest(payload) {
  try {
    const response = yield call(api.post, '/tokens', payload);

    yield put(actions.loginSuccess({ ...response.data }));

    toast.success('Login realizado com sucesso');

    api.defaults.headers.Authorization = `Bearer ${response.data.token}`;

    history.push(payload.prevPath);
  } catch (e) {
    toast.error('Usuário ou senha inválidos');

    yield put(actions.loginFailure());
  }
}

function persistRehydrate({ payload }) {
  const { token } = get(payload, 'auth.token', '');

  if (!token) return;

  api.defaults.headers.Authorization = `Bearer ${token}`;
}

export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
]);
