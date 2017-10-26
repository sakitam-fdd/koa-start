/**
 * Created by FDD on 2017/10/26.
 * @desc 应用
 */

const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const path = require('path')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors')
const compress = require('koa-compress')
const restc = require('restc')
// router
const Router = require('koa-router');
const index = require('./routes/index')
// 父路由
const router = new Router()
// error handler
onerror(app)
// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(path.join(__dirname, '../', 'dist')))
app.use(cors())
app.use(compress())
app.use(restc.koa2())
// logger
app.use(async (ctx, next) => {
  try {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
  } catch (error) {
    console.log(error)
  }
})

router.use('/api', index.routes(), index.allowedMethods())

app.use(router.routes()).use(router.allowedMethods())

module.exports = app
