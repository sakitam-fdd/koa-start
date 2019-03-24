<template>
  <div class="register-panel">
    <el-row>
      <el-col
        :span="8"
        :offset="8"
      >
        <div class="auth-register">
          <h1 class="register-title">
            注册
          </h1>
          <el-form
            ref="registerForm"
            :model="registerForm"
            class="auth-register-form"
          >
            <el-form-item
              prop="username"
              :rules="rules.username"
            >
              <el-input
                v-model="registerForm.username"
                :placeholder="'请填写用户名'"
              />
            </el-form-item>
            <el-form-item
              prop="email"
              :rules="rules.email"
            >
              <el-input
                v-model="registerForm.email"
                :placeholder="'请填写邮箱'"
              />
            </el-form-item>
            <el-form-item
              prop="password"
              :rules="rules.password"
            >
              <el-input
                v-model="registerForm.password"
                type="password"
                :placeholder="'密码'"
              />
            </el-form-item>
            <el-form-item
              prop="checkpassword"
              :rules="rules.checkpassword"
            >
              <el-input
                v-model="registerForm.checkpassword"
                type="password"
                :placeholder="'再次输入'"
              />
            </el-form-item>
            <el-button
              type="primary"
              @click="submitForm('registerForm')"
            >
              注册
            </el-button>
            <el-button @click="resetForm('registerForm')">
              重置
            </el-button>
            <div
              class="goto-login"
              @click="gLogin()"
            >
              已有账号登录
            </div>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import api from '../../store/api';

export default {
  components: {
  },
  data() {
    const validatePass = (rule, value, callback) => {
      // 6-16位, 数字, 字母, 字符至少包含两种, 同时不能包含中文和空格
      const reg = /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^[^\s\u4e00-\u9fa5]{6,16}$/;
      if (!reg.test(value)) {
        callback(new Error('密码长度需6-16位，且包含字母和字符'));
      } else {
        callback();
      }
    };
    const validatePassSample = (rule, value, callback) => {
      if (value === '') {
        callback();
      } else if (value && value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      registerForm: {
        username: '',
        email: '',
        password: '',
        checkpassword: '',
      },
      rules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur',
          },
        ],
        email: [
          {
            required: true,
            message: '请输入邮箱地址',
            trigger: 'blur',
          },
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: 'blur',
          },
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur',
          },
          {
            validator: validatePass,
            trigger: 'blur',
          },
        ],
        checkpassword: [
          {
            validator: validatePassSample,
            trigger: 'blur',
          },
        ],
      },
    };
  },
  mounted() {
    api.wallpaper().then(res => {
      if (res.data.success) {
        document.querySelector('.register-panel').style.backgroundImage = `url('https://cn.bing.com${res.data.data.images[0].url}')`;
      }
    });
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const opt = this.registerForm;
          api.userRegister(opt).then(({ data }) => {
            if (data.success) {
              this.$message({
                type: 'success',
                message: '注册成功，请登录',
              });
              this.$router.push('/login');
            } else {
              this.$message({
                type: 'info',
                message: '此账户已存在',
              });
            }
          }).catch((err) => {
            console.log(err);
          });
        }
        return false;
      });
    },
    gLogin() {
      this.$router.push('/login');
    },
  },
};
</script>
<style lang="scss">
  .register-panel {
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
      .auth-register {
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
        .register-title {
          font-size: 1.5rem;
          margin: 0 0 2rem;
          font-family: -apple-system,PingFang SC,
          Hiragino Sans GB,Arial,Microsoft YaHei,Helvetica Neue,sans-serif;
          text-rendering: optimizeLegibility;
          color: #333;
        }
        input {
          padding: 10px;
          width: 100%;
          border: 1px solid #e9e9e9;
          border-radius: 2px;
          outline: none;
          box-sizing: border-box;
        }
        button {
          width: 44%;
          height: 3.334rem;
          color: #fff;
          background-color: #007fff;
          border-radius: 3px;
          outline: none;
          box-sizing: border-box;
          cursor: pointer;
        }
        .goto-login {
          margin-top: 10px;
          width: 100%;
          height: 3.334rem;
          line-height: 3.334rem;
          color: #007fff;
          cursor: pointer;
        }
      }
    }
  }
</style>
