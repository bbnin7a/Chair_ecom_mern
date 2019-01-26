import React from 'react';
import Button from '../utils/Button';
import Login from './Login';

const RegisterLogin = () => {
  return (
    <div className="page-wrapper">
      <div className="container">
        <div className="register-login-container">
          <div className="register-login-container__left">
            <h1>New Customer</h1>
            <p>
              By creating an account you will be able to shop faster, be up to
              date on an order's status, and keep track of the orders you have
              previously made.
            </p>
            <Button
              type="default"
              title="Create an account"
              linkTo="/register"
              addStyles={{ margin: '1rem 0 0 0' }}
            />
          </div>
          <div className="register-login-container__right">
            <h2>Registered customer</h2>
            <p>If you have an account please log in.</p>
            <Login />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterLogin;
