<template>
  <div class="self-container">
    <el-form class="card-box login-form"
             ref="loginForm"
             :model="loginModel"
             :rules="loginRules"
             label-position="left"
             label-width="0px">
      <h3 class="self-title">后台管理系统</h3>
      <el-form-item prop="username">
        <el-input v-model="loginModel.username"
                  auto-complete="on" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginModel.password"
                  auto-complete="on"
                  type="password"
                  @keyup.enter.native="doLogin" />
      </el-form-item>
      <el-form-item>
        <el-button style="width: 100%;"
                   type="primary"
                   :loading="isBtnLoading"
                   @click.native.prevent="doLogin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      loginModel: {
        username: 'admin',
        password: '123456'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
        password: [{ required: true, trigger: 'blur', message: '请输入密码' }]
      },
      isBtnLoading: false
    }
  },
  methods: {
    doLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.isBtnLoading = true
          this.$store.dispatch('aLogin', this.loginModel).then(() => {
            this.isBtnLoading = false
            this.$message.success('登录成功')
            this.$router.push('/')
          }).catch(error => {
            this.isBtnLoading = true
            console.log('Login.vue:', error)
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.self-container {
  .login-form {
    width: 400px;
    left: 0;
    right: 0;
    margin: 120px auto;
  }
}
</style>
