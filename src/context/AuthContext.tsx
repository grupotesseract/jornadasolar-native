import React, { createContext, useState } from 'react'
import { useEffect } from 'react'
import { IUser } from '../entities/User'
import { auth } from '../firebase/firebase.config'

interface AuthContextData {
  userId?: string
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {
  const [userId, setUserId] = useState('')

  useEffect(() => {
    const subscription = auth.onAuthStateChanged(user => {
      const id = user ? user.uid : ''
      setUserId(id)
    })
    return subscription
  }, [])

  return (
    <AuthContext.Provider value={{ userId }}>{children}</AuthContext.Provider>
  )
}

export default AuthContext
