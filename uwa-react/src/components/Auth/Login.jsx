import React from 'react';
import PropTypes from 'prop-types';

const loginBoxStyle = {
  width: 240,
  border: '0.1rem solid black',
  textAlign: 'center',
};

const Login = ({ onLogin }) => (
  <form style={loginBoxStyle} onSubmit={onLogin}>
    <div>
      <div>
        <label htmlFor="id">
          <span>ID</span>
          <input autoFocus="true" type="text" id="id" autoComplete="off" />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          <span>PW</span>
          <input type="password" id="password" autoComplete="off" />
        </label>
      </div>
    </div>
    <div>
      <input type="submit" />
    </div>
  </form>
);

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default (Login);
