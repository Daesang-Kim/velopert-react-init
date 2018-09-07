import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Auth from 'util/lib/Authentication';

class Logout extends Component {
  static defaultProps = {
    history: null,
  }

  logout = () => {
    const { history } = this.props;
    Auth.logout(history);
  }

  render() {
    return (
      <React.Fragment>
        <button type="button" onClick={this.logout}>logout</button>
      </React.Fragment>
    );
  }
}

Logout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

export default withRouter(Logout);
