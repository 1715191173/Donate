<template>
  <div class="hisroryPage">

    <HistoryPageItem v-for="(item, index) in getData"
                     :key="item.id">
<!--      <img slot="pic" :src="item.donateItemImage1" alt="">-->
      <img slot="pic" :src="imgBaseUrl + item.donateItemImage1" alt="">
      <template #title>{{item.donateItemName}}</template>
      <template #msg>{{item.donateItemDsc}}</template>
<!--      <template #med>{{item.med}}</template>-->
      <template #rmb>{{item.donateAmounts}}</template>
      <template #time>{{item.donateTime.replace("T", " ")}}</template>
    </HistoryPageItem>

    <div class="noneItem clearfix">
      <span v-if="getData.length === 0">亲~您目前还没有捐赠过项目呢</span>
    </div>

  </div>
</template>

<script>
  import HistoryPageItem from "./HistoryPageItem";
  import {getHistory} from "../../api/api";
  export default {
    name: "HistoryPage",
    components: {HistoryPageItem},
    props: {
      path: String,
    },
    data() {
      return {
        getData: {},
        imgBaseUrl: this.Global.baseImgURL,//localhost:5050/
      }
    },
    methods: {
      getIndivMsg: function () {
        return this.$store.state.mainPageStore.indivMsg
      },
      getHistoryPageData() {
        console.log('获取历史记录数据');
        getHistory({
          SNO: this.getIndivMsg().data.User.SNO
          // SNO: "123456"
        }).then(res => {
          this.getData = res.data;
          console.log(res);
        }).catch(err => {
          console.log(err);
        })
      }
    },
    mounted() {
      this.getHistoryPageData()
    },
    activated() {
      this.getHistoryPageData()
    }
  }
</script>

<style>
  .hisroryPage{
    margin: 3.5rem 0.7rem 0.5rem;
  }

  .noneItem {
    display: inline-block;
    width: 100%;
    height: 1vh;
    text-align: center;
    color: #767676;
  }
</style>
