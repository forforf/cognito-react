import React, {Component} from 'react';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItemLink from 'app/container/MenuItemLink';


class Account extends Component {

  constructor(props) {
    super(props);
    const { menuLinks, ...rest } = props;
    this.menuLinks = menuLinks || [];
    this.otherProps = rest;
  }

  render() {
    const menuItems = this.menuLinks.map((link, idx) => {
      const key = `menuItemLink-idx-${idx}`;

      return <MenuItemLink key={key} link={link}/>
    });

    // menuItems are built from props above
    // We must not send our props to IconMenu
    return (
        <IconMenu
            {...this.otherProps}
            iconButtonElement={<AccountButton />}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        >
          { menuItems }

        </IconMenu>
    )
  }
}

class AccountButton extends Component {
  static muiName = 'FlatButton';

  render() {
    const style = {fontSize: '75%'};
    return (
        // We do need to send all props to FlatButton
        // I need to understand why, as it's a bit to magical at the moment
        <FlatButton {...this.props}  label="Aws Account" labelStyle={style} />
    );
  }
}

export default Account;
