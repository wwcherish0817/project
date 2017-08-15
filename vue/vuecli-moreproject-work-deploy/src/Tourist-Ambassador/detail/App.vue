<template>
  <div id="app">
    <img src="./images/logo.png">
    <div>详情内容</div>
    <detaila></detaila>
  </div>
</template>

<script>
  import detaila from './detaila/detaila.vue'
  export default {
    name: 'app',
    components: {
      detaila
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
