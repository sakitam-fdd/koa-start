const UserController = require('../controller/user')
const Router = require('koa-router')

const childRouter = new Router()

// checkToken作为中间件存在
const checkToken = require('../middleware/checkToken')

childRouter.post('/login', UserController.Login)
childRouter.post('/register', UserController.Register)

// 需要先检查权限的路由
childRouter.get('/user', checkToken, UserController.GetAllUsers)

module.exports = childRouter
