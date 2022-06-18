<template>
  <el-row style=" height:100%">
    <el-row>
      <el-col :span="24"><h1>用户登录</h1></el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        &nbsp;
      </el-col>
      <el-col :span="8">
        <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" class="demo-loginForm">
          <el-form-item label="用户名" prop="username" style="width:420px">
            <el-input v-model="loginForm.username" placeholder="请输入用户名" ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" style="width:420px">
            <el-input v-model="loginForm.password" placeholder="请输入密码" show-password > </el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="code" style="width:420px">
            <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width:220px;float: left"></el-input> <el-image :src="captchaImg" style="float: left;margin-left:2px;border-radius:4px"></el-image>
          </el-form-item>


          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="8">
      &nbsp;
      </el-col>
    </el-row>



  </el-row>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        code: '',
        tooken: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 4, max: 10, message: '长度在 4 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
        ,
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      },
      captchaImg: null
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/login',this.loginForm).then(result =>{
             const jwt=result.headers['authorization'];
             this.$store.commit('SET_TOKEN',jwt);
             this.$router.push('/index')

          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    getCaptchaImg(){
      this.$axios.post('/getCaptchaImg').then(result =>{
         console.log(result.data.data.tooken)
         this.loginForm.tooken = result.data.data.tooken;
         this.captchaImg = result.data.data.captchaImg;
      })
    }
  },
  created() {
    this.getCaptchaImg();
  }
}
</script>

<style scoped>

</style>
