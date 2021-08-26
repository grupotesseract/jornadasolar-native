import React, { createContext, useState } from 'react'
import { useEffect } from 'react'
import { IUser } from '../entities/User'
import { auth } from '../firebase/firebase.config'
import GetUserById from '../services/user/GetUserById'

interface AuthContextData {
  userId?: string
  userName?: string
  user?: IUser
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<IUser>()
  const userId = user.id || ''
  const userName = user.nome || ''

  useEffect(() => {
    const subscription = auth.onAuthStateChanged(async user => {
      if (user) {
        const usuario = await new GetUserById().call(user.uid)
        setUser(usuario)
      }
    })
    return subscription
  }, [])

  return (
    <AuthContext.Provider value={{ userId, user, userName }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
