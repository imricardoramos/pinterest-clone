import { useState, useEffect, createContext, useContext } from 'react'
import axios from 'axios'

const AuthContext = createContext({
  loggedUserData: {},
  setLoggedUserData: () => {},
  isAuthenticated: false,
  isLoading: true,
  setAuthenticated: () => {}
});

export function AuthProvider({children}){
  const [isAuthenticated, setAuthenticated] = useState(false)
  const [loggedUserData, setLoggedUserData] = useState({})
  const [isLoading, setLoading] = useState(true)
  useEffect(() => {
    const initializeAuth = async () => {
      try{
        await axios.get("/check-auth/")
        const response = await axios.get("/user/me/")
        setLoggedUserData(response.data)
        setAuthenticated(true);
      } catch (e) {
        setAuthenticated(false);
      }
      setLoading(false)
    }
    initializeAuth()
  }, [isAuthenticated])
  return (
    <AuthContext.Provider
      value={{
        loggedUserData,
        setLoggedUserData,
        isAuthenticated,
        isLoading,
        setAuthenticated,
      }}>
      { children }
    </AuthContext.Provider>
  )
}
export function useAuth(){
  const context = useContext(AuthContext)
  if(context == undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context
}

export function useIsAuthenticated() {
  const context = useAuth();
  return context.isAuthenticated;
}
