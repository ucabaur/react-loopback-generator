import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { findKey } from 'lodash';
import { push } from 'react-router-redux';

import { getUserPerimeters } from '../../../../selectors/user-perimeters.js';
import ListView from '../../../../components/crud-view/list-view';
import modelActions from '../../../../actions/models/<%= modelName %>';
import model from '../../../../../../server/models/<%= modelName %>.json';

const modelKeyId = findKey(
  model.properties,
  property => property.id !== undefined,
);

const mapStateToProps = state => ({
  authentication: state.authentication,
  data: state.models['<%= modelName %>'].list,
  loading: state.models['<%= modelName %>'].loading,
  userPerimeters: getUserPerimeters(state),
  routeName: '<%= modelName %>',
  model,
  modelKeyId,
});

const mapDispatchToProps = dispatch => ({
  getList: () => {
    dispatch(modelActions.find());
  },
  deleteItem: (id, modelKeyIdentifier) => {
    dispatch(modelActions.delete(id, modelKeyIdentifier));
  },
  export: authentication => {
    dispatch(modelActions.export(authentication));
  },
  import: file => {
    dispatch(modelActions.import(file));
  },
  navigateTo: path => {
    dispatch(push(path));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(
  injectIntl(ListView),
);
