import React, { Component } from 'react';

import FormField from '../../utils/Form/FormField';
import {
  update,
  generateData,
  isFormValid,
  resetFields
} from '../../utils/Form/FormActions';

import { connect } from 'react-redux';
import { getTypes, addType } from '../../../actions/productsActions';

class ManageBrands extends Component {
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
          placeholder: 'Enter the type of chair'
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

  // fetch the types list from server
  componentDidMount() {
    this.props.dispatch(getTypes());
  }

  // will emit whenever the FormField value is changed
  updateForm = element => {
    const newFormData = update(element, this.state.formData, 'types');
    this.setState({
      formError: false,
      formData: newFormData
    });
  };

  // render the list of category
  showCategoryItem = () => {
    const { types } = this.props.products;

    return types
      ? types.map((type, i) => (
          <div key={type._id} className="category__item">
            {type.name}
          </div>
        ))
      : null;
  };

  // called when the form submit success
  // will reset all the field
  resetFieldsHandler = () => {
    const newFormData = resetFields(this.state.formData, 'types');

    // update the state of formData to empty
    // and set the success to true
    this.setState({
      formSuccess: true,
      formData: newFormData
    });
  };

  // handle the form submission
  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formData, 'types');
    let formIsValid = isFormValid(this.state.formData, 'types');
    const existingTypes = this.props.products.types;

    // ensure all input elements is valid before submit the data to server
    if (formIsValid) {
      this.props.dispatch(addType(dataToSubmit, existingTypes)).then(res => {
        if (res.payload.success) {
          this.resetFieldsHandler();
        } else {
          this.setState({ formError: true });
        }
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
      <div className="admin-category__wrapper">
        <h1>Types</h1>
        <div className="admin-two-column">
          <div className="admin-two-column__left">
            <div className="brands__container">{this.showCategoryItem()}</div>
          </div>
          <div className="admin-two-column__right">
            <form onSubmit={event => this.submitForm(event)}>
              <FormField
                id={'name'}
                formData={this.state.formData.name}
                change={element => this.updateForm(element)}
              />
              <div>
                <button onClick={event => this.submitForm(event)}>
                  Add Type
                </button>

                {this.state.formError ? (
                  <div className="error-label mt-sm">
                    Please check your inputs
                  </div>
                ) : null}

                {this.state.formSuccess ? (
                  <div className="form-success mt-md">Success</div>
                ) : null}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  };
};

export default connect(mapStateToProps)(ManageBrands);
