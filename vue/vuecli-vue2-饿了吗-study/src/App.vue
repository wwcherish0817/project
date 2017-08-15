<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/comment">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/business">商家</router-link>
      </div>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>


<script>
  import Header from './components/header/header.vue'
  
  const AJAX_OK = 0;
  
  export default {
    data() {
      return {
        seller: {}
      }
    },
    name: 'app',
    components: {
      'v-header': Header
    },
    created() {
      this.$http.get('/api/seller').then((response) => {
        //response = response.json();
        //console.log(response);
        if (response.data.errno === AJAX_OK) {
          this.seller = response.data.data;
          console.log("/api/seller -- \n",this.seller);
        }
      }).catch((error) => {
        console.log(error);
      })
    }
  }
</script>

<style lang="scss" scoped="" type="text/css">
  @charset "UTF-8";
  @import './assets/scss/_base.scss';
  @import './assets/scss/lib/common';
  @import './assets/scss/lib/_view_set';
  .p1 {
    color: red;
    span {
      color: black;
    }
  }
  
  #app {
    @include d(14px);
    width: p(375px);
  }
  
  .tab {
    height: p(40px);
    line-height: p(40px);
    display: flex;
    .tab-item {
      flex: 1;
      text-align: center;
      a {
        display: block;
        color: #000;
        &.select {
          color: rgb(240, 20, 20);
        }
      }
    }
  }
</style>

