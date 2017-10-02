import sinon from 'sinon';
import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import modelActions from './<%= actionFileName %>';
import * as networking from '../networking';
import cst from '../../constants/models/<%= constantFileName %>.json';
import notificationCst from '../../constants/notification.json';

chai.use(sinonChai);
let sandbox = null;
const fakeUrl = 'http://www.google.com';

describe('[ACTION MODEL] <%= actionFileName %>.js', () => {
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    sandbox.stub(networking, 'request').returns(fakeUrl);
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('find should find entities from loopback API', done => {
    const params = {};
    const data = [{ id: 1 }];
    const dispatch = sinon.stub().returns(Promise.resolve({ data }));
    const modelActionsConst = modelActions.find(params)(dispatch);
    modelActionsConst.then(() => {
      done();
    });
    expect(dispatch.callCount).to.equal(2);
    expect(dispatch).to.have.been.calledWithExactly(modelActions.findRequest());
    expect(dispatch).to.have.been.calledWithExactly(fakeUrl);
  });

  it('findRequest should return an action', () => {
    expect(modelActions.findRequest()).to.deep.equal({
      type: cst.FIND_REQUEST,
    });
  });

  it('findSuccess should return an action', () => {
    const data = [];
    expect(modelActions.findSuccess(data)).to.deep.equal({
      type: cst.FIND_SUCCESS,
      payload: data,
    });
  });

  it('findError should return an action', () => {
    const error = 'error';
    expect(modelActions.findError(error)).to.deep.equal({
      type: cst.FIND_ERROR,
      payload: error,
    });
  });

  it('deleteSuccess should return an action', () => {
    const idToDelete = 1;
    const modelKeyId = 'IDENTIFIER';
    expect(modelActions.deleteSuccess(idToDelete, modelKeyId)).to.deep.equal({
      type: cst.DELETE_ELEMENT,
      payload: { id: idToDelete, modelKeyId },
    });
  });

  it('notifySuccess should return an action', () => {
    const message = 'message';
    expect(modelActions.notifySuccess(message)).to.deep.equal({
      type: notificationCst.OPEN,
      payload: { message, notificationType: notificationCst.success },
    });
  });

  it('notifyError should return an action', () => {
    const message = 'message';
    expect(modelActions.notifyError(message)).to.deep.equal({
      type: notificationCst.OPEN,
      payload: { message, notificationType: notificationCst.error },
    });
  });
});
