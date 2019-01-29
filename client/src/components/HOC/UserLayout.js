import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

// ** Navigation links
const links =[
  {
    name: 'My Account',
    linkTo: '/user/dashboard'
  },
  {
    name: 'User Information',
    linkTo: '/user/user_profile'
  },
  {
    name: 'My Cart',
    linkTo: '/user/cart'
  }
]

// ** Admin navigation links
const adminLinks = [
  {
    name: 'Site Info',
    linkTo: '/admin/site_info'
  },
  {
    name: 'Add Products',
    linkTo: '/admin/add_product'
  },
  {
    name: 'Manage Categories',
    linkTo: '/admin/manage_categories'
  },
]

// component
const UserLayout = (props) => {
  // render the navigation links
  const generateLinks = (links) => (
    links.map((item, i) => (
      <Link to={item.linkTo} key={i}>
        {item.name}
      </Link>
    ))
  )
    
  return (
    <div className="container">
      <div className="user-container">
        <div className="user-container__left">
          <h2>My Account</h2>
          <div className="links">
            {generateLinks(links)}
          </div>
          {
            props.user.userData.isAdmin ?
            <div>
              <h2>Admin</h2>
              <div className="links">
                {generateLinks(adminLinks)}
              </div>
            </div>
            :null

          }
        </div>
        <div className="user-container__right">
          {props.children}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(UserLayout)
