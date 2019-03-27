const sha1 = require('sha1');
const pool = require('../db/db');
// 用于密码加密
// createToken
const createToken = require('../middleware/createToken');

// 查询
const query = async (ctx, next) => {
  // 同步创建连接
  const connect = await pool.connect();
  try {
    return new Promise(((resolve, reject) => {
      // 同步等待结果
      const name = ctx.request.body.username;
      connect.query('Select * FROM koalogin WHERE username=$1', [name]).then(data => {
        resolve({
          code: 200,
          success: true,
          data: data.rows[0] || [],
        });
      }).catch(error => {
        reject(error);
      });
    }));
  } finally {
    connect.release();
  }
};

// 登录
const Login = async (ctx, next) => {
  // 拿到账号和密码
  const connect = await pool.connect();
  try {
    const { username } = ctx.request.body;
    const password = sha1(ctx.request.body.password);
    const doc = await query(ctx, next);
    if (!doc.data) {
      ctx.status = 200;
      ctx.body = {
        code: 200,
        success: true,
        data: false,
      };
    } else if (doc.data.password === password) {
      // 生成一个新的token,并存到数据库
      const token = createToken(username);
      await connect.query('UPDATE koalogin SET token=$1 WHERE username=$2', [token, username]).then(res => connect.query('Select * FROM koalogin WHERE username=$1', [username])).then(res => {
        ctx.status = 200;
        ctx.body = {
          code: 200,
          success: true,
          data: res.rows[0] || {},
        };
      }).catch(error => {
        ctx.status = 200;
        ctx.body = {
          code: 200,
          success: true,
          message: error,
          data: false,
        };
      });
    } else {
      ctx.status = 200;
      ctx.body = {
        code: 200,
        success: true,
        message: '密码错误',
        data: false,
      };
    }
  } catch (error) {
    ctx.status = 200;
    ctx.body = {
      code: 200,
      success: false,
      message: error,
      data: false,
    };
  } finally {
    connect.release();
  }
};

// 注册
const Register = async (ctx, next) => {
  const connect = await pool.connect();
  try {
    const { username } = ctx.request.body;
    const { email } = ctx.request.body;
    const password = sha1(ctx.request.body.password); // 加密
    const token = createToken(username); // 创建token并存入数据库
    const doc = await query(ctx, next);
    if (doc.data && doc.data.username === username) {
      ctx.status = 200;
      ctx.body = {
        code: 200,
        success: true,
        message: '用户名已经存在',
        data: false,
      };
    } else {
      // 同步等待结果
      await connect.query('INSERT INTO koalogin(username, email, password, token) VALUES($1::varchar, $2::varchar, $3::varchar, $4::varchar)', [username, email, password, token]).then(res => connect.query('Select * FROM koalogin WHERE username=$1', [username])).then(res => {
        ctx.status = 200;
        ctx.body = {
          code: 200,
          success: true,
          message: '注册成功',
          data: res.rows[0] || {},
        };
      }).catch(error => {
        ctx.status = 500;
        ctx.body = {
          code: 200,
          success: true,
          message: '服务器内部错误',
          data: error,
        };
      });
    }
  } finally {
    connect.release();
  }
};

module.exports = {
  Login,
  Register,
};
