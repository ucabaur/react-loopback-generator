import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import ReactTable from 'react-table';

import Dialog from 'material-ui/Dialog';

import ListView from './index';
import TableManager from '../table-manager';

describe('[Component] ListView', () => {
  const defaultProps = {
    data: [],
    loading: false,
    userHasEditRights: true,
    getList: () => {},
    import: () => {},
    export: () => {},
    deleteItem: () => {},
    navigateTo: () => {},
    routeName: 'referentiel-ae',
    intl: {
      formatMessage: obj => obj.id,
    },
    model: {
      name: 'modelMock',
      properties: [],
    },
  };

  const setup = propsOverride => {
    const finalProps = Object.assign(defaultProps, propsOverride);
    const shallowWrapper = shallow(<ListView {...finalProps} />);
    return {
      shallowWrapper,
    };
  };

  it('should exist', () => {
    const { shallowWrapper } = setup();
    expect(shallowWrapper.exists()).to.be.true; // eslint-disable-line
  });

  describe('[UI]', () => {
    it('should render a TableManager component to interact with the data', () => {
      const { shallowWrapper } = setup();
      expect(shallowWrapper.find(TableManager).length).to.equal(1);
    });

    it('should render a ReactTable component to display the data', () => {
      const { shallowWrapper } = setup();
      const table = shallowWrapper.find(ReactTable);
      expect(table.length).to.equal(1);
      expect(table.prop('columns').length).to.equal(1);
    });

    it('should render a Dialog component', () => {
      const { shallowWrapper } = setup();
      const dialogInstance = shallowWrapper.find(Dialog);
      expect(dialogInstance.length).to.equal(1);
    });

    it('should render ReactTable with no columns if user cannot edit model', () => {
      const { shallowWrapper } = setup({ userHasEditRights: false });
      const table = shallowWrapper.find(ReactTable);
      expect(table.prop('columns').length).to.equal(0);
    });
  });
});
