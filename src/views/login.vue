<template>
  <div>
    <el-input v-model="username"></el-input>
    <el-input v-model="password"></el-input>
    <el-button type="primary" @click="loginHandle">123</el-button>
  </div>
</template>
<script>
import {login} from '@/api/login.js'
export default {
  data () {
    return {
      username: '',
      password: '',
      url: this.$route.query.url
    }
  },
  methods: {
    loginHandle () {
      let query = {
        username: this.username,
        password: this.password,
        url: this.url
      }
      login(query).then(resp => {
        if (resp.data === 'success') {
          window.location.href = this.url
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>

</style>
