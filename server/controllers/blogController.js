import Blog from "../models/blogModel.js";
import Comment from "../models/commentsModel.js";
import httpStatus from "http-status";
import _ from "lodash"
import {errorHandling} from "./validation.js";

export const createBlog = async (req, res) => {
  const blogData = req.body
  try {
    const newBlog = new Blog(blogData)
    let blog = await newBlog.save();
    res.status(httpStatus.CREATED).json(blog);
  } catch (error) {
    errorHandling(error, res)
  }
}

export const getBlogListByUser = async (req, res) => {
    let {userId} = req.params
    try {
      let blogs = await Blog.find({user: userId, active: true});
      res.status(httpStatus.ACCEPTED).json(blogs);
    } catch (error) {
      errorHandling(error, res)
    }
  }

  export const getBlogList = async (req, res) => {
    try {
      let blogs = await Blog.find({active: true}).populate({ path: 'user', select: 'firstName lastName' });
      res.status(httpStatus.ACCEPTED).json(blogs);
    } catch (error) {
      errorHandling(error, res)
    }
  }

  export const fetchBlog = async (req, res) => {
    let {id} = req.params
    try {
      let blog = await Blog.findById(id).populate({ path: 'user', select: 'firstName lastName' }).lean();
      if (_.isNull(blog)) {
        res.status(httpStatus.NOT_FOUND).json({error: 'Blog not found'});
        return;
      }
      const comments = await Comment.find({blog: blog._id},{comment:1}).populate({ path: 'user', select: 'firstName' })
      blog.comments = comments
      res.status(httpStatus.OK).json(blog);
    } catch (error) {
      errorHandling(error, res)
    }
  }
  
  export const updateBlog = async (req, res) => {
    let {id} = req.params
    let BlogData = {...req.body, updatedOn: Date.now()}
    try {
      let updateBlog = await Blog.findOneAndUpdate({_id: id}, {$set: {...BlogData}}, {new: true});
      if (_.isNull(updateBlog)) {
        res.status(httpStatus.NOT_FOUND).json({error: 'Blog not found'});
        return;
      }
      res.status(httpStatus.OK).json(updateBlog);
    } catch (error) {
      errorHandling(error, res)
    }
  }

  export const deleteBlog = async (req, res) => {
    let {id} = req.params
    try {
      let updateBlog = await Blog.findByIdAndUpdate(id, {$set: {active : false, updatedOn: Date.now()}}, {new: true});
      if (_.isNull(updateBlog)) {
        res.status(httpStatus.NOT_FOUND).json({error: 'Blog not found'});
        return;
      }
      res.status(httpStatus.OK).json(updateBlog);
    } catch (error) {
      errorHandling(error, res)
    }
  }

  export const addComment = async (req, res) => {
    const commentData = req.body
    try {
      const newComment = new Comment(commentData)
      let comment = await newComment.save();
      res.status(httpStatus.CREATED).json(comment);
    } catch (error) {
      errorHandling(error, res)
    }
  }

