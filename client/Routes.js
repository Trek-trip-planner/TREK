import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { me } from './store';
import Home from './components/Home';
import SignUp from './components/SignUp';
import AllParks from './components/AllParks';
import Login from './components/Login';

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/all-parks' component={AllParks} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={SignUp} />
          </Switch>
        ) : (
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/all-parks' component={AllParks} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={SignUp} />
          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

export default withRouter(connect(mapState, mapDispatch)(Routes));
