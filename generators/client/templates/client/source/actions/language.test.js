import expect from 'expect';
import action from './language';
import cst from '../constants/language';

describe('Actions language', () => {
  it('lang should create LANGUAGE_SELECT action', () => {
    const lang = 'en';
    expect(action(lang)).toEqual({
      type: cst.SELECT,
      lang,
    });
  });
});
