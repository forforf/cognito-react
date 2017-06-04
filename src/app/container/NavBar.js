import React from 'react';
import {IndexLink, Link} from 'react-router';
import {Tabs, Tab} from 'material-ui/Tabs';

const NavBar = () => (
    <Tabs>
      <Tab label='Home' containerElement={<IndexLink to='/' />} />
      <Tab label='About'  containerElement={<Link to='/about' />} />
    </Tabs>
);

export default NavBar;
