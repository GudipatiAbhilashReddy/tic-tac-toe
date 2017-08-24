/**
 * @author Dmitry Malakhov
 */

'use strict';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ConfigureRoute from './ConfigureRoute';
import PlayingboardRoute from './PlayingboardRoute';
import FinishRoute from './FinishRoute';
import SCTransition from '../components/SCTransition';

const propTypes = {
  prevPathname: PropTypes.string,
  location: PropTypes.shape({
    hash: PropTypes.string,
    key: PropTypes.string,
    pathname: PropTypes.string,
  }),
};

const defaultProps = {
  prevPathname: '/',
  location: {},
};

const availableRoutes = {
  '/configure': ConfigureRoute,
  '/playingboard': PlayingboardRoute,
  '/finish': FinishRoute,
};

const routes = new Proxy(availableRoutes, {
  get(target, prop) {
    const Route = target[prop];
    return Route ? <Route /> : null;
  },
});

class AnimationRoute extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      prevRouteAnimationEnded: false,
      currentPathname: props.location.pathname,
    };
  }

  _renderPrevRoute() {
    if (this.state.prevRouteAnimationEnded)
      return null;

    return routes[this.props.prevPathname];
  }

  _renderNextRoute() {
    return routes[this.props.location.pathname];
  }

  _handleTransitionOut = () => {
    this.setState({
      prevRouteAnimationEnded: true,
    });
  }

  render() {
    const PrevRoute = this._renderPrevRoute(),
      NextRoute = this._renderNextRoute();

    return (
      <div>
        <SCTransition transitionOut onTransitionOut={this._handleTransitionOut}>
          {PrevRoute}
        </SCTransition>
        <SCTransition transitionIn>
          {NextRoute}
        </SCTransition>
      </div>
    );
  }
}

AnimationRoute.propTypes = propTypes;
AnimationRoute.defaultProps = defaultProps;
AnimationRoute.displayName = 'AnimationRoute';

export default AnimationRoute;