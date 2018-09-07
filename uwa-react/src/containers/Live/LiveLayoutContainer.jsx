import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as loginActions from 'modules/login/loginModule';

class LiveLayoutContainer extends Component {
  static defaultProps = {
    LoginActions: null,
  }

  test = () => {
    const { LoginActions } = this.props;
    LoginActions.getAttributes();
  }

  test2 = () => {
    const { LoginActions } = this.props;
    LoginActions.getEventRules();
  }

  render() {
    return (
      <div>
        <button type="button" onClick={this.test}>attributes</button>
        <button type="button" onClick={this.test2}>Event rules</button>
        Live Page
      </div>
    );
  }
}

LiveLayoutContainer.propTypes = {
  LoginActions: PropTypes.shape({
    login: PropTypes.func.isRequired,
  }),
};

export default connect(
  null,
  dispatch => ({
    LoginActions: bindActionCreators(loginActions, dispatch),
  }),
)(LiveLayoutContainer);
