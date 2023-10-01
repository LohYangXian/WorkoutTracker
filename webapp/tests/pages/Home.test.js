import { render, screen } from '@testing-library/react'
import { WorkoutsProvider } from '../../src/hooks/useWorkoutsContext'
import { AuthProvider } from '../../src/hooks/useAuthContext'
import Home from '../../src/pages/Home'

describe('Home component', () => {
  test('renders the Home component', () => {
    render(
      <AuthProvider>
        <WorkoutsProvider>
          <Home />
        </WorkoutsProvider>
      </AuthProvider>
    )

    const homeElement = screen.getByTestId('home')
    expect(homeElement).toBeInTheDocument()
  })

  test('renders the WorkoutForm component', () => {
    render(
      <AuthProvider>
        <WorkoutsProvider>
          <Home />
        </WorkoutsProvider>
      </AuthProvider>
    )

    const workoutFormElement = screen.getByTestId('workout-form')
    expect(workoutFormElement).toBeInTheDocument()
  })

  test('renders the WorkoutDetails component for each workout', () => {
    const workouts = [
      { _id: '1', name: 'Workout 1', exercises: [] },
      { _id: '2', name: 'Workout 2', exercises: [] },
    ]

    render(
      <AuthProvider>
        <WorkoutsProvider value={{ workouts }}>
          <Home />
        </WorkoutsProvider>
      </AuthProvider>
    )

    const workoutDetailsElements = screen.getAllByTestId('workout-details')
    expect(workoutDetailsElements).toHaveLength(workouts.length)
  })
})