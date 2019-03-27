FROM node:8.9.3-alpine

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

# Set a working directory
WORKDIR /app

# 安装npm yarn
RUN npm install -g npm@latest yarn@latest

# 输出版本
RUN node -v
RUN npm -v
RUN yarn -v

# 创建工作目录，对应的是应用代码存放在容器内的路径
WORKDIR /app

COPY package.json *.lock ./

# 只安装dependencies依赖
# node镜像自带yarn
RUN yarn --only=prod --registry=https://registry.npm.taobao.org

# 把其他源文件复制到工作目录
COPY . .

# 替换成应用实际的端口号
#EXPOSE ${app_port}

# 添加源代码
ADD . /app

# 运行app.js
CMD ["node", "/app/server/app.js"]
