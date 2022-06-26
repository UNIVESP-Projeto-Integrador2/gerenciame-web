import React, { useState } from 'react'
import { Routes as ReactDOMRoutes, Route } from 'react-router-dom'

import { DashboardPage } from '../pages/Dashboard'
import { SignUpPage } from '../pages/SignUp'
import { LoginPage } from '../pages/Login'

import { UserContext } from '../context/userContext'

export const Routes = () => {
  const [user, setUser] = useState({ user: { email: 'user@email.com ' } })

  const setUserEmail = (email: string) => {
    setUser({ user: { email } })
  }

  return (
    <UserContext.Provider value={user}>
      <ReactDOMRoutes>
        <Route path="/" element={<SignUpPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage setUserEmail={setUserEmail} />} />
        <Route path="/home" element={<DashboardPage />} />
        {/* <Route element={<ProtectedRoute />}> */}
      </ReactDOMRoutes>
    </UserContext.Provider>
  )
}
