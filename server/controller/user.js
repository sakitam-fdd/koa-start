const pool = require('../db/db')
// 用于密码加密
const sha1 = require('sha1')
// createToken
const createToken = require('../middleware/createToken')

// 查询
const query = async (ctx, next) => {
  // 同步创建连接
  let connect = await pool.connect()
  const name = ctx.request.body.username
  try {
    // 同步等待结果
    await connect.query('Select * FROM koalogin WHERE name = $1', [name]).then(data => {
      ctx.status = 200
      ctx.body = {
        code: 200,
        success: true,
        data: data.rows[0] || []
      }
    }).catch(error => {
      ctx.status = 500
      ctx.body = {
        code: 500,
        success: false,
        data: error
      }
    })
  } finally {
    connect.release()
  }
}

// 登录
const Login = async (ctx, next) => {
  // 拿到账号和密码
  let username = ctx.request.body.username
  let password = sha1(ctx.request.body.password)
  let doc = await query(ctx, next)
  if (!doc) {
    ctx.status = 200
    ctx.body = {
      code: 200,
      success: true,
      data: false
    }
  } else if (doc.password === password) {
    // 生成一个新的token,并存到数据库
    let token = createToken(username)
    doc.token = token
    await new Promise((resolve, reject) => {
      doc.save((err) => {
        if (err) {
          reject(err)
        }
        resolve()
      })
    })
    ctx.status = 200
    ctx.body = {
      code: 200,
      success: true,
      data: {
        username,
        token, // 登录成功要创建一个新的token,应该存入数据库
        create_time: doc.create_time
      }
    }
  } else {
    ctx.status = 200
    ctx.body = {
      code: 200,
      success: true,
      message: '密码错误',
      data: false
    }
  }
}

// 注册
const Register = async (ctx) => {
  let connect = await pool.connect()
  try {
    const username = ctx.request.body.username
    const email = ctx.request.body.email
    const password = sha1(ctx.request.body.password) // 加密
    const token = createToken(username) // 创建token并存入数据库
    let doc = await query(username)
    if (doc) {
      ctx.status = 200
      ctx.body = {
        code: 200,
        success: true,
        message: '用户名已经存在',
        data: false
      }
    } else {
      // 同步等待结果
      await connect.query('INSERT INTO koalogin(username, email, password, token) VALUES($1::varchar, $2::varchar, $3::varchar, $4::varchar)', [username, email, password, token]).then(res => {
        return connect.query('Select * FROM koalogin WHERE username=$1', [username])
      }).then(res => {
        ctx.status = 200
        ctx.body = {
          code: 200,
          success: true,
          message: '用户名已经存在',
          data: res.rows[0] || {}
        }
      }).catch(error => {
        ctx.status = 500
        ctx.body = {
          code: 200,
          success: true,
          message: '服务器内部错误',
          data: error
        }
      })
    }
  } finally {
    connect.release()
  }
}

module.exports = {
  Login,
  Register
}
