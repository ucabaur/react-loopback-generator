import expect from 'expect';
import * as action from './authentication';
import cst from '../constants/authentication';

describe('Actions authentication', () => {
  it('login should create AUTHENTICATION_LOGIN action', () => {
    expect(action.login('token')).toEqual({
      type: cst.LOGIN,
      payload: 'token',
    });
  });

  it('logout should create AUTHENTICATION_LOGOUT', () => {
    expect(action.logout()).toEqual({
      type: cst.LOGOUT,
    });
  });
});
