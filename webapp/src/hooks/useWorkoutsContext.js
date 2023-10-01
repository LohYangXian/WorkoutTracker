import { WorkoutsContext } from '../context/WorkoutContext'
import { useContext } from 'react'

/**
 * Returns the value of the `context` variable from the `WorkoutsContext` provider.
 *
 * @return {any} The value of the `context` variable.
 */
export const useWorkoutsContext = () => {
  const context = useContext(WorkoutsContext)

  if (!context) {
    throw Error('useWorkoutsContext must be used inside an WorkoutsContextProvider')
  }

  return context
}