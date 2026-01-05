/**
 * WalletLayer
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import reducer from './reducer';
import saga from './saga';

export function WalletLayer({ children }) {
  useInjectReducer({ key: 'walletLayer', reducer });
  useInjectSaga({ key: 'walletLayer', saga });

  return <>{children}</>;
}

WalletLayer.propTypes = {
  children: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  //walletLayer: makeSelectWalletLayer(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(WalletLayer);
