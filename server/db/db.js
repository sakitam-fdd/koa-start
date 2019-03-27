/**
 * Created by FDD on 2017/10/27.
 * @desc 数据库连接
 */

const pg = require('pg');
const config = require('../config/config');

// 创建连接池
const pool = new pg.Pool(config.db);

module.exports = pool;
