<template>
  <div class="MainPage" path="MainPage">
    <img class="banner" src="@/assets/banner.png" alt="">
    <div class="record">
      <div class="record_inline">
        <div class="record_money">
          <span class="record_money_det">{{rec_money}}</span><br>
          <span>捐赠金额(元)</span>
        </div>
        <div class="record_number">
          <span class="record_number_det">{{rec_times}}</span><br>
          <span>捐赠人次</span>
        </div>
      </div>
    </div>

    <div class="mainPageItem">
      <MainPageItem v-for="(item, index) in mainData"
                    :key="index"
                    :id="index">
        <img class="pic1" slot="pic1" :src="imgBaseUrl + item.donateItemImage1" alt="">
        <template #title>{{item.donateItemName}}</template>
        <template #msg>{{item.donateItemDsc}}</template>
        <template #num>{{item.donateItemCounts}}</template>
      </MainPageItem>
    </div>

    <div class="noneItem">
      <span v-if="mainData.length === 0">亲~现在没有捐赠项目呢</span>
    </div>
  </div>
</template>
<script>
import MainPageItem from "./MainPageItem";
import {mapState, mapMutations, mapActions} from 'vuex';
import {getMainPage} from "../../api/api";
import axios from "axios";

export default {
  name: "MainPage",
  components: {
    MainPageItem
  },
  computed: {
    // 处理金额
    rec_money: function() {
      let to_str = (Math.floor(this.mainData.reduce((acc, cur) => acc + cur.donateItemAmount, 0) *100) / 100).toString()
      let arr = to_str.split('.')
      let arrPoint;
      if (arr.length === 2) {
        arrPoint = arr[1]
      } else {
        arrPoint = "00"
      }

      arr = arr[0].split('').reverse();

      let res = [];
      for (let i = 0; i < arr.length; i = i + 3) {
        if (i + 3 < arr.length) {
          res.push(arr.slice(i, i + 3));
        } else {
          res.push(arr.slice(i));
        }
      }
      res.forEach(function(item) {
        return item.length === 3 ? item.push(',') : item;
      })
      let result = [].concat.apply([], res).reverse();
      if (result[0] == ',')
        result.shift()
      // 拼接小数点后的数字
      let res_str = [result.join(''), '.', arrPoint].join('')
      return res_str
    },

    rec_times: function() {
      let to_str = this.mainData.reduce((acc, cur) => acc + cur.donateItemCounts, 0).toString()
      let arr = to_str.split('.')
      let arrPoint;
      if (arr.length === 2) {
        arrPoint = arr[1]
      } else {
        arrPoint = "00"
      }

      arr = arr[0].split('').reverse();

      let res = [];
      for (let i = 0; i < arr.length; i = i + 3) {
        if (i + 3 < arr.length) {
          res.push(arr.slice(i, i + 3));
        } else {
          res.push(arr.slice(i));
        }
      }
      res.forEach(function(item) {
        return item.length === 3 ? item.push(',') : item;
      })
      let result = [].concat.apply([], res).reverse();
      if (result[0] == ',')
        result.shift()
      // 拼接小数点后的数字
      let res_str = result.join('')
      return res_str
    }
  },
  data() {
    return {
      mainData: [
        // {
        // 	"donateItemID": 0,
        // 	"donateItemName": "",
        // 	"donateItemDsc": "",
        // 	"doanteItemDetail": "",
        // 	"donateItemAmount": 0,
        // 	"donateItemCounts": 0,
        // 	"donateItemTime": "",
        // 	"donateItemImage1": "",
        // 	"donateItemImage2": "",
        // 	"donateIsIsOpen": true
        // }
      ],
      ticket: '',
      imgBaseUrl: this.Global.baseImgURL,//http://localhost:5050/
      indivMsg: {},
    }
  },
  methods: {
    getQueryVariable(variable) {
      var query = window.location.search.substring(1);
      var vars = query.split("&");
      for(var i in vars) {
        var pair = vars[i].split("=");
        if(pair[0] == variable) {
          return pair[1];
        }
      }
      return false;
    },

    // 获取主页面数据
    getMainPageData() {
      getMainPage({}).then(res => {
        if (res.code == 0) {
          // 存放在本页面
          this.mainData = res.data;
          if (!this.mainData.donateItemAmount)
            this.mainData.donateItemAmount = 0
          if (!this.mainData.donateItemCounts)
            this.mainData.donateItemCounts = 0
          console.log(this.mainData);
          console.log(this.mainData.donateItemCounts);
          console.log(this.mainData.donateItemAmount);
          // 发送到vuex
          this.$store.commit('STORE_MainPageData', this.mainData)
        }
      }).catch(err => {
        console.log(err);
      })
    }
  },

  created() {
    // 获取ticket
    this.ticket = this.getQueryVariable("ticket");

    // ticket传给后端
    let params = new FormData()
    params.append('ticket', this.ticket)
    axios.post(
      'api/Front/getUser',//192.168.200.51:8888/
      params,
      {headers: {'Content-Type': 'multipart/form-data'}})
      .then(res => {
        this.indivMsg = res.data;
        console.log(this.indivMsg);
        this.$store.commit('STORE_IndivMsg', this.indivMsg)
      }).catch(err => {
      console.log('请求错误：' + err);
    })
  },

  mounted() {
    this.getMainPageData()
  },

  activated() {
    this.getMainPageData()
    // console.log("发送网络请求");
  }
}
</script>

<style scoped>
.MainPage {
  /*border:red solid 2px;*/
  margin: 3.3rem 0.5rem 0.5rem 0.5rem;
}

.banner{
  height: 100%;
  width: 100%;
  /*border:#4CD964 1px solid;*/
  margin-bottom:0.5rem;
  border-radius: 5px;
}
.record {
  background-color: #FFFFFF;
  height: 3.7rem;
  margin-bottom: 0.5rem;
  text-align: center;
  border-radius: 5px;
}
.record_inline{
  height: 1.4rem;
  padding-top: 0.7rem ;
}

.record_money{
  display: inline-block;
  line-height: 1.25rem;
  width: 50%;
  float: left;
  margin: auto;
  font-size: 0.8rem;
  color: #aeaeae;
  /*border: 1px solid red;*/
}

.record_number{
  display: inline-block;
  line-height: 1.25rem;
  width: 50%;
  float:right;
  font-size: 0.8rem;
  color: #aeaeae;
  /*border: 1px solid red;*/
}
.record_money_det{
  color:#FF5019;
  font-size: 1.25rem;
}
.record_number_det {
  color: #2165F4;
  font-size: 1.25rem;
}
.pic1 {
  /*width: 7rem;*/
  width: 116.5px;
  height: 92px;
}

.noneItem {
  position: relative;
  top: 2vh;
  width: 100%;
  text-align: center;
  color: #767676;
}
</style>
