import { AuthContext } from "../context/AuthContext"
import { useContext } from "react"

/**
 * Returns the authentication context.
 *
 * @return {object} The authentication context.
 */
export const useAuthContext = () => {
  const context = useContext(AuthContext)

  if(!context) {
    throw Error('useAuthContext must be used inside an AuthContextProvider')
  }

  return context
}