import authRoutes from './authRoutes.js'
import blogRoutes from './blogRoutes.js'
import express from "express";

const router = express.Router()

export default (app) => {

  app.use(router.all('/', (req, res) => {
    res.send('API server for Blog App')
  }));

  app.use('/auth', authRoutes)
  app.use('/blog', blogRoutes)
}