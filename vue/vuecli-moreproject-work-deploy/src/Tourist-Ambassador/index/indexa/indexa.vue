<template>
  <div class="indexa" @click="test1">这是index-a的内容</div>
</template>

<script type="text/ecmascript-6">
  export default{
    props:{
       uid:{
         type:String
       }
    },
    methods:{
      test1:function(){
          console.log("this.uid:",this.uid);
          this.$http.get('/married/current.do').then((response) => {
          //response = response.json();
          //console.log(response);
          console.log(response)
          window.alert(response.data.data.list[0].curday)
        }).catch((error) => {
          console.log(error);
        })
      }
    }
  }
</script>

<style lang="scss" scoped="" type="text/css">
  @charset "UTF-8";
  @import '../../../assets/scss/_base.scss';
  @import '../../../assets/scss/lib/common';
  @import '../../../assets/scss/lib/_view_set';

  .indexa{
    color:red;
    @include d(24px);
  }
</style>

