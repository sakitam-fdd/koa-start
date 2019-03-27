const request = require('axios');

module.exports = async (ctx, next) => {
  try {
    await request.get('https://cn.bing.com/HPImageArchive.aspx', {
      params: {
        format: ctx.query.format,
        idx: ctx.query.idx,
        n: ctx.query.n,
        nc: ctx.query.nc,
        pid: ctx.query.pid,
      },
    }).then((response) => {
      if (response.data) {
        ctx.status = 200;
        ctx.body = {
          code: 200,
          success: true,
          data: response.data,
        };
      } else {
        ctx.status = 200;
        ctx.body = {
          code: 200,
          success: true,
          data: {},
        };
      }
    }).catch((error) => {
      ctx.status = 500;
      ctx.body = {
        code: 500,
        success: true,
        data: error,
      };
    });
  } catch (e) {
    console.log(e);
  }
};
