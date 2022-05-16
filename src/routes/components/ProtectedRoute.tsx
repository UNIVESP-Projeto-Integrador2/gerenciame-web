import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

interface ProtectedRouteProps {
  redirectPath?: string
  children?: JSX.Element
}

export const ProtectedRoute = ({ redirectPath = '/', children }: ProtectedRouteProps) => {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to={redirectPath} replace />
  }

  return children ? children : <Outlet />
}
