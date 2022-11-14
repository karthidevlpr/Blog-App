import authRoutes from './authRoutes.js'
import blogRoutes from './blogRoutes.js'
import express from "express";
import request from "request";

const router = express.Router()

export default (app) => {

  app.use(router.all('/', async (req, res) =>  {

    try {
      res.send('API server for Blog Application')
    } catch (error) {
      res.send(error)
    }
  
  }));

  app.use(router.get('/testing', async (req, res) =>  {
    res.status(200).json({"Testing":"Testing"})
  }));

  app.use(router.all('/kubeapp', (req, res) => {
    request('http://localhost:3000', function (error, response, body) {
    console.error('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
    if(response && body){
    res.status(response.statusCode).json(body)
    }else{
      res.status(400).json("Error")
    }
  });
  }));

  // process.on('uncaughtException', err => {
  //   console.log(`Uncaught Exception: ${err.message}`)
  //   process.exit(1)
  // })

  app.use('/auth', authRoutes)
  app.use('/blog', blogRoutes)
}