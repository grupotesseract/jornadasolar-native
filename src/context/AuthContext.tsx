import React, { createContext, useState } from 'react'
import { useEffect } from 'react'
import { IUser } from '../entities/User'
import { auth } from '../firebase/firebase.config'
import { setLocale } from '../i18n'
import GetUserById from '../services/user/GetUserById'

interface AuthContextData {
  userId?: string
  userName?: string
  user?: IUser
  refreshUser: () => void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<IUser>()
  const userId = user ? user.id : ''
  const userName = user ? user.nome : ''

  useEffect(() => {
    const subscription = auth.onAuthStateChanged(async user => {
      refreshUser()
    })
    return subscription
  }, [])

  const refreshUser = async () => {
    const currentUser = auth.currentUser
    if (currentUser) {
      const usuario = await new GetUserById().call(currentUser.uid)
      setUser(usuario)
      setLocale(usuario.idioma)
    } else {
      setUser(null)
    }
  }

  return (
    <AuthContext.Provider value={{ userId, user, userName, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
