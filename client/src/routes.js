import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './components/HOC/Layout';
import Auth from './components/HOC/Auth';

import Home from './components/Home';
import RegisterLogin from './components/RegisterLogin';
import Register from './components/RegisterLogin/Register'
import Shop from './components/Shop'
import ProductPage from './components/Product'

import UserDashboard from './components/User';
import AddProduct from './components/User/Admin/AddProduct';
import ManageCategories from './components/User/Admin/ManageCategories';

// Auth(comp, auth level)
const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/user/dashboard" exact component={Auth(UserDashboard, true)} />
        <Route path="/admin/add_product" exact component={Auth(AddProduct, true)} />
        <Route path="/admin/manage_categories" exact component={Auth(ManageCategories, true)} />

        <Route path="/product_detail/:prodId" exact component={Auth(ProductPage, null)} />
        <Route path="/register" exact component={Auth(Register, false)} />
        <Route path="/register_login" exact component={Auth(RegisterLogin, false)} />
        <Route path="/shop" exact component={Auth(Shop, null)} />
        <Route path="/" exact component={Auth(Home, null)} />
      </Switch>
    </Layout>
  );
};

export default Routes;
