<template>
  <div class="login-panel">
    <el-row>
      <el-col :span="8" :offset="8">
        <div class="auth-login">
          <h1 class="login-title">登录</h1>
          <el-form
            :model="loginForm"
            ref="loginForm"
            class="auth-login-form">
            <el-form-item
              prop="username"
              :rules="rules.username">
              <el-input
                v-model="loginForm.username"
                :placeholder="'请输入用户名或者邮箱'"
              ></el-input>
            </el-form-item>
            <el-form-item
              prop="password"
              :rules="rules.password">
              <el-input
                type="password"
                v-model="loginForm.password"
                :placeholder="'请输入密码'"
                auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="记住密码">
              <el-switch v-model="delivery"></el-switch>
            </el-form-item>
            <el-button
              type="primary"
              class="submit-button"
              @click="submitForm('loginForm')">登录</el-button>
            <div class="login-form-more">
              <span class="register-button">没有账号? <i @click.stop="register()">注册</i></span>
              <span class="forget-password">忘记密码</span>
            </div>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import api from '../../store/api'
  export default {
    data () {
      return {
        loginForm: {
          username: '',
          password: ''
        },
        delivery: false,
        rules: {
          username: [
            {
              required: true,
              message: '请输入用户名或者邮箱',
              trigger: 'blur'
            }
          ],
          password: {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        }
      }
    },
    mounted () {
      api.wallpaper().then(res => {
        if (res['data']['success']) {
          document.querySelector('.login-panel').style.backgroundImage = 'url(\'https://cn.bing.com' + res['data']['data']['images'][0]['url'] + '\')'
        }
      })
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let opt = this.loginForm
            api.UserLogin(opt).then(({data}) => {
              if (!data.info) {
                this.$message({
                  type: 'info',
                  message: '账号不存在'
                })
              }
              if (data.success) {
                this.$message({
                  type: 'success',
                  message: '登录成功'
                })
                let redirect = decodeURIComponent(this.$route.query.redirect || '/')
                this.$router.push({
                  path: redirect
                })
              } else {
                this.$message({
                  type: 'info',
                  message: '密码错误'
                })
              }
            })
          } else {
            return false
          }
        })
      },
      register () {
        this.$router.push('/register')
      }
    },
    components: {
    }
  }
</script>
<style lang="scss">
  .login-panel {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    text-align: center;
    background-color: #141a48;
    background-image: url('https://cn.bing.com/az/hprichbg/rb/HallstattAustria_ZH-CN10534000934_1920x1080.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    overflow: hidden;
    .el-row {
      height: 100%;
      .auth-login {
        width: 400px;
        max-width: 100%;
        margin: 60px auto 0;
        padding: 50px 50px 30px;
        background-color: #fff;
        border-radius: 4px;
        box-shadow: 0 0 8px rgba(0,0,0,.1);
        vertical-align: middle;
        font-size: 1.167rem;
        box-sizing: border-box;
        .login-title {
          font-size: 1.5rem;
          margin: 0 0 2rem;
          font-family: -apple-system,PingFang SC,Hiragino Sans GB,Arial,Microsoft YaHei,Helvetica Neue,sans-serif;
          text-rendering: optimizeLegibility;
          color: #333;
        }
        .auth-login-form {
          input {
            padding: 10px;
            width: 100%;
            border: 1px solid #e9e9e9;
            border-radius: 2px;
            outline: none;
            box-sizing: border-box;
          }
          .submit-button {
            width: 100%;
            height: 3.334rem;
            color: #fff;
            background-color: #007fff;
            border-radius: 2px;
            outline: none;
            box-sizing: border-box;
            cursor: pointer;
          }
        }
        .el-switch {
          position: absolute;
          left: 70px;
          top: 8px;
        }
        .login-form-more {
          width: 100%;
          height: 3.334rem;
          line-height: 3.334rem;
          color: #8b9196;
          .register-button {
            margin-right: 120px;
            i {
              color: #007fff;
              cursor: pointer;
            }
          }
          .forget-password {
            color: #007fff;
            cursor: pointer;
          }
        }
      }
    }
  }
</style>
