import CryptoJS from 'crypto-js';
import * as loginAction from 'modules/login/loginModule';

function decimalToHex(dec, _padding) {
  let hex = Number(dec).toString(16);
  const padding = typeof (_padding) === 'undefined' || _padding === null ? 2 : _padding;

  while (hex.length < padding) {
    hex = `0${hex}`;
  }
  return hex;
}

function formulateResponse(_username, _password, url, realm, method, nonce, nc, cnonce, qop) {
  const HA1 = CryptoJS.MD5(`${_username}:${realm}:${_password}`).toString();
  const HA2 = CryptoJS.MD5(`${method}:${url}`).toString();
  const response = CryptoJS.MD5(`${HA1}:${nonce}:${decimalToHex(nc, 8)}:${cnonce}:${qop}:${HA2}`).toString();
  return response;
}

function generateCnonce() {
  const characters = 'abcdef0123456789';
  let token = '';
  for (let i = 0; i < 16; i += 1) {
    const randNum = Math.round(Math.random() * characters.length);
    token += characters.substr(randNum, 1);
  }
  return token;
}

class Authentication {
  constructor() {
    this.isLoggedIn = false;
    this.store = null;
    this.userid = sessionStorage.getItem('userid') || null;
    this.password = sessionStorage.getItem('password') || null;
    this.authData = sessionStorage.getItem('authData') || null;
    if (this.authData && this.userid && this.password) {
      this.isLoggedIn = true;
      this.authData = JSON.parse(this.authData);
    }
  }

  setStore= store => {
    this.store = store;
  }

  init() {
    this.isLoggedIn = false;
    this.userid = null;
    this.password = null;
    this.authData = null;
    sessionStorage.removeItem('userid');
    sessionStorage.removeItem('password');
    sessionStorage.removeItem('authData');
  }

  makeAuthData = data => {
    const { header, userid, password } = data;
    this.authData = {
      realm: header['www-authenticate'].split('"')[1],
      nonce: header['www-authenticate'].split('"')[3],
      qop: header['www-authenticate'].split('"')[5],
      cnonce: '0482f40715d384c',
      opaque: null,
      scheme: 'Digest',
      nc: 0,
    };
    this.userid = userid;
    this.password = password;
  }

  makeDigestHeader = (type, url) => {
    let digestHeader = null;
    if (this.authData === null) {
      return null;
    }
    if (this.authData.scheme.toLowerCase() === 'digest' || this.authData.scheme.toLowerCase() === 'xdigest') {
      this.authData.nc += 1;
      this.authData.cnonce = generateCnonce();
      const responseValue = formulateResponse(this.userid, this.password, url, this.authData.realm,
        type, this.authData.nonce, this.authData.nc,
        this.authData.cnonce, this.authData.qop);
      digestHeader = `${this.authData.scheme} username="${this.userid}", realm="${this.authData.realm}", nonce="${this.authData.nonce}", uri="${url}", cnonce="${this.authData.cnonce}" nc=${decimalToHex(this.authData.nc, 8)}, qop=${this.authData.qop}, response="${responseValue}"`;
    } else if (this.authData.scheme.toLowerCase() === 'basic') {
      digestHeader = `${this.authData.scheme} ${btoa(`${this.userid}:${this.password}`)}`;
    }
    sessionStorage.setItem('authData', JSON.stringify(this.authData));
    return {
      headers: { Authorization: digestHeader },
    };
  }

  isAuthenticated = () => this.isLoggedIn;

  loginSuccess = history => {
    this.isLoggedIn = true;
    sessionStorage.setItem('userid', this.userid);
    sessionStorage.setItem('password', this.password);
    this.store.dispatch(loginAction.loginSuccess());
    history.push('/');
  }

  loginFailed = errorStatus => {
    this.init();
    this.store.dispatch(loginAction.loginFailure({
      errorStatus,
    }));
  }

  logout = history => {
    this.init();
    history.push('/login');
  }
}

export default new Authentication();
