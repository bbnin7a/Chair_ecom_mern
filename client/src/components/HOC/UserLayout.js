import React from 'react'
import { Link } from 'react-router-dom'

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
        </div>
        <div className="user-container__right">
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default UserLayout
