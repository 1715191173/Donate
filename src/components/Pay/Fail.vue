<template>
  <div class="fail">
    <img src="@/assets/icon_red_fail.png" alt="">
    <h1>支付失败</h1>
    <span>{{this.$store.state.specificPageStore.errMsg}}</span>
  </div>
</template>

<script>
export default {
  name: "Fail"
}
</script>

<style scoped>
.fail {
  text-align: center;
  background-color: #ebebeb;
}

.fail img {
  margin-top: calc(2.7rem + 10vh);
  width: 50vw;
}

.fail h1 {
  font-weight: normal;
  font-size: 17px;
}

.fail span {
  font-size: 13.5px;
  color: #999999;
}
</style>
