/* eslint react/jsx-props-no-spreading: 0, react/static-property-placement: 0 */

/**
 * Exports functions to dynamically wrap and inject a saga consumer
 */

import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { ReactReduxContext } from 'react-redux';

import getInjectors from './sagaInjectors';

/**
 * Dynamically injects a saga, passes component's props as saga arguments
 * @param {string} key Saga key
 * @param {function} saga Target saga function
 */
export default ({ key, saga }) =>
  (WrappedComponent) => {
    class InjectSaga extends React.Component {
      static WrappedComponent = WrappedComponent;

      static contextType = ReactReduxContext;

      static displayName = `withSaga(${
        WrappedComponent.displayName || WrappedComponent.name || 'Component'
      })`;

      constructor(props, context) {
        super(props, context);

        this.injectors = getInjectors(context.store);

        this.injectors.injectSaga(key, { saga }, this.props);
      }

      componentWillUnmount() {
        this.injectors.ejectSaga(key);
      }

      render() {
        return <WrappedComponent {...this.props} />;
      }
    }

    return hoistNonReactStatics(InjectSaga, WrappedComponent);
  };

const useInjectSaga = ({ key, saga }) => {
  const context = React.useContext(ReactReduxContext);
  React.useEffect(() => {
    const injectors = getInjectors(context.store);
    injectors.injectSaga(key, { saga });

    return () => {
      injectors.ejectSaga(key);
    };
  }, []);
};

export { useInjectSaga };
