import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import SingleParkPage from './components/SingleParkPage';
import { me } from './store';
import Home from './components/Home';
import SignUp from './components/SignUp';
import AllParks from './components/AllParks';
import Login from './components/Login';
import MyTrip from './components/MyTrip';

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
            <Route exact path='/mytrip' component={MyTrip} />
            <Route path='/:parkName' component={SingleParkPage} />
          </Switch>
        ) : (
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/all-parks' component={AllParks} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={SignUp} />
            <Route path='/:parkName' component={SingleParkPage} />
          </Switch>
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
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
