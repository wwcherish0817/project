<template>
  <div id="app">
    
     <div>这是index-html</div>
     <indexa :uid="uid"></indexa>
  </div>
</template>

<script>
  import indexa from './indexa/indexa.vue'
  import libs from '../../assets/Lib'
  export default {
    name: 'app',
    data(){
      return{
        uid:libs.mytools.get_URL_query("uid")
      }
    },
    created(){

    },
    components: {
      indexa
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
