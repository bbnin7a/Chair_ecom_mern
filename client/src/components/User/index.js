import React from 'react'
import UserLayout from '../../components/HOC/UserLayout'
import Button from '../utils/Button'

const UserDashoard = ({user}) => {
  return (
    <UserLayout>
      <div> 

        <div className="user-info-panel">
          <h1>User information</h1>
          <div>
            <span>{user.userData.name}</span>
            <span>{user.userData.lastname}</span>
            <span>{user.userData.email}</span>
          </div>
          <Button 
            type="default"
            title="Edit account info"
            linkTo="/user/user_profile"
          />
        </div>

        <div className="user-info-panel">
          <h1>History purchases</h1>
          <p>...</p>
        </div>
      </div>
    </UserLayout>
  )
}

export default UserDashoard
