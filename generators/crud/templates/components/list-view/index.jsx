import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';

import { map } from 'lodash';

import ReactTable from 'react-table';
import 'react-table/react-table.css';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import TableManager from '../table-manager';
import TableActionCell from '../table-action-cell';
import styles from './styles.css';
import { canWrite } from '../../../services/access-control.js';

export default class ListView extends Component {
  constructor(props, context) {
    super(props, context);

    const properties = Object.keys(this.props.model.properties);
    const modelColumns = map(properties, property => ({
      Header: property,
      accessor: property,
    }));
    let customColumns = [
      {
        Header: props.intl.formatMessage({ id: 'list.header.actions' }),
        accessor: props.modelKeyId,
        Cell: row => (
          <TableActionCell
            row={row}
            navigateTo={props.navigateTo}
            deleteElement={this.setElementToDelete}
            modelBasePath={props.routeName}
          />
        ),
      },
    ];

    this.hasEditRights = canWrite(props.userPerimeters, props.routeName);

    if (!this.hasEditRights) {
      customColumns = [];
    }

    this.tableColumns = [...modelColumns, ...customColumns];

    this.state = {
      deletePopinIsOpen: false,
      elementIdToDelete: null,
    };
  }

  componentWillMount() {
    this.props.getList();
  }

  setElementToDelete = id => {
    this.setState({
      elementIdToDelete: id,
      deletePopinIsOpen: true,
    });
  };

  export = () => {
    this.props.export(this.props.authentication);
  };

  import = uploadEvent => {
    const file = uploadEvent.target.files[0];
    this.props.import(file);
  };

  render() {
    const formatMessage = this.props.intl.formatMessage;
    const actions = [
      <FlatButton
        label={formatMessage({ id: 'common.action.confirm' })}
        style={{ color: 'red' }}
        onClick={() => {
          this.props.deleteItem(
            this.state.elementIdToDelete,
            this.props.modelKeyId,
          );
          this.setState({ deletePopinIsOpen: false, elementIdToDelete: null });
        }}
      />,
      <FlatButton
        label={formatMessage({ id: 'common.action.cancel' })}
        onClick={() => {
          this.setState({ deletePopinIsOpen: false, elementIdToDelete: null });
        }}
      />,
    ];

    return (
      <div className={styles.container}>
        <TableManager
          navigateTo={this.props.navigateTo}
          export={this.export}
          onImportChange={this.import}
          modelBasePath={this.props.routeName}
          hasEditRights={this.hasEditRights}
          modelBaseName={props.modelName}
        />
        <ReactTable
          className={`${styles.table} -highlight -striped`}
          data={this.props.data}
          columns={this.tableColumns}
          filterable
          loading={this.props.loading}
          defaultPageSize={15}
          pageSizeOptions={[5, 15, 25, 50, 100]}
          previousText={formatMessage({ id: 'list.previous' })}
          nextText={formatMessage({ id: 'list.next' })}
          loadingText={formatMessage({ id: 'list.loading' })}
          noDataText={formatMessage({ id: 'list.no_data' })}
          pageText={formatMessage({ id: 'list.page' })}
          ofText={formatMessage({ id: 'list.of' })}
          rowsText={formatMessage({ id: 'list.rows' })}
          getTrProps={() => ({ style: { height: '35px' } })}
        />
        <Dialog
          title={formatMessage({ id: 'list.delete_popin.title' })}
          actions={actions}
          modal={true}
          open={this.state.deletePopinIsOpen}
        >
          {formatMessage({ id: 'list.delete_popin.warning_text' })}
        </Dialog>
      </div>
    );
  }
}

ListView.propTypes = {
  data: PropTypes.array, // eslint-disable-line
  authentication: PropTypes.object, // eslint-disable-line
  intl: intlShape.isRequired,
  loading: PropTypes.bool.isRequired,
  navigateTo: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  export: PropTypes.func.isRequired,
  import: PropTypes.func.isRequired,
  getList: PropTypes.func.isRequired,
  model: PropTypes.object, // eslint-disable-line
  modelKeyId: PropTypes.string,
  routeName: PropTypes.string.isRequired,
  modelName: PropTypes.string.isRequired,
  userPerimeters: PropTypes.arrayOf(PropTypes.string),
};
