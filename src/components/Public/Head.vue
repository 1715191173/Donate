<template>
  <div id="head">
    <img class="back" src="@/assets/icon_return.png" alt="" @click="backPrePage">
    <span>{{getTitle}}</span>
    <img class="history" @click="itemClick" v-if="isHistory" src="@/assets/icon_history.png" alt="">
  </div>
</template>

<script>

// import * as Cordova from "../../static/cordova";

export default {
  name: "Head",
  data() {
    return {
      titleList: ["爱心捐赠", "捐赠历史", "详情", "支付成功", "支付失败"],
      title: '',
    }
  },
  computed: {
    isHistory() {
      if (this.$route.name === "HistoryPage" ||
        this.$route.name === "Success" ||
        this.$route.name === "Fail" ||
        this.$route.name === "AlumDonate") {
        return false
      } else {
        return true
      }
    },
    getTitle() {
      // 控制标题
      if (this.$route.name === "MainPage") {
        this.title = this.titleList[0]
      }
      if (this.$route.name === "HistoryPage") {
        this.title = this.titleList[1]
      }
      if (this.$route.name === "AlumDonate") {
        this.title = this.titleList[2]
      }
      if (this.$route.name === "Success") {
        this.title = this.titleList[3]
      }
      if (this.$route.name === "Fail") {
        this.title = this.titleList[4]
      }

      return this.title;
    }
  },
  methods: {
    backPrePage() {
      if (this.$route.name === 'MainPage'){
        try {
          Cordova.exec(null, null, "SYNPlugin", "synCordovaPlugin", ["synjones.synpay.window.exit.app"]);
        } catch(err) {
          alert(err)
          alert(err.message);
          console.log(err)
          console.log(err.message);
        }
      } else {
        this.$router.go(-1);
      }
    },

    itemClick() {
      this.$router.push({name: 'HistoryPage'})
      // console.log(this.$router);
    }
  }
}
</script>

<style scoped>
  #head {
    display: flex;
    background-color: RGB(36, 87, 141);
    height: 2.7rem;
    position: fixed;
    /*占据整个屏幕宽度 left right*/
    left: 0;
    right: 0;
    top: 0;
    z-index: 1000;
  }

  #head span {
    margin: auto;
    position: relative;
    top: 50%; /*偏移*/
    transform: translateY(-50%);
    color: white;
    font-size: 1.15rem;
    line-height: 3rem;
  }

  .back {
    width: 1.3rem;
    height: 1.3rem;
    position: relative;
    top: 50%; /*偏移*/
    left: 0.5rem;
    transform: translateY(-50%);
  }

  .history {
    width: 1.3rem;
    height: 1.3rem;
    position: relative;
    top: 50%; /*偏移*/
    right: 0.6rem;
    transform: translateY(-50%);
  }

</style>
