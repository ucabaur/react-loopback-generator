import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { findKey } from 'lodash';
import { push } from 'react-router-redux';

import EditView from '../../../../components/crud-view/edit-view';
import model from '../../../../../../server/models/<%= modelName %>.json';
import modelActions from '../../../../actions/models/<%= modelName %>';

import { canWrite } from '../../../../services/access-control.js';
import { getUserPerimeters } from '../../../../selectors/user-perimeters.js';

const routeName = '<%= modelName %>';

const modelKeyId = findKey(
  model.properties,
  property => property.id !== undefined,
);

const mapStateToProps = state => {
  const userPerimeters = getUserPerimeters(state);
  const userHasEditRights = canWrite(userPerimeters, routeName);
  return {
    authentication: state.authentication,
    modelKeyId,
    model,
    userHasEditRights,
  };
};

const mapDispatchToProps = dispatch => ({
  navigateToList: () => {
    dispatch(push('/<%= modelName %>/list'));
  },
  editEntry: (formValues, id) => {
    dispatch(modelActions.edit(formValues, id));
  },
  findEntry: id => {
    dispatch(modelActions.findOne(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(
  injectIntl(EditView),
);
