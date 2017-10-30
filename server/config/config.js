module.exports = {
  port: 8888,
  assets: 'assets',
  db: {
    user: 'postgres',
    database: 'koaexample',
    password: 'admin',
    port: 5432,
    // 扩展属性
    max: 20, // 连接池最大连接数
    idleTimeoutMillis: 5000 // 连接最大空闲时间 3s
  }
}
