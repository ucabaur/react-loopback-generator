import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { findKey } from 'lodash';
import { push } from 'react-router-redux';

import EditView from '../../../../components/crud-view/edit-view';
import model from '../../../../../../server/models/<%= modelName %>.json';
import modelActions from '../../../../actions/models/<%= modelName %>';

const modelKeyId = findKey(
  model.properties,
  property => property.id !== undefined,
);

const mapStateToProps = state => ({
  authentication: state.authentication,
  modelKeyId,
  model,
});

const mapDispatchToProps = dispatch => ({
  navigateToList: () => {
    dispatch(push('<%= apiUrl %>/list'));
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
