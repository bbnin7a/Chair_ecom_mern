import React, { Component } from 'react';

import FormField from '../../utils/Form/FormField';
import {
  update,
  generateData,
  isFormValid,
  resetFields
} from '../../utils/Form/FormActions';

import { connect } from 'react-redux';
import { getBrands, addBrand } from '../../../actions/productsActions';

class ManageBrands extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formData: {
      name: {
        element: 'input',
        value: '',
        config: {
          name: 'brand_input',
          type: 'text',
          placeholder: 'Enter the brand'
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

  // fetch the brands list from server
  componentDidMount() {
    this.props.dispatch(getBrands());
  }

  // will emit whenever the FormField value is changed
  updateForm = element => {
    const newFormData = update(element, this.state.formData, 'brands');
    this.setState({
      formError: false,
      formData: newFormData
    });
  };

  // render the list of category
  showCategoryItem = () => {
    const { brands } = this.props.products;

    return brands
      ? brands.map((brand, i) => (
          <div key={brand._id} className="category__item">
            {brand.name}
          </div>
        ))
      : null;
  };

  // called when the form submit success
  // will reset all the field
  resetFieldsHandler = () => {
    const newFormData = resetFields(this.state.formData, 'brands');

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

    let dataToSubmit = generateData(this.state.formData, 'brands');
    let formIsValid = isFormValid(this.state.formData, 'brands');
    const existingBrands = this.props.products.brands;

    // ensure all input elements is valid before submit the data to server
    if (formIsValid) {
      this.props.dispatch(addBrand(dataToSubmit, existingBrands)).then(res => {
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
        <h1>Brands</h1>
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
                  Add brand
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
