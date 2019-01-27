import React, { Component } from 'react';
import FormField from '../utils/Form/FormField';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import { update, generateData, isFormValid } from '../utils/Form/FormActions';
import { registerUser } from '../../actions/userActions';

class Register extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formData: {
      name: {
        element: 'input',
        value: '',
        config: {
          name: 'name_input',
          type: 'text',
          placeholder: 'Enter your name'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },
      lastname: {
        element: 'input',
        value: '',
        config: {
          name: 'lastname_input',
          type: 'text',
          placeholder: 'Enter your lastname'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },
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
      },
      confirmPassword: {
        element: 'input',
        value: '',
        config: {
          name: 'confirm_password_input',
          type: 'password',
          placeholder: 'Confirm your password'
        },
        validation: {
          required: true,
          confirm: 'password'
        },
        valid: false,
        touched: false,
        validationMessage: ''
      }
    }
  };

  // will emit whenever the FormField value is changed
  updateForm = element => {
    const newFormData = update(element, this.state.formData, 'register');
    this.setState({
      formError: false,
      formData: newFormData
    });
  };

  // handle the form submission
  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formData, 'register');
    let formIsValid = isFormValid(this.state.formData, 'register');

    // ensure all input elements is valid before submit the data to server
    if (formIsValid) {
      this.props
        .dispatch(registerUser(dataToSubmit))
        .then(res => {
          // response result from server
          if (res.payload.registerSuccess) {
            this.setState({
              formError: false,
              formSuccess: true
            });

            // redirect user to login page after register sucess
            setTimeout(() => {
              this.props.history.push('/register_login');
            }, 3000);
          } else {
            this.setState({
              formError: true
            });
          }
        })
        .catch(err => {
          this.setState({ formError: true });
        });
    } else {
      // if no valid, will render the form error message
      this.setState({
        formError: true
      });
    }
  };

  render() {
    return (
      <div className="page-wrapper">
        <div className="container">
          <div className="register-login-container">
            <div className="register-login-container__left">
              <form onSubmit={event => this.submitForm(event)}>
                <h2>Personal information</h2>
                <div className="form-block--two">
                  <div className="block">
                    <FormField
                      id={'name'}
                      formData={this.state.formData.name}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                  <div className="block">
                    <FormField
                      id={'lastname'}
                      formData={this.state.formData.lastname}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                </div>

                <div className="mb-lg">
                  <FormField
                    id={'email'}
                    formData={this.state.formData.email}
                    change={element => this.updateForm(element)}
                  />
                </div>

                <h2>Verify password</h2>
                <div className="form-block--two">
                  <div className="block">
                    <FormField
                      id={'password'}
                      formData={this.state.formData.password}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                  <div className="block">
                    <FormField
                      id={'confirmPassword'}
                      formData={this.state.formData.confirmPassword}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                </div>

                <div>
                  <button onClick={event => this.submitForm(event)}>
                    Create an account
                  </button>

                  {this.state.formError ? (
                    <div className="error-label mt-sm">
                      Please check your inputs
                    </div>
                  ) : null}
                </div>
              </form>
            </div>
          </div>
        </div>

        <Dialog open={this.state.formSuccess}>
          <DialogTitle>
            <span className="dialog__title">Congratulations!</span>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <span className="dialog__content">
                You will be redirected to the LOGIN in a couple seconds...
              </span>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default connect()(Register);
