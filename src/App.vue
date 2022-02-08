<template>
  <div id="app">
    <Head></Head>
    <keep-alive>
      <router-view>
        <MainPage></MainPage>
        <SpecificPage path="/AlumDonate"></SpecificPage>
        <Head path="/Head"></head>
        <HistoryPage path="/HistoryPage"></HistoryPage>
      </router-view>
    </keep-alive>
  </div>
</template>

<script>
  import MainPage from "./components/MainPage/MainPage";
  import SpecificPage from "./components/SpecificPage/SpecificPage";
  import Head from "./components/Public/Head";
  import HistoryPage from "./components/HistoryPage/HistoryPage";

  export default {
    name: 'App',
    components: {
      Head,
      MainPage,
      SpecificPage,
      HistoryPage,
    },
    // 监听路由变化
    watch: {
      $route(to,from){

      }
    },
  }
</script>

<style>
  @import "assets/public.css";

  body {
    margin: 0;
    padding: 0;
  }

  #app {
    background-color: #ebebeb;
  }

  head {
    z-index: 100;
  }
</style>
