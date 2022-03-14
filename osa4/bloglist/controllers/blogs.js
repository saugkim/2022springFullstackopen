const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
  // await Blog.find({}).then(returned => {
  //   response.json(returned)
  // })
})

blogsRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(blog)
    } else {
      response.status(404).end()
    }
  } catch (exception) {
    next(exception)
  }

  // Blog.findById(request.params.id)
  //   .then(returned => {
  //     if (returned) {
  //       response.json(returned)
  //     } else {
  //       response.status(404).end()
  //     }
  //   })
  //   .catch(error => next(error))
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  if (!body.title || !body.url) {
    return response.status(400).end()
  }
  if (!body.likes) {
    body.likes = 0
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  })

  try {
    const saved = await blog.save()
    response.status(201).json(saved)
  } catch (exception) {
    next(exception)
  }

  // note.save()
  //   .then(saved => {
  //     response.status(201).json(saved)
  //   })
  //   .catch(error => next(error))
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch(exception) {
    next(exception)
  }
  // Blog.findByIdAndRemove(request.params.id)
  //   .then(() => {
  //     response.status(204).end()
  //   })
  //   .catch(error => next(error))
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  try {
    const updated = await Blog.findByIdAndUpdate(request.params.id, blog, { new:true })
    response.status(201).json(updated)
  } catch (exception) {
    next(exception)
  }
  // Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  //   .then(updated => {
  //     response.json(updated)
  //   })
  //   .catch(error => next(error))
})

module.exports = blogsRouter