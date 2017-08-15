<template>
  <div class="cartcontrol">
       <transition name="move">
            <div class="cart-decrease" v-show="food.count>0" @click="decreaseCart($event)">-</div>
       </transition>
     
      <div class="cart-count"  v-show="food.count>0">{{food.count}}</div>
      <div class="cart-add" @click="addCart($event)">+</div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
  import { bus } from '../../bus.js'

  export default{
    props:{
        food:{
            type:Object
        }
    },
    created(){
        //console.log(this.food)
    },
    methods:{
        addCart(enent){
            if(!event._constructed){
                return;
            }
           
            if(!this.food.count){
                Vue.set(this.food,'count',1);
                //this.food.count = 1;
            }else{
                this.food.count++;
            }
            bus.$emit('cart-add',enent)
        },
        decreaseCart(event){
            if(!event._constructed){
                return;
            }
            if(this.food.count){
                this.food.count--;
            }
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


.cartcontrol{
   
    font-size:0;
    display: flex;
    vertical-align: top;
    .cart-decrease,.cart-count,.cart-add{
        display: inline-block;
        
    }
    .cart-count{
        @include d(14px);height: p(24px);line-height: p(24px);
        margin: 0px p(10px);color:rgb(147,153,159);
        width:p(15px);
        text-align: center;
    }
    .cart-decrease,.cart-add{
        height: p(24px);width: p(24px);text-align: center;line-height: p(18px);
        border-radius: 100%;border:2px solid #007DD2;
        box-sizing: border-box;
        @include d(18px);
    }
    .cart-add{
        background-color: #007DD2;
        color:#fff;
        z-index: 1;
    }
    .cart-decrease{
        transition: all 0.2s ;
        color:#007DD2;
        &.move-enter-active{
            transform: translate(59px, 0px) ;
            opacity: 1;
            transition-timing-function: linear;
        }
        &.move-enter{    
            opacity: 0;
        }
        &.move-leave-active{
            transform: translate(24px, 0px) ;
            transition-timing-function: linear;
        }
               
    }
}
</style>

