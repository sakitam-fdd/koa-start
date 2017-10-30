const Koa = require('koa')
const http = require('http')
const convert = require('koa-convert')
const logger = require('koa-logger')
const cors = require('koa-cors') // 跨域
const onerror = require('koa-onerror') // 错误处理
// const resource = require('koa-static') // 静态资源托管
// 用来解析body的中间件，比方说你通过post来传递表单，json数据，或者上传文件，在koa中是不容易获取的，通过koa-bodyparser解析之后，在koa中this.body就能直接获取到数据
const bodyparser = require('koa-bodyparser')
const compress = require('koa-compress') // 处理压缩的中间件
// const restc = require('restc') // RESTful Web 服务通常可以通过自动客户端或代表用户的应用程序访问
// const path = require('path')
const routes = require('./routes')
const config = require('./config/config')
const app = new Koa()
onerror(app)
app.use(compress())
// app.use(restc.koa2())
app.use(convert(cors()))
app.use(convert(logger()))
// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
// app.use(resource(path.join(__dirname, '/'), {
//   index: 'views/index.html',
//   gzip: true
// }))
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

// routes
app.use(routes.routes(), routes.allowedMethods())
app.on('error', (error, ctx) => {
  console.log('错误' + JSON.stringify(ctx.onerror))
  console.log('server error:' + error)
})

http.createServer(app.callback()).listen(config.port).on('listening', function () {
  console.log('正在监听端口: http://localhost:' + config.port)
})

module.exports = app
