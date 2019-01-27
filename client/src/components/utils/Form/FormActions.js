/**
 * Input field validation
 * Rules checking: 1) Required, 2) Email, 3)
 * @param {Object} element the updated input element carrying new data
 * @param {Array} formData formData array pass by state
 * @returns {Array} error[result(bool), message(string)]
 */
export const validate = (element, formData = []) => {
  // error array init: [bool, string]
  let error = [true, ''];

  // ** Check confirmPassword is equal to its ref (e.g. password)
  if (element.validation.confirm) {
    // Comparing confirmPassword's value and password's value
    const valid =
      element.value.trim() === formData[element.validation.confirm].value;
    // set a message depends on valid result
    const message = `${!valid ? 'Passwords do not match' : ''}`;

    // update new error array
    error = !valid ? [valid, message] : error;
  }

  // ** Check required
  if (element.validation.required) {
    // valid will be false, if the value of element is empty
    const valid = element.value.trim() !== '';
    // set a message depends on valid result
    const message = `${!valid ? 'This field is required' : ''}`;

    // update new error array
    error = !valid ? [valid, message] : error;
  }

  // ** Check email
  if (element.validation.email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // test the element of value with the regex
    const valid = re.test(element.value);

    // set a message depends on valid result
    const message = `${!valid ? 'Must be a valid email' : ''}`;

    // update new error array
    error = !valid ? [valid, message] : error;
  }

  return error;
};

/**
 * Function will be triggerd when input element's value is changed
 * @param {Object} element the updated input element carrying new data
 * @param {Array} formData formData array pass by state
 * @param {string} formName name of the form
 * @return {Array} newFormData
 */
export const update = (element, formData, formName) => {
  // make a copy of formData
  const newFormData = {
    ...formData
  };

  // duplicate the tagarted element with formData
  const newElement = {
    ...newFormData[element.id]
  };

  // update the value of input
  newElement.value = element.event.target.value;

  // blur means the element is being touched and leaved..
  if (element.blur) {
    // validData will receive an error array[bool, string]
    let validData = validate(newElement, formData);

    // update the newElement value
    newElement.valid = validData[0];
    newElement.validationMessage = validData[1];
  }

  // update the value of touched
  newElement.touched = element.blur;

  // put back the newElement to whole group of formdata
  newFormData[element.id] = newElement;

  return newFormData;
};

/**
 * Prepare a new data object to submit
 * @param {Array} formData formData array pass by state
 * @param {tring} formName name of the form
 * @returns {Object} e.g.{email: "abc@gmail.com", password: "password123"}
 */
export const generateData = (formData, formName) => {
  let dataToSubmit = {};

  // loop through the array
  for (let key in formData) {

    // inject the data except the confirmPassword value
    if (key !== 'confirmPassword') {
      dataToSubmit[key] = formData[key].value;
    }
  }

  return dataToSubmit;
};

/**
 * Ensure all the input's value is valid before submission
 * Function is called from submitForm()
 * @param {Array} formData formData array pass by state
 * @param {string} formName name of the form
 * @returns {Bool}
 */
export const isFormValid = (formData, formName) => {
  let formIsValid = true;

  // loop through the formData array
  // to ensure 'EVERY' inputs element has the 'valid' field equal to true
  for (let key in formData) {
    formIsValid = formData[key].valid && formIsValid;
  }

  return formIsValid;
};
