import React from 'react';
import { NavLink } from 'react-router-dom';
import { Logout } from 'components/Auth';
import Lang from '../../util/lib/Lang';


const NavigationBar = () => (
  <div className="NavigationBar">
    <div className="navigation-bar-title">
      <NavLink to="/live">
        {Lang.LIVE}
      </NavLink>
      <NavLink to="/playback">
        {Lang.PLAYBACK}
      </NavLink>
      <NavLink to="/setup">
        {Lang.SETUP}
      </NavLink>
      <Logout />
    </div>
  </div>
);

export default NavigationBar;
