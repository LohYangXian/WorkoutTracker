import { useAuthContext } from './useAuthContext'
import { useWorkoutsContext } from './useWorkoutsContext'

/**
 * Returns a logout function that removes the user from storage,
 * dispatches a logout action, and sets workouts to null.
 *
 * @return {object} An object containing a logout function.
 */
export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: workoutsDispatch } = useWorkoutsContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    workoutsDispatch({ type: 'SET_WORKOUTS', payload: null })
  }

  return { logout }
}