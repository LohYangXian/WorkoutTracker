const express = require('express')

const {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout
} = require('../controllers/workoutController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

/**
 * @typedef {Object} Workout
 * @property {string} _id - The ID of the workout.
 * @property {string} title - The title of the workout.
 * @property {number} load - The load of the workout.
 * @property {number} reps - The reps of the workout.
 * @property {string} userId - The ID of the user who created the workout.
 * @property {Date} createdAt - The date when the workout was created.
 * @property {Date} updatedAt - The date when the workout was last updated.
 */

/**
 * @typedef {Object} ErrorResponse
 * @property {string} message - The error message.
 */

/**
 * @typedef {Object} AuthenticatedRequest
 * @property {string} userId - The ID of the authenticated user.
 */


// require auth for all workout routes
router.use(requireAuth)

/**
 * @route GET /workouts
 * @description Get all workouts.
 * @access Private
 * @param {AuthenticatedRequest} req - The authenticated request object.
 * @returns {Promise<PaginatedResponse|ErrorResponse>} The paginated response or an error response.
 */
router.get('/', getWorkouts)

/**
 * @route GET /workouts/:id
 * @description Get a single workout by ID.
 * @access Private
 * @param {AuthenticatedRequest} req - The authenticated request object.
 * @param {string} req.params.id - The ID of the workout.
 * @returns {Promise<Workout|ErrorResponse>} The workout or an error response.
 */
router.get('/:id', getWorkout)

/**
 * @route POST /workouts
 * @description Create a new workout.
 * @access Private
 * @param {AuthenticatedRequest} req - The authenticated request object.
 * @param {object} req.body - The request body.
 * @param {string} req.body.title - The title of the workout.
 * @param {number} req.body.load - The load of the workout.
 * @param {numer} req.body.reps - The reps of the workout.
 * @param {string} userId - The ID of the user who created the workout.
 * @returns {Promise<Workout|ErrorResponse>} The created workout or an error response.
 */
router.post('/', createWorkout)

/**
 * @route DELETE /workouts/:id
 * @description Delete a workout by ID.
 * @access Private
 * @param {AuthenticatedRequest} req - The authenticated request object.
 * @param {string} req.params.id - The ID of the workout.
 * @returns {Promise<{message: string}>|ErrorResponse} The success message or an error response.
 */
router.delete('/:id', deleteWorkout)

/**
 * @route PATCH /workouts/:id
 * @description Update a workout by ID.
 * @access Private
 * @param {AuthenticatedRequest} req - The authenticated request object.
 * @param {string} req.params.id - The ID of the workout.
 * @param {string} req.body.title - The title of the workout.
 * @param {number} req.body.load - The load of the workout.
 * @param {numer} req.body.reps - The reps of the workout.
 * @param {string} userId - The ID of the user who created the workout.
 * @returns {Promise<Workout|ErrorResponse>} The updated workout or an error response.
 */
router.patch('/:id', updateWorkout)

module.exports = router