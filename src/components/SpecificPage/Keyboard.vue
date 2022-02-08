<template>
  <div class="pay-tool">
    <div class="pay-tool-top">
    <div class="pay-tool-title border-bottom">
      <span class="pay-close" @click="backHandle"></span>
      <span class="pay-title">请输入查询密码</span>
      <img src="@/assets/icon_close.png" alt="" @click="closeWindow">
    </div>
    <div class="pay-tool-content">
      <div class="pay-tool-inputs">
        <div class="item" v-for="(i, index) in items" :key="index">
          <span class="icon_dot" v-if="password[i]"></span>
        </div>
      </div>
<!--      <div class="pay-tool-link">-->
<!--        <div class="link" @click="forgotPassword()">忘记密码？</div>-->
<!--      </div>-->
      </div>
    <div class="submitValue" @click="submit">
      <span>确认</span>
    </div>
    </div>
    <div class="pay-tool-keyboard">
      <ul>
        <li @click="keyUpHandle($event, index)" v-for="(val, index) in keys" :key="index">
          {{ val }}
        </li>
        <li class="del" @click="delHandle"><span class="icon-del">删除</span></li>
      </ul>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import specificPageStore from "./index";

const keys = () => [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0]
export default {
  name: 'sendValue',
  data () {
    return {
      items: [0, 1, 2, 3, 4, 5],
      keys: keys(),
      password: '',
      errMsg: '',
    }
  },
  props: ['donateValue'],
  methods: {
    backHandle () { // 关闭密码输入
      this.clearPasswordHandle()  // 返回时清除password
      this.$emit('closepassword') // 返回上级
    },
    forgotPassword () { // 忘记密码
      // this.$router.push({path:'/changepassword/forgot'}) // 这里跳转忘记密码页
    },
    keyUpHandle (e, index) { // 更新密码
      // let text = e.currentTarget.innerText
      // console.log(this.keys[index].toString())
      let text = this.keys[index].toString()
      let len = this.password.length
      if (!text || len >= 6) return
      this.password = this.password + text
      this.passwordData() // 为6位输出密码
    },
    delHandle () { // 删除密码
      if (this.password.length <= 0) return false
      // this.password.shift()
      this.password = this.password.substring(0, this.password.length-1)
    },
    passwordData () { // 输出密码
      // console.log(parseInt(this.password.join(' ').replace(/\s/g, '')))
      // console.log(this.password)
      this.$emit('passwordData', this.password)
    },
    clearPasswordHandle: function () { // 清空密码
      this.password = ''
    },
    getIndivMsg: function () {
      return this.$store.state.mainPageStore.indivMsg
    },
    submit: function() {
      if (this.password.length === 6) {
        // 发送数据到后端
        console.log(this.password);
        let params = new FormData()
        params.append('SNO', this.getIndivMsg().data.User.SNO)
        params.append('tranamt', this.$store.state.specificPageStore.donateValue)
        params.append('pwd', this.password)
        params.append('remark', "一卡通支付")
        params.append('attach', "")
        params.append('donateItemID', this.$store.state.mainPageStore.itemId)
        params.append('type', "0")

        axios.post(
          'api/Front/Pay',////http:192.168.200.51:8888/
          params,
          {headers: {'Content-Type': 'Content-Type: multipart/form-data'}})
          .then(res => {
            console.log('已发送数据');
            this.donateFir = true
            this.donateSec = false
            this.donateThi = false
            this.showMask =  false
            if (res.data.code == 0 ) {
              this.$router.push({
                name: 'Success',
              })
            } else {
              this.errMsg = res.data.msg;
              this.$store.commit('STORE_ErrMsg', this.errMsg)
              this.$router.push({
                name: 'Fail',
              })
            }
            console.log(res);
          })
          .catch(err => {
            this.donateFir =  true
            this.donateSec = false
            this.donateThi = false
            this.showMask =  false
            console.log(err);
          })
        // payFor({
        //   SNO: "18063204",
        //   NAME: "张三",
        //   tranamt: this.donateValue,
        //   pwd: password,
        //   remark: "aa",
        //   attach: "aaa",
        //   donateItemID: this.$store.state.mainPageStore.pageId,
        //   type: 0
        // }).then(res => {
        //   console.log(res);
        // }).catch(err => {
        //   console.log(err);
        // })

      }
    },
    closeWindow() {
      this.$parent.closeInputWindow();
    }

  },
}
</script>

<style lang="less" scoped>
.pay-tool-top{
  width: 16rem;
  height: 10rem;
  margin: auto;
  padding: 0.6rem 1rem 1rem 1rem;
  background-color: #FFFFFF;
  border-radius: .4rem;
  position: fixed;
  left: 0;
  right: 0;
  top: 30vh;
  //border: 1px solid red;
}
.pay-tool {
  font-size: .45rem;
  position: fixed;
  width: 100%;
  height: 12rem;
  background-color: #fff;
  overflow: hidden;
  bottom: 0;
  &-title {
    width: 100%;
    height: 1.6rem;
    border-bottom: 1px solid #f7f7f7;
    margin-bottom: 1rem;
    line-height: .9rem;
    text-align: center;
    overflow: hidden;
    position: relative;
    .pay-close {
      // float: left;
      font-size: .35rem;
      position: absolute;
      // background: url('../../../../static/images/icon/close.png') no-repeat center center; // 这里添加一个关闭icon
      background-size: 50%;
      display: inline-block;
      width: 1rem;
      height: .9rem;
      left: 0;
    }
    .pay-title {
      font-size: .9rem;
      color: #323333;
    }
  }
  &-content {
    .pay-tool-inputs {
      width: 16rem;
      height: 2.5rem;
      margin: auto auto;
      border: 1px solid #E5E5E5;
      border-radius: 5px;
      box-shadow: 0 0 1px #e6e6e6;
      display: flex;
      .item {
        width: 3rem;
        height: 2.5rem;
        border-right: 1px solid #E5E5E5;
        line-height: 2.5rem;
        text-align: center;
        &:last-child {
          border-right: none;
        }
        .icon_dot {
          display: inline-block;

          width: .65rem;
          height: .65rem;
          background: #323333;
          border-radius: .65rem;
          background-size: cover;
        }
      }
    }
    .pay-tool-link {
      padding: 0.53333333rem 0.8rem 0;
      text-align: right;
      .link {
        font-size: 0.26rem;
        color: #3c8cfb;
      }
    }
  }
  .pay-tool-keyboard {
    position: absolute;
    left: -3.3em;
    bottom: 0;
    width: 100%;
    ul {

      width: 100%;
      display: flex;
      flex-wrap: wrap;
      li {
        list-style-type: none;
        width: 33%;
        height: 2rem;
        line-height: 2rem;
        text-align: center;
        border-right: 1px solid #aeaeae;
        border-bottom: 1px solid #aeaeae;
        font-size: 0.8rem;
        font-weight: 500;
        &:nth-child(1), &:nth-child(2), &:nth-child(3) {
          border-top: 1px solid #eee;
        }
        &:nth-child(3), &:nth-child(6), &:nth-child(9), &:nth-child(12) {
          border-right: none;
        }
        &:nth-child(10), &:nth-child(11), &:nth-child(12) {
          border-bottom: none;
        }
        &:nth-child(10), &:nth-child(12), &:active {
          background-color: #d1d4dd;
        }
        &:nth-child(12):active {
          background-color: #fff;
        }
      }
      .del{
        .icon-del{

          line-height: 2rem;
          display: block;
        }
      }
    }
  }

  .submitValue {
    position: relative;
    top: 4vh;
    width: 100%;
    height: 2.3rem;
    border-radius: .1rem;
    background-color: #FF7F57;
    color: white;
    text-align: center;
    line-height: 2.3em;
    z-index: 1000;
  }

  .pay-tool-keyboard {
    font-size: .8rem;
  }

  .pay-tool-title img{
    float: right;
    width: 1rem;
  }
}
</style>
