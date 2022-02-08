<template>
  <div class="success">
    <img src="@/assets/icon_red_success.png" alt="">
    <h1>捐赠成功</h1>
    <span>您已完成支付</span>
  </div>
</template>

<script>
export default {
  name: "Success"
}
</script>

<style scoped>
  .success {
    text-align: center;
    background-color: #ebebeb;
  }

  .success img {
    margin-top: calc(2.7rem + 10vh);
    width: 50vw;
  }

  .success h1 {
    font-weight: normal;
    font-size: 17px;
  }

  .success span {
    font-size: 13.5px;
    color: #999999;
  }
</style>
