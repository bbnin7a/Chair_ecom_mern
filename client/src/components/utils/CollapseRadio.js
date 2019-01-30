import React, { Component } from 'react';

import FontAwesome from '@fortawesome/react-fontawesome';
import faAngleDown from '@fortawesome/fontawesome-free-solid/faAngleDown';
import faAngleUp from '@fortawesome/fontawesome-free-solid/faAngleUp';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { withStyles } from '@material-ui/core/styles';

// styling material-ui checkbox
const radioStyles = theme => ({
  root: {
    '&$checked': {
      color: '#55efc4'
    }
  },
  checked: {}
});
const CustomRadio = withStyles(radioStyles)(Radio);


/**
 * Collapse Radio Component
 */
class CollapseRadio extends Component {
  state = {
    open: false,
    value: '0'
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

  // render the list of options
  renderList = () =>
    this.props.list
      ? this.props.list.map(item => (
          <FormControlLabel
            key={item._id}
            value={`${item._id}`}
            control={<CustomRadio />}
            label={item.name}
            className="collapse-items__title"
          />
        ))
      : null;

  // update the state of 'value' when the button is clicked
  handleChange = event => {
    const newValue = event.target.value;
    this.setState({ value: newValue }, () => {
      this.props.handleFilters(newValue);
    });
  };

  render() {
    return (
      <div className="collapse-items__wrapper">
        <List style={{ borderBottom: '1px solid #dbdbdb' }}>
          <ListItem
            onClick={this.handleClick}
            style={{ padding: '10px 23px 10px 0' }}
          >
            <ListItemText
              primary={this.props.title}
              className="collapse-items__heading"
            />
            {this.handleAngleIcon()}
          </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <RadioGroup
                aria-label="prices"
                name="prices"
                value={this.state.value}
                onChange={this.handleChange}
              >
                {this.renderList()}
              </RadioGroup>
            </List>
          </Collapse>
        </List>
      </div>
    );
  }
}

export default CollapseRadio;
