import express from "express";
import httpStatus from "http-status";
import auth from "../auth.js";
import {
  createBlog, getBlogListByUser, getBlogList, fetchBlog, updateBlog, deleteBlog, addComment
} from "../controllers/blogController.js";
const router = express.Router()

router.post('/', auth, createBlog);
router.get('/user/:userId', auth, getBlogListByUser);
router.get('/', auth,  getBlogList);
router.get('/:id', auth, fetchBlog);
router.put('/:id', auth, updateBlog);
router.patch('/:id/delete', auth, deleteBlog);
router.post('/addComment', auth, addComment);



export default router