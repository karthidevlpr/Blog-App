import Comment from "../models/commentsModel";
import httpStatus from "http-status";
import _ from "lodash"
import {errorHandling} from "./validation.js";

export const createComment = async (req, res) => {
  const commentData = req.body
  try {
    const newComment = new Comment(commentData)
    let comment = await newComment.save();
    res.status(httpStatus.CREATED).json(comment);
  } catch (error) {
    errorHandling(error, res)
  }
}

export const getCommentsByBlog = async (req, res) => {
    let {blogId} = req.params
    try {
      let comments = await Comment.find({blog: blogId});
      res.status(httpStatus.ACCEPTED).json(comments);
    } catch (error) {
      errorHandling(error, res)
    }
  }