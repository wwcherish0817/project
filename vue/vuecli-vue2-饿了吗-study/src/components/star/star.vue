<template>
  <div class="start" :class="startType">
        <span v-for="items in itemClasss" :class="items" class="start-item"></span>
  </div>
</template>

 <script type="text/ecmascript-6">
  const LENGTH = 5;
  const CLS_ON = 'on';
  const CLS_HALF = 'half';
  const CLS_OFF = 'off';

  export default{
    props:{
        size:{
            type:Number
        },
        score:{
            type:Number
        }
    },
    computed:{
        startType(){
            return "star-"+this.size;
        },
        itemClasss(){
            let result = [];
            let score  = Math.floor(this.score *2) /2;
            let hasDec = score % 1 !==0 ;
            let integer = Math.floor(score);
            for(let i=0;i<integer;i++){
                result.push(CLS_ON);
            }
            if(hasDec){
                result.push(CLS_HALF);
            }
            while(result.length < LENGTH){
                result.push(CLS_OFF)
            }
            return result;
        }
    }
  }
</script>

<style lang="scss" scoped="" type="text/css">
    @charset "UTF-8";
    @import '../../assets/scss/_base.scss';
    @import '../../assets/scss/lib/common';
    @import '../../assets/scss/lib/_view_set';
    @import '../../assets/scss/mixin.scss';

    .start{
        font-size: 0;
        
        .start-item{
            display: inline-block;
            background-repeat: no-repeat;
        }
        &.star-48{
            .start-item{
                display: inline-block;
                width: p(20px);
                height: p(20px);
                margin-right: p(22px);
                background-size: p(20px) p(20px);
                &:last-child{
                    margin-right: 0;
                }
                &.on{
                    @include bg-img("./img/star48_on")
                }
                &.half{
                    @include bg-img("./img/star48_half")
                }
                &.off{
                    @include bg-img("./img/star48_off")
                }
            }  
        }         
        &.star-36
        {
            .start-item{
                width: p(15px);
                height: p(15px);
                margin-right: p(16px);
                background-size: p(15px) p(15px);
                &:last-child{
                    margin-right: 0;
                }
                &.on{
                    @include bg-img("./img/star36_on")
                }
                &.half{
                    @include bg-img("./img/star36_half")
                }
                &.off{
                    @include bg-img("./img/star36_off")
                }
            }  
        }   
        &.star-24
        {
            .start-item{
                width: p(10px);
                height: p(10px);
                margin-right: p(3px);
                background-size: p(10px) p(10px);
                &:last-child{
                    margin-right: 0;
                }
                &.on{
                    @include bg-img("./img/star24_on")
                }
                &.half{
                    @include bg-img("./img/star24_half")
                }
                &.off{
                    @include bg-img("./img/star24_off")
                }
            }  
        }   
        
    }
   
</style>

