import React, {Component} from 'react';
import MenuItem from 'material-ui/MenuItem';
import {Link} from 'react-router';


class MenuItemLink extends Component {

  constructor(props) {
    super(props);
    this.link = props.link || {destination: "\\", label: 'not defined'};
  };

  render() {
    return (
        <MenuItem containerElement={<Link to={this.link.destination}/>}>{this.link.label}</MenuItem>
    );
  }
}

export default MenuItemLink;