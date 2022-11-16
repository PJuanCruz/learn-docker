const Post = require('../models/post-model');

const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.status(200).json({
      status: 'succes',
      data: { posts },
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ status: 'fail' });
  }
};

const getOnePost = async (req, res, next) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    res.status(200).json({
      status: 'succes',
      data: { post },
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ status: 'fail' });
  }
};

const createPost = async (req, res, next) => {
  const { title, body } = req.body;
  try {
    const post = await Post.create({ title, body });
    res.status(201).json({
      status: 'succes',
      data: { post },
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ status: 'fail' });
  }
};

const updatePost = async (req, res, next) => {
  const { id } = req.params;
  const { title, body } = req.body;

  try {
    const post = await Post.findByIdAndUpdate(
      id,
      { title, body },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: 'succes',
      data: { post },
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ status: 'fail' });
  }
};

const deletePost = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Post.findByIdAndDelete(id);
    res.status(200).json({
      status: 'succes',
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ status: 'fail' });
  }
};

module.exports = {
  getAllPosts,
  getOnePost,
  createPost,
  updatePost,
  deletePost,
};
