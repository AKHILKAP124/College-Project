
import React, { Component } from 'react'
import { useSelector } from 'react-redux'



const ProtectedRoutes = (props) => {

  const token = useSelector(state => state.user.token) || localStorage.getItem('token') // Replace with your actual token check logic
  

  const { component: Component } = props
  const message = () => {
    alert('Please login to access this page')
    window.location.href = '/signin'
  }

  return token ? <Component /> : message()
}



export default ProtectedRoutes