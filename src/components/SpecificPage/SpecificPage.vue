<template>
  <div>
    <!------------------------ 分界线 ------------------------------------------------>
    <div class="SpecificItem" @click="initDonate">
      <div class="mask" v-if="showMask"></div>
      <!----------------------- top部件  -------------------------------------->
      <!-- 特定项图片1 -->
      <div class="Spetop">
        <img class="SpeTopImg" :src="imgBaseUrl + getData[getPageId].donateItemImage1" alt="">
        <!-- 特定项捐赠金额 -->
        <div class="SpetopText">
          <div class="SpetopText1">
            <span>捐赠金额(元)</span>
            <span class="SpetopText2 donateValue">￥{{itemDonateValue}}</span>
          </div>
          <!-- 特定项捐赠人数 -->
          <div class="SpetopText1">
            <span>捐赠人次(次)</span>
            <span class="SpetopText2 donateCount">{{getData[getPageId].donateItemCounts}}</span>
          </div>
        </div>
      </div>

      <!---------------------- 中部部件 ---------------------------------------------->
      <!-- 中部标题 -->
      <div class="SpecificMid">
        <span class="MidTitle">{{getData[getPageId].donateItemName}}</span>
        <!-- 中部简介 -->
        <span class='MidMsg'>{{getData[getPageId].donateItemDsc}}</span>
      </div>

      <!--------------------- 底部部件 -------------------------------------->
      <!--项目介绍-->
      <div class="SpeBtm">
        <img class="SpeBtmImg" src="@/assets/icon_project.png" alt="">
        <span class='Title'>项目介绍</span>
        <!--底部标题-->
        <div>
          <div class="SpeBtmTit">{{getData[getPageId].donateItemName}}</div>
          <!-- 底部简介 -->
          <p class="SpeBtmText">{{getData[getPageId].donateItemDsc}}</p>
          <!-- 底部图片 -->
          <img class="SpeTopImg" :src="imgBaseUrl + getData[getPageId].donateItemImage2" alt="">

<!--           ⭐底部详情-->
<!--          <div class="article_content">{{getData[getPageId].doanteItemDetail}}</div>-->
<!--          <div class="maskImg">-->
<!--            <img src="@/assets/Mask.png" alt="">-->
<!--          </div>-->
          <collapse :default-height="50" ref="coll">
            <div>{{getData[getPageId].doanteItemDetail}}</div>
          </collapse>

          <div class="showMore" @click="showMore">
            {{showMoreStatus}}
          </div>
        </div>
      </div>
    </div>
    <!----------------- 立即捐款按钮 -------------------------->
    <div class="DonateNow DonateNowFir"  @click="showSecond" v-if="donateFir">
      <div>立即捐款</div>
    </div>

    <!--  输入捐赠金额  -->
    <div class="tl_donate_input" v-if="donateSec">
      <div class="donate_item1">
        <span>捐赠</span>
        <img src="../../assets/icon_close.png" alt="" @click="closeInputWindow">
      </div>
      <div class="donate_item2">
        <span>捐赠金额</span>
        <div class="inputValueBox">
          <input class="inputValue checkNum"
                 placeholder="请输入捐赠金额(元)"
                 ref="getValue"
                 @input="oninput">
        </div>
      </div>
      <div class="DonateNowBox">
        <div class="DonateNow">
          <div @click="submitButton">立即捐款</div>
        </div>
      </div>
    </div>
    <div class="placeholder"></div>
    <keyboard class="keyboard"
              @passwordData="getPassword"
              v-on:passwordData="receiveData"
              @closepassword="showPayPassword=false"
              v-if="donateThi">
    </keyboard>
  </div>
</template>

<script>
import Keyboard from "./Keyboard";
import collapse from "../Public/collapse";
import { Decimal } from 'decimal.js';
import {payFor} from "../../api/api";
import axios from "axios";
import Collapse from "../Public/collapse";

export default {
  name: "SpecificPage",
  components: {
    Collapse,
    Keyboard,
  },
  data() {
    return {
      imgBaseUrl: this.Global.baseImgURL,//http://localhost:5050/
      mainData: [
        {
          "donateItemID": 0,
          "donateItemName": "",
          "donateItemDsc": "",
          "doanteItemDetail": "",
          "donateItemAmount": 0,
          "donateItemCounts": 0,
          "donateItemTime": "",
          "donateItemImage1": "",
          "donateItemImage2": "",
          "donateIsIsOpen": true
          // id: 1,
          // title: '爱就是在"益"起',
          // msg1: '项目简介',
          // msg2:'项目详情',
          // //img1:,
          // //img2:
          // rec_money:898080980,
          // rec_times:767567567,
          // img1: '图片占位1',
          // img2: '图片占位2'
        },
      ],
      donateValue: Number,
      donateFir: true,
      donateSec: false,
      donateThi: false,
      donateItemTemp: '',
      donateItem: Number,
      showMask: false,
      password: String,

      isShowMore: true,
      showMoreTile: '查看全部',
    }
  },
  computed: {
    getData: function () {
      return this.$store.state.mainPageStore.pageData
    },
    getPageId: function () {
      return this.$store.state.mainPageStore.pageId
    },
    showMoreStatus: function() {
      if (this.isShowMore == false){
        this.showMoreTile = '收起'
      } else {
        this.showMoreTile = '查看全部'
      }

      return this.showMoreTile
    },
    itemDonateValue: function () {
      let to_str = (Math.floor(this.getData[this.getPageId].donateItemAmount *100) / 100).toString()
      let arr = to_str.split('.')
      let arrPoint;
      if (arr.length === 2) {
        if (arr[0] == 0)
          return to_str
        arrPoint = arr[1]
      } else {
        arrPoint = "00"
      }

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
      // return this.getData[this.getPageId].donateItemAmount
    },
  },
  methods: {
    initDonate() {
      if (this.donateSec === true) {
        this.donateFir = true
        this.donateSec = false
        this.showMask = false
      }
      if (this.donateThi === true) {
        this.donateFir = true
        this.donateThi = false
        this.showMask = false
      }
    },
    showSecond() {
      this.donateFir = !this.donateFir
      this.donateSec = !this.donateSec
      this.showMask = true
    },
    submitButton() {
      let donateValReg = /^(?!(0[0-9]*$))[0-9]+[.]*[0-9]*$/
      if (this.$refs.getValue.value !== '' &&               // 空值无法通过
          donateValReg.test(this.$refs.getValue.value) &&   // 正则表达式验证
          parseFloat(this.$refs.getValue.value) > 0) {      // 大于等于0验证

        this.donateValue = this.$refs.getValue.value
        this.$store.commit('STORE_DonateValue', this.donateValue)
        this.donateSec = !this.donateSec
        this.donateThi = !this.donateThi
        this.donateValue = this.$refs.getValue.value
      }
    },
    receiveData(text) {
      this.password = text;
    },
    closeInputWindow() {
      this.donateSec = false
      this.donateFir = true
      this.showMask = false
      this.donateThi = false;
    },
    oninput(e) {
      // 通过正则过滤小数点后两位
      if(e.target.value > 8)
        e.target.value = e.target.value.slice(0, 8)
      e.target.value = (e.target.value.match(/^\d*(\.?\d{0,2})/g)[0]) || null
      // console.log('e',e.target.value)
    },
    showMore() {
      // 调用collapse的方法
      this.isShowMore = !this.isShowMore
      this.$refs["coll"].handleControll()
    }
  },
  watch: {
    $route(from ,to) {
      if (from.name === "Fail" || from.name === "Success") {
        this.donateFir =  true
        this.donateSec = false
        this.donateThi = false
        this.showMask = false
      }
    }
  },
}
</script>

<style>
input {
  background: none;
  outline: none;
  border: none;
}

input:focus {
  border: none;
}
.Spetop{
  margin: 3.5rem 0.5rem 0.5rem 0.5rem;
  background-color: #ffffff;
  border-radius: 5px;
  /*border: red 1px solid;*/
}

.SpeTopImg{
  /*height: 9rem;*/
  width: 100%;
  /*border: 1px solid red;*/
  border-radius: 5px 5px 0 0;
}

.SpetopText{
  margin: 0 0 0 1rem;
  color: #D7D7D7;
  font-size: 0.8rem;
  font-family: "微软雅黑";
}
.SpetopText1{
  display: block;
}
.SpetopText2{
  position: relative;
  right: .2rem;
  color: coral;
  line-height: 1.6rem;
}

.SpecificMid{
  margin: 0rem 0.5rem 0.5rem 0.5rem;
  border-radius: 5px;
  padding: 0.8rem;
  background-color: #ffffff;
}

.MidTitle{
  display: block;
  font-family: "微软雅黑";
  font-size: 1rem;
  font-weight: 500;
}

.MidMsg{
  font-family: "微软雅黑";
  font-size: 0.8rem;
  color: #aeaeae;
  line-height: 1rem;

  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.SpeBtm{
  margin:0rem 0.5rem 0 0.5rem;
  padding: 0.8rem;
  border-radius: 5px;
  /*height: 41.5vh;*/
  font-size: 0.8rem;
  background-color: #FFFFFF;
}
.SpeBtmText{
  margin: 0 0 .3rem 0;
  padding: 0;
  color: #878686;

  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.Title{
  font-size: 1rem;
}
.article_content{
  margin-top: 0.2rem;
  margin-bottom: 0.2rem;
  color: #aeaeae;

  height: 8vh;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.read_more_btn{
  display: block;
  margin: 0.5rem;
  text-align: center;
  color: #FF7F50;
}


.SpeBtmImg{
  position: relative;
  top: .2rem;
  z-index: 1;
  width: 1.2rem;
  height: 1.2rem;
}

.SpeBtmTit{
  margin-top: .4rem;
  margin-bottom: .1rem;
  font-size: 0.8rem;
}

.DonateNow {
  height: 2.8rem;
  line-height: 2.8rem;
  margin: 1rem 6vw 5vh 6vw;
  text-align: center;
  background-color: #FF7F50;
  border-radius: 0.25rem;
  font-size: 1rem;
  font-weight: 500;
  color: #FFFFFF;
  z-index: 10;
}

.DonateNowFir {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 1rem .5rem 1vh .5rem;
}

.tl_donate_input{
  background-color: #FFFFFF;
  border-radius: 0.5rem 0.5rem 0 0;
  z-index: 100;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
}
.donate_item1{
  text-align: center;
  margin: 1rem;
}

.donate_item1 span {
  font-size: 1rem;
  font-weight: bold;
}

.donate_item1 img{
  width: 1rem;
  float: right;
  position: relative;
  top: .25rem;
}
.donate_item1 {
  text-align: center;
}

.donate_item2 span{
  display: block;
  float: left;
  margin: .5vw .5vw .5vw 6vw;
  font-size: 1rem;
}
.donate_item2 input{
  height: 2.8rem;
  /*margin-left:1.3rem;*/
  padding-left:1rem;
  font-size: 1rem;
  font-weight: 500;
  margin-top: 1.5vh;
}
.mask {
  position: fixed;
  background-color: rgba(0,0,0, .5);
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 50;
}

.maskImg {
  width: 100%;
  /*height: 2vh;*/
  position: relative;
  top: -1vh;
}

.keyboard {
  z-index: 1000;
}

.donateCount {
  position: relative;
  left: .5rem;
}

.donateValue {
  position: relative;
  left: .35rem;
}

.inputValueBox {
  flex: 1;
  margin: 2vh 6vw 2vh 6vw;

}

.inputValue {
  width: 95%;
  background-color: #F5F5F5 ;
  border-radius: 0.5rem;
}

.inputValue::-webkit-input-placeholder,
.inputValue::-moz-placeholder,
.inputValue:-moz-placeholder,
.inputValue:-ms-input-placeholder{
  /* placeholder字体大小 */
  font-size: 12px;
}

.inputValue::-webkit-outer-spin-button,input::-webkit-inner-spin-button{
  -webkit-appearance:none;
}

.inputValue[type="number"]{
  -moz-appearance: textfield;
}

/*.submitValue {*/
/*  position: absolute;*/
/*  top: 25.5rem;*/
/*  !*right: 23.7vw;*!*/

/*  margin: 0 5vw;*/
/*  width: 100%;*/
/*  height: 2rem;*/
/*  border-radius: .1rem;*/
/*  background-color: #FF7F57;*/
/*  color: white;*/
/*  text-align: center;*/
/*  z-index: 1000;*/
/*}*/

.submitValue span{
  margin: auto;
  display: block;
  font-size: .9rem;

  line-height: 2rem;
}

.donate_item2 {
  text-align: center;
}

.showMore {
  text-align: center;
  color: #FF7F57;
  /*margin-bottom: 6.5vh;*/
}

.placeholder {
  width: 100%;
  height: 9vh;
  /*background-color: #ebebeb;*/
}

</style>
