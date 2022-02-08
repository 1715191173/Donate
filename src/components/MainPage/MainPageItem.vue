<template>
  <div class="MainPageItem clearfix">
    <div>
      <slot name="pic1"></slot>
    </div>
    <h2>
      <slot name="title">默认标题</slot>
    </h2>
    <div class="msgText">
      <span>
      <slot name="msg">默认信息栏</slot>
    </span>
    </div>
    <span class="donate_pelnum">
      <div class="pelnum">
      <slot name="num">0</slot>
      </div>
      <span>人已捐</span>
    </span>
    <div class="itemBtn" @click="itemClickToSp">帮助TA</div>
  </div>
</template>

<script>

export default {
  name: "MainPageItem",
  props: {
    id: Number,
  },
  methods: {
    itemClickToSp() {
      let itemId = this.$store.state.mainPageStore.pageData[this.id].donateItemID
      this.$store.commit('STORE_ItemPage', this.id)
      this.$store.commit('STORE_ItemID', itemId)
      console.log(this.$store.state.mainPageStore.pageId);
      console.log(this.$store.state.mainPageStore.itemId);
      this.$router.push({
        name: 'AlumDonate',
      })
    }
  },
}
</script>

<style scoped>
  .MainPageItem {
    height: 6rem;
    padding: 0.8rem 0.8rem 0 0.8rem;
    background-color: #FFFFFF;
  }

  .MainPageItem:first-child {
    border-radius: 5px 5px 0 0;
  }

  .MainPageItem:last-child {
    border-radius: 0 0 5px 5px;
    padding-bottom: 1rem;
  }

  /*.MainPageItem:nth-last-child(2) {*/
  /*  padding-bottom: 1rem;*/
  /*}*/

  .MainPageItem img {
    float: left;
    /*border:1px solid red;*/
    margin-right: 0.6rem;
    border-radius: 5px;
  }
  .MainPageItem h2 {
    margin: 0;
    padding: 0;
    font-weight: normal;
    font-size: 1.1rem;
    color: #474747;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .msgText {
    /*position: relative;*/
    /*top: .3rem;*/
    /*margin-bottom: .2vh;*/
    /*height: 2.1rem;*/
    font-size: .8rem;
    color: #757575;
    display: block;
    /*overflow: hidden;*/

    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .donate_pelnum{
    position: relative;
    top: .2rem;
    font-size: 1rem;
    color: #494949;
  }
  .pelnum{
    display: inline-block;
    color: #FF5019;
    margin-top: 0.5rem;
  }
  .itemBtn {
    position: relative;
    top: .5rem;
    display: inline-block;
    width: 4rem;
    height: 1.2rem;
    padding: 0.2rem;
    border: 1px solid transparent;
    border-radius: 0.8rem;
    background-color: #FF7F57;

    color: white;
    text-align: center;
    font-size: 0.8rem;
    line-height: 1.2rem;

    cursor: pointer;
    float: right;
  }
</style>
