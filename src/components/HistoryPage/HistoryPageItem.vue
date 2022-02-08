<template>
  <div class="HistoryPageItem clearfix">
    <div>
      <slot name="pic">默认信息栏</slot>
    </div>
    <h2>
      <slot name="title">默认标题</slot>
    </h2>
    <div>
      <span class="text">
        <slot name="msg">默认信息栏</slot>
      </span>
    </div>
    <span class="method">
      <span name="med">一卡通支付</span>
      <span class="much">
        <span class="symbol">￥</span>
        <slot name="rmb">0</slot>
      </span>
    </span>
    <div class="tm">
      <slot name="time"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "HistoryPageItem",
  }
</script>

<style scoped>
  .HistoryPageItem {
    /*border: 2px blueviolet solid;*/
    height: 6rem;
    padding: 1.4rem 0.8rem 0 0.8rem;
    background-color: #FFFFFF;
  }

  .HistoryPageItem:first-child {
    /*border: 2px blueviolet solid;*/
    padding-top: .8rem;
    border-radius: 5px 5px 0 0;
  }

  /*.HistoryPageItem:last-child {*/
  /*  height: 15rem;*/
  /*}*/

  .HistoryPageItem:nth-last-child(2) {
    height: 8rem;
    border-radius: 0 0 5px 5px;
  }

  .HistoryPageItem h2 {
    padding: 0;
    font-weight: normal;
    font-size: 1.1rem;
    margin: 0 0 .2rem;
  }

  .HistoryPageItem img {
    float: left;
    width: 8.13rem;
    height: 6.4rem;
    margin-right: 0.9rem;
    /*border:1px solid red;*/
    border-radius: 5px;
  }

  .text {
    display: block;
    margin-bottom: 0.2rem;
    font-size: .8rem;
    color: #757575;

    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .method{
    margin-bottom: .2rem;
    display: block;
    font-size: .8rem;
    color: #494949;
  }

  .much {
    color: #FF5019;
  }

  .tm {
    font-size: .8rem;
    color: #949494;
  }

  .symbol {
    position: relative;
    left: 0.3rem;
  }

</style>
