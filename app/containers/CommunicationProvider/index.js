/**
 * CommunicationProvider bridges the events issued by the hackchat-engine
 * with the store
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectCommunicationProvider from './selectors';
import reducer from './reducer';
import saga from './saga';

export function CommunicationProvider({ children }) {
  useInjectReducer({ key: 'communicationProvider', reducer });
  useInjectSaga({ key: 'communicationProvider', saga });

  return <div>{React.Children.only(children)}</div>;
}

CommunicationProvider.propTypes = {
  children: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  communicationProvider: makeSelectCommunicationProvider(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(CommunicationProvider);
