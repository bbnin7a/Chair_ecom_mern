/**
 * CHECKBOX COMPONENT
 * see: https://material-ui.com/demos/lists/
 */
import React, { Component } from 'react';

import FontAwesome from '@fortawesome/react-fontawesome';
import faAngleDown from '@fortawesome/fontawesome-free-solid/faAngleDown';
import faAngleUp from '@fortawesome/fontawesome-free-solid/faAngleUp';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Collapse from '@material-ui/core/Collapse';

export default class CollapseCheckBox extends Component {
  state = {
    open: false,
    checked: []
  };

  componentDidMount() {
    // update the initial state from props
    if (this.props.initState) {
      this.setState({
        open: this.props.initState
      });
    }
  }

  // Toggle the 'open' state
  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  // render the collapse arrow icon with the state of 'open'
  handleAngleIcon = () =>
    this.state.open ? (
      <FontAwesome icon={faAngleUp} className="icon" />
    ) : (
      <FontAwesome icon={faAngleDown} className="icon" />
    );

  // update the state of 'checked' array
  // when the checkbox is changed
  handleCheckBoxToggle = item => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(item);
    const newChecked = [...checked];

    // check whehter the item is in the array
    // if not in the array, the item will be added
    // otherwise will be removed from the array
    if (currentIndex === -1) {
      newChecked.push(item);
    } else {
      // remove only 1 item from the give index
      newChecked.splice(currentIndex, 1);
    }


    // update new 'checked' state with callback to pass the array to parent
    this.setState({
      checked: newChecked
    }, () => {
      this.props.handleFilters(newChecked)
    });
  };

  // render the list of options
  renderList = () =>
    this.props.list
      ? this.props.list.map(item => (
          <ListItem key={item._id} style={{ padding: '10px 0' }}>
            <ListItemText primary={item.name} className="collapse-items__title"/>
            <ListItemSecondaryAction>
              <Checkbox
                color="primary"
                onChange={() => this.handleCheckBoxToggle(item._id)}
                checked={this.state.checked.indexOf(item._id) !== -1}
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))
      : null;

  render() {
    const { open, checked} = this.state
    return (
      <div className="collapse-items__wrapper">
        <List style={{ borderBottom: '1px solid #dbdbdb' }}>
          <ListItem
            onClick={this.handleClick}
            style={{ padding: '10px 23px 10px 0' }}
          >
            <ListItemText
              primary={checked.length !== 0 ? `${this.props.title} (${checked.length})`: this.props.title }
              className="collapse-items__heading"
            />
            {this.handleAngleIcon()}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {this.renderList()}
            </List>
          </Collapse>
        </List>
      </div>
    );
  }
}
