import React from 'react'
import UserLayout from '../../HOC/UserLayout'
import ManageBrands from './ManageBrands'
import ManageTypes from './ManageTypes'

const ManageCategories = () => {
  return (
    <UserLayout>
      <ManageBrands/>
      <ManageTypes/>
    </UserLayout>
  )
}

export default ManageCategories
