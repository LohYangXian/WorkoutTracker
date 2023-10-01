const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../server.js");
require("dotenv").config();
const Workout = require('../../models/workoutModel.js')
// TODO: Create a separate database for testing

describe('Workout Controller', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  })

  afterEach(async () => {
    await mongoose.disconnect();
  });

  describe('GET /workouts', () => {
    it('should return all workouts for a specific user', async () => {
      const user_id = mongoose.Types.ObjectId()
      const workout1 = await Workout.create({title: 'Workout 1', load: '100', reps: '10', user_id})
      const workout2 = await Workout.create({title: 'Workout 2', load: '200', reps: '20', user_id})
      const workout3 = await Workout.create({title: 'Workout 3', load: '300', reps: '30', user_id})

      const res = await request(app)
        .get('/workouts')
        .set('Authorization', `Bearer ${user_id}`)

      expect(res.status).toBe(200)
      expect(res.body).toHaveLength(3)
      expect(res.body[0].title).toBe(workout3.title)
      expect(res.body[1].title).toBe(workout2.title)
      expect(res.body[2].title).toBe(workout1.title)
    })
  })

  describe('GET /workouts/:id', () => {
    it('should return a workout by ID', async () => {
      const user_id = mongoose.Types.ObjectId()
      const workout = await Workout.create({title: 'Workout 1', load: '100', reps: '10', user_id})

      const res = await request(app)
        .get(`/workouts/${workout._id}`)
        .set('Authorization', `Bearer ${user_id}`)

      expect(res.status).toBe(200)
      expect(res.body.title).toBe(workout.title)
      expect(res.body.load).toBe(workout.load)
      expect(res.body.reps).toBe(workout.reps)
    })

    it('should return a 404 error if the workout is not found', async () => {
      const user_id = mongoose.Types.ObjectId()
      const res = await request(app)
        .get(`/workouts/${mongoose.Types.ObjectId()}`)
        .set('Authorization', `Bearer ${user_id}`)

      expect(res.status).toBe(404)
      expect(res.body.error).toBe('No such workout')
    })

    it('should return a 404 error if the ID is invalid', async () => {
      const user_id = mongoose.Types.ObjectId()
      const res = await request(app)
        .get('/workouts/invalid_id')
        .set('Authorization', `Bearer ${user_id}`)

      expect(res.status).toBe(404)
      expect(res.body.error).toBe('No such workout')
    })
  })

  describe('POST /workouts', () => {
    it('should create a new workout', async () => {
      const user_id = mongoose.Types.ObjectId()
      const workoutData = {title: 'Workout 1', load: '100', reps: '10'}

      const res = await request(app)
        .post('/workouts')
        .send(workoutData)
        .set('Authorization', `Bearer ${user_id}`)

      expect(res.status).toBe(200)
      expect(res.body.title).toBe(workoutData.title)
      expect(res.body.load).toBe(workoutData.load)
      expect(res.body.reps).toBe(workoutData.reps)
      expect(res.body.user_id).toBe(user_id.toString())
    })

    it('should return a 400 error if any fields are missing', async () => {
      const user_id = mongoose.Types.ObjectId()
      const workoutData = {title: 'Workout 1', reps: '10'}

      const res = await request(app)
        .post('/workouts')
        .send(workoutData)
        .set('Authorization', `Bearer ${user_id}`)

      expect(res.status).toBe(400)
      expect(res.body.error).toBe('Please fill in all the fields')
      expect(res.body.emptyFields).toContain('load')
    })
  })

  describe('DELETE /workouts/:id', () => {
    it('should delete a workout by ID', async () => {
      const user_id = mongoose.Types.ObjectId()
      const workout = await Workout.create({title: 'Workout 1', load: '100', reps: '10', user_id})

      const res = await request(app)
        .delete(`/workouts/${workout._id}`)
        .set('Authorization', `Bearer ${user_id}`)

      expect(res.status).toBe(200)
      expect(res.body.title).toBe(workout.title)
      expect(res.body.load).toBe(workout.load)
      expect(res.body.reps).toBe(workout.reps)

      const deletedWorkout = await Workout.findById(workout._id)
      expect(deletedWorkout).toBeNull()
    })

    it('should return a 404 error if the workout is not found', async () => {
      const user_id = mongoose.Types.ObjectId()
      const res = await request(app)
        .delete(`/workouts/${mongoose.Types.ObjectId()}`)
        .set('Authorization', `Bearer ${user_id}`)

      expect(res.status).toBe(400)
      expect(res.body.error).toBe('No such workout')
    })

    it('should return a 404 error if the ID is invalid', async () => {
      const user_id = mongoose.Types.ObjectId()
      const res = await request(app)
        .delete('/workouts/invalid_id')
        .set('Authorization', `Bearer ${user_id}`)

      expect(res.status).toBe(404)
      expect(res.body.error).toBe('No such workout')
    })
  })

  describe('PUT /workouts/:id', () => {
    it('should update a workout by ID', async () => {
      const user_id = mongoose.Types.ObjectId()
      const workout = await Workout.create({title: 'Workout 1', load: '100', reps: '10', user_id})
      const updatedWorkoutData = {title: 'Updated Workout', load: '200', reps: '20'}

      const res = await request(app)
        .put(`/workouts/${workout._id}`)
        .send(updatedWorkoutData)
        .set('Authorization', `Bearer ${user_id}`)

      expect(res.status).toBe(200)
      expect(res.body.title).toBe(updatedWorkoutData.title)
      expect(res.body.load).toBe(updatedWorkoutData.load)
      expect(res.body.reps).toBe(updatedWorkoutData.reps)
    })

    it('should return a 404 error if the workout is not found', async () => {
      const user_id = mongoose.Types.ObjectId()
      const res = await request(app)
        .put(`/workouts/${mongoose.Types.ObjectId()}`)
        .set('Authorization', `Bearer ${user_id}`)

      expect(res.status).toBe(400)
      expect(res.body.error).toBe('No such workout')
    })

    it('should return a 404 error if the ID is invalid', async () => {
      const user_id = mongoose.Types.ObjectId()
      const res = await request(app)
        .put('/workouts/invalid_id')
        .set('Authorization', `Bearer ${user_id}`)

      expect(res.status).toBe(404)
      expect(res.body.error).toBe('No such workout')
    })
  })
})