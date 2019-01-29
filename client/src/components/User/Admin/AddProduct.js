import React, { Component } from 'react';
import UserLayout from '../../HOC/UserLayout';

import FormField from '../../utils/Form/FormField';
import {
  update,
  generateData,
  isFormValid,
  populateOptionField,
  resetFields
} from '../../utils/Form/FormActions';

import { connect } from 'react-redux';
import {
  getBrands,
  getTypes,
  addProduct,
  clearProduct
} from '../../../actions/productsActions';

class AddProduct extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formData: {
      name: {
        element: 'input',
        value: '',
        config: {
          label: 'Product name',
          name: 'name_input',
          type: 'text',
          placeholder: 'Enter product name'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      description: {
        element: 'textarea',
        value: '',
        config: {
          label: 'Product description',
          name: 'description_input',
          type: 'text',
          placeholder: 'Enter product description'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      price: {
        element: 'input',
        value: '',
        config: {
          label: 'Product price',
          name: 'price_input',
          type: 'number',
          placeholder: 'Enter product price'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      brand: {
        element: 'select',
        value: '',
        config: {
          label: 'Product brand',
          name: 'brand_input',
          options: []
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      shipping: {
        element: 'select',
        value: '',
        config: {
          label: 'Shipping',
          name: 'shipping_input',
          options: [{ key: true, value: 'Yes' }, { key: false, value: 'No' }]
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      available: {
        element: 'select',
        value: '',
        config: {
          label: 'Available, in stock',
          name: 'available_input',
          options: [{ key: true, value: 'Yes' }, { key: false, value: 'No' }]
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      type: {
        element: 'select',
        value: '',
        config: {
          label: 'Type of chair',
          name: 'type_input',
          options: []
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      footStep: {
        element: 'select',
        value: '',
        config: {
          label: 'With FootStep',
          name: 'footStep_input',
          options: [
            { key: false, value: 'Without' },
            { key: true, value: 'With' }
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      publish: {
        element: 'select',
        value: '',
        config: {
          label: 'Publish',
          name: 'publish_input',
          options: [
            { key: true, value: 'Public' },
            { key: false, value: 'Hidden' }
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      }
    }
  };

  componentDidMount() {
    // make a copy of current state of formData
    const formData = this.state.formData;

    // ** Update the select option to the field
    // fetch the 'brand' options from the server and update the state of that field
    this.props.dispatch(getBrands()).then(res => {
      const newFormData = populateOptionField(
        formData,
        this.props.products.brands,
        'brand'
      );
      this.updateFields(newFormData);
    });

    // fetch the 'brand' options from the server and update the state of that field
    this.props.dispatch(getTypes()).then(res => {
      const newFormData = populateOptionField(
        formData,
        this.props.products.types,
        'type'
      );
      this.updateFields(newFormData);
    });
  }

  // update state of formData
  updateFields = newFormData => {
    this.setState({
      formData: newFormData
    });
  };

  // will emit whenever the FormField value is changed
  updateForm = element => {
    const newFormData = update(element, this.state.formData, 'products');
    this.setState({
      formError: false,
      formData: newFormData
    });
  };

  // called when the form submit success
  // will reset all the field 
  resetFieldHandler = () => {
    const newFormData = resetFields(this.state.formData, 'products')
    
    // update the state of formData to empty 
    // and set the success to true
    this.setState({
      formSuccess: true,
      formData: newFormData
    })

    // after 3s, success message will be gon
    // and dispatch action clear the addProduct in redux store
    setTimeout(() => {
      this.setState({
        formSuccess: false
      }, () => {
        this.props.dispatch(clearProduct())
      })
    }, 3000)
  }

  // handle the form submission
  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formData, 'products');
    let formIsValid = isFormValid(this.state.formData, 'products');

    // ensure all input elements is valid before submit the data to server
    if (formIsValid) {
      this.props.dispatch(addProduct(dataToSubmit)).then(() => {
        if (this.props.products.addProduct.success) {
          this.resetFieldHandler()
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
      <UserLayout>
        <div>
          <h1>Add Product</h1>
          <form onSubmit={event => this.submitForm(event)}>
            <FormField
              id={'name'}
              formData={this.state.formData.name}
              change={element => this.updateForm(element)}
            />
            <FormField
              id={'description'}
              formData={this.state.formData.description}
              change={element => this.updateForm(element)}
            />

            <FormField
              id={'price'}
              formData={this.state.formData.price}
              change={element => this.updateForm(element)}
            />

            <div className="form-divider" />

            <FormField
              id={'brand'}
              formData={this.state.formData.brand}
              change={element => this.updateForm(element)}
            />

            <FormField
              id={'shipping'}
              formData={this.state.formData.shipping}
              change={element => this.updateForm(element)}
            />

            <FormField
              id={'available'}
              formData={this.state.formData.available}
              change={element => this.updateForm(element)}
            />

            <div className="form-divider" />

            <FormField
              id={'type'}
              formData={this.state.formData.type}
              change={element => this.updateForm(element)}
            />

            <FormField
              id={'footStep'}
              formData={this.state.formData.footStep}
              change={element => this.updateForm(element)}
            />

            <div className="form-divider" />

            <FormField
              id={'publish'}
              formData={this.state.formData.publish}
              change={element => this.updateForm(element)}
            />

            
            <div>
              <button onClick={event => this.submitForm(event)}>
                Add product
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
      </UserLayout>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  };
};

export default connect(mapStateToProps)(AddProduct);
