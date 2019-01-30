import React, { Component } from 'react';
import FormField from '../utils/Form/FormField';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import { update, generateData, isFormValid } from '../utils/Form/FormActions';
import { loginUser } from '../../actions/userActions';

class Login extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formData: {
      email: {
        element: 'input',
        value: '',
        config: {
          name: 'email_input',
          type: 'text',
          placeholder: 'Enter your email'
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },
      password: {
        element: 'input',
        value: '',
        config: {
          name: 'password_input',
          type: 'password',
          placeholder: 'Enter your password'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      }
    }
  };

  // will emit whenever the FormField value is changed
  updateForm = element => {
    const newFormData = update(element, this.state.formData, 'login');
    this.setState({
      formError: false,
      formData: newFormData
    });
  };

  // handle the form submission
  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formData, 'login');
    let formIsValid = isFormValid(this.state.formData, 'login');

    // ensure all input elements is valid before submit the data to server
    if (formIsValid) {
      this.props.dispatch(loginUser(dataToSubmit)).then(res => {
        if (res.payload.loginSuccess) {
          this.props.history.push('/user/dashboard')
        } else {
          this.setState({
            formError: true
          })
        }
      })
    } else {
      // if no valid, will render the form error message
      this.setState({
        formError: true
      });
    }
  };

  render() {
    return (
      <div className="login__wrapper">
        <form onSubmit={event => this.submitForm(event)}>
          <FormField
            id={'email'}
            formData={this.state.formData.email}
            change={element => this.updateForm(element)}
          />
          <FormField
            id={'password'}
            formData={this.state.formData.password}
            change={element => this.updateForm(element)}
          />

          <button onClick={event => this.submitForm(event)}>login</button>

          {this.state.formError ? (
            <div className="error-label mt-sm">
              Please check your inputs
            </div>
          ) : null}
        </form>
      </div>
    );
  }
}



export default connect()(withRouter(Login));
