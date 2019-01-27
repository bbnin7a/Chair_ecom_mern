import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authUser } from '../../actions/userActions';
import CircularProgress from '@material-ui/core/CircularProgress';

/**
 * Route Authetication Checking (Higher Object Component)
 * @param ComposedClass Component
 * @param reload reload the page depends on the authentication levels:
 *  - null = public,
 *  - false = semi-public(i.e. when user is authenticated, will be redirected to other route),
 *  - true = private
 */

export default (ComposedClass, reload, adminRoute = null) => {
  class AuthenticationCheck extends Component {
    state = {
      loading: true
    };

    // request to the server to get authenticated
    componentDidMount() {
      this.props.dispatch(authUser()).then(res => {
        let user = this.props.user.userData;

        // ** if user not authenticated
        if (!user.isAuth) {
          // if reload is either null or false,
          // they will be push to login page
          // example: only authenticated user can visit dashboard
          if (reload) {
            this.props.history.push('/register_login');
          }
        } else {
          // ** if user is authenticated

          // identity checking
          if (adminRoute && !user.isAdmin) {
            // admin user
            this.props.history.push('/user/dashboard');
          } else {
            // normal user
            // they will skip this component and redirect to dashboard
            // example: authenticated user cannot see the login page
            if (reload === false) {
              this.props.history.push('/user/dashboard');
            }
          }
        }

        this.setState({
          loading: false
        });
      });
    }

    render() {
      //
      if (this.state.loading) {
        return (
          <div className="loader-container">
            <CircularProgress style={{ color: '#999592' }} thickness={7} />
          </div>
        );
      }
      // return the component will new props
      return <ComposedClass {...this.props} user={this.props.user} />;
    }
  }

  function mapStateToProps(state) {
    return {
      user: state.user
    };
  }

  return connect(mapStateToProps)(AuthenticationCheck);
};
