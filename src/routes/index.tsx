import React from 'react'
import { Routes as ReactDOMRoutes, Route } from 'react-router-dom'

import { DashboardPage } from '../pages/Dashboard'
import { SignUpPage } from '../pages/SignUp'
import { LoginPage } from '../pages/Login'

export const Routes = () => {
  return (
    <ReactDOMRoutes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      {/* <Route element={<ProtectedRoute />}> */}
      <Route path="/" element={<DashboardPage />} />
      {/* </Route> */}
    </ReactDOMRoutes>
  )
}
