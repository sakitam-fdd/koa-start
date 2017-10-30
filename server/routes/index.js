const controller = require('../controller/index')
const Router = require('koa-router')

const childRouter = new Router()

childRouter.post('/login', controller.user.Login)
childRouter.post('/register', controller.user.Register)

module.exports = childRouter
