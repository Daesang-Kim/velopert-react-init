import React, { Component } from 'react';
import { Login } from 'components/Auth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as loginActions from 'modules/login/loginModule';
import Auth from 'util/lib/Authentication';

class LoginLayoutContainer extends Component {
  static defaultProps = {
    history: null,
    LoginActions: null,
  }

  constructor(props) {
    super(props);
    if (Auth.isAuthenticated()) {
      props.history.push('/');
    }
  }

  handleLoginSubmit = e => {
    e.preventDefault();
    const { LoginActions, history } = this.props;

    LoginActions.login({
      userid: e.target[0].value,
      password: e.target[1].value,
      history,
    });
  }

  render() {
    const { handleLoginSubmit } = this;
    const { error, errorStatus } = this.props;
    return (
      <div>
        Login Page
        <Login onLogin={handleLoginSubmit} />
        {error && <p style={{ color: 'red' }}>{errorStatus}</p>}
      </div>
    );
  }
}

LoginLayoutContainer.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  LoginActions: PropTypes.shape({
    login: PropTypes.func.isRequired,
  }),
  error: PropTypes.bool.isRequired,
  errorStatus: PropTypes.string.isRequired,
};

export default connect(
  state => ({
    pendding: state.loginModule.get('pendding'),
    error: state.loginModule.get('error'),
    errorStatus: state.loginModule.get('errorStatus'),
  }),
  dispatch => ({
    LoginActions: bindActionCreators(loginActions, dispatch),
  }),
)(LoginLayoutContainer);
