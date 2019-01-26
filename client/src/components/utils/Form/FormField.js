/**
 * FORM FIELD
 * ==========
 * > Reuse component
 * > Types: Text input,
 * > Props: formData, change, id
 */

import React from 'react';

const FormField = ({ formData, change, id }) => {

  // Function to render Error message (if needed)
  const showError = () => {
    let errorMessage = null
  
    // check current the state of validation
    if (formData.validation && !formData.valid) {
      errorMessage= (
        <div className="error-label">
          {formData.validationMessage}
        </div>
      )
    }

    return errorMessage

  }
  
  // Function to render the input element
  const renderTemplate = () => {

    // default
    let formTemplate = null;

    // check type of input element
    switch (formData.element) {
      case 'input':
        formTemplate = (
          <div className="form-block">
            <input
              {...formData.config}
              value={formData.value}
              onBlur={event => change({ event, id, blur: true })}
              onChange={event => change({ event, id })}
            />
            {showError()}
          </div>
        );

        break;

      default:
        formTemplate = null;
    }

    return formTemplate;
  };

  return <div>{renderTemplate()}</div>;
};

export default FormField;
