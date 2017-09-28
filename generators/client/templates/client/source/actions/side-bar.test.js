import expect from 'expect';
import cst from '../constants/side-bar';
import * as actions from './side-bar';

describe('Actions side-bar', () => {
  it('open should create SIDEBAR_OPEN action', () => {
    expect(actions.open()).toEqual({
      type: cst.OPEN,
    });
  });
  it('close should create SIDEBAR_CLOSE action', () => {
    expect(actions.close()).toEqual({
      type: cst.CLOSE,
    });
  });
  it('toggle should create SIDEBAR_TOGGLE action', () => {
    expect(actions.toggle()).toEqual({
      type: cst.TOGGLE,
    });
  });
});
