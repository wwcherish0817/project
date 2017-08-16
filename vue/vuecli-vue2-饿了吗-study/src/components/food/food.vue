<template>
  <transition name="move">
    <div v-show="showFlag" class="food" ref="food">
        <div class="food-content">
           <div class="image-header">
             <img :src="food.image">
             <i @click="closefood">&lt;</i>
           </div>
           <div class="content">
             <h1 class="title">{{food.name}}</h1>
             <div class="detail">
               <span class="seel-count">月售{{food.sellCount}}份</span>
               <span class="rating">好评率{{food.rating}}%</span>
             </div>
             <div class="price">
                <span class="now">¥{{food.price}}</span>
                <span class="old" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
             </div>
             <div class="cartcontorl-wapper" v-show="food.count && food.count>0">
                <v-cartcontral :food="food"></v-cartcontral>
              </div>
              <div class="buy" v-show="!food.count || food.count==0" @click.stop.prevent="addFirst($event)">加入购物车</div>
           </div>
           <v-split></v-split>
           <div class="info" v-show="food.info">
             <h1 class="title">商品信息</h1>
             <p class="text">{{food.info}}</p>
           </div>
           <v-split></v-split>
           <div class="rating">
             <h1 class="title">商品评价</h1>
             <v-ratingselect 
             :desc="desc" 
             :onlyContent="onlyContent"
             :selectType="selctType"
             :ratings="food.ratings"
             ref="vratingselect"
             ></v-ratingselect>
             <div class="rating-wrapper">
               <ul class="" v-show="food.ratings && food.ratings.length">
                 <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item">
                   <div class="user">
                     <span class="name">{{rating.username}}</span>
                     <img class="avatar" width="12" height="12" :src="rating.avatar">
                   </div>
                   <div class="time">{{rating.rateTime | formateData}}</div>
                   <p class="text">
                     <span class="logo" :class="{'good':rating.rateType===0,'garbage':rating.rateType===1}">{{priviteMap[rating.rateType]}}</span>{{rating.text}}
                   </p>
                 </li>
               </ul>
               <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无平价</div>
             </div>
           </div>
        </div>
        
    </div>
  </transition>
  
</template>

 <script type="text/ecmascript-6">
  import BScroll from "better-scroll";
  import cartContral from '../cartcontrol/cartcontrol.vue'
  import split from '../split/split.vue'
  import ratingselect from '../ratingselect/ratingselect.vue'
  import Vue from 'vue'
  import {bus} from '../../bus'

  const POSITIVE = 0; //正向平价
  const NEGATIVE = 1; //反面平价
  const ALL = 2;  //所有评价

  export default{
    props:{
      food:{
        type:Object
      }
    },
    data(){
      return{
        showFlag:false,
        selctType:ALL,
        onlyContent:true,
        desc:{
            'all':'全部','positive':'推荐','negative':'吐槽'
        }
      }
    },
    filters:{
       formateData(time){
          let date = new Date(time);
          let dateStr = date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate()+'  '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
          return dateStr;
       }
    },
    created(){
      this.priviteMap = ['㊤','㊦'];
      let that = this;
      bus.$on('ratingselect.selecttype',function(val){
        that.selctType = val;
        that.refRatingList();

      })
      bus.$on('ratingselect.onlycontent',function(val){
        that.onlyContent = val;
        that.refRatingList();
      })
    },
    components:{
      'v-cartcontral':cartContral,
      'v-split':split,
      'v-ratingselect':ratingselect
    },
    methods:{
      refRatingList(){
        this.$nextTick(()=>{
          this.scroll.refresh();
        })
      },
      addFirst(_event){
        if(!_event._constructed){
             return;
          }
        Vue.set(this.food,"count",1);
      },
      show(){
        this.$refs.vratingselect.initSelectType(ALL);
        this.$refs.vratingselect.initOnlyContent(true);
        
        this.showFlag =true;
        this.$nextTick(()=>{
          if(!this.scroll){
            this.scroll = new BScroll(this.$refs.food,{
              click:true
            })
          }else{
            this.scroll.refresh();
          }
        })
        
      },
      closefood(){
        this.showFlag = false;
      },
      needShow(type,text){
        if(this.onlyContent && !text){
          return false;
        }
        if(this.selctType === ALL){
          return true;
        }else{
          return type === this.selctType;
        }

      }
    },
    
  }
</script>

<style lang="scss" scoped="" type="text/css">
  @charset "UTF-8";
  @import '../../assets/scss/_base.scss';
  @import '../../assets/scss/lib/common';
  @import '../../assets/scss/lib/_view_set';
  @import '../../assets/scss/mixin.scss';
  .food{
    position: fixed;
    left:0;top:0;
    bottom:p(48px);
    z-index: 30;
    width: 100%;
    background: #fff;

    &.move-enter-active {
      transition: all .3s ease;
    }
    &.move-leave-active {
      transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    &.move-enter, &.move-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
      transform: translateX(100%);
      opacity: 0;
    }

    .image-header{
      position: relative;
      width: 100%;
      height: 0;
      padding-top:100%;
      img{
        position: absolute;top:0;left:0;width: 100%;height: 100%;
      }
      i{
        @include d(40px);
        color:#fff;
        position: absolute;z-index: 1;left:0;top:0;
        padding:p(10px);
      }
    }
    .content{
      padding:p(18px);
      position: relative;
      .title{
        line-height: p(14px);@include d(14px);font-weight: 700;
        margin-bottom: p(8px);color:rgb(7,17,27);
      }
      .detail{
        height:p(10px);
        margin-bottom: p(18px);line-height: p(10px);font-size: 0;
        .seel-count,.rating{
          @include d(10px);color:rgb(147,153,159);
        }
        .seel-count{
          margin-right:p(12px);
        }
      }
      .price{
        font-weight: 700;
        line-height: p(24px);

        .now{
          @include d(14px);
          margin-right: p(8px);
          color:rgb(240,20,20);
        }
        .old{
          text-decoration: line-through;
          @include d(10px);
          color:rgb(147,153,159);
        }
      }
    }
    .cartcontorl-wapper{
        position: absolute;
        right:p(18px);bottom: p(18px);
    }
    .buy{
      position: absolute;right:p(18px);bottom:p(18px);
      z-index: 10;height: p(24px);line-height: p(24px);color:#fff;
      padding:0px p(12px);box-sizing: border-box;@include d(10px);
      border-radius: p(12px);background: rgb(0,160,220);
    } 
    .info{
      padding:p(18px);
      .title{
        line-height: p(14px);margin-bottom: p(6px);@include d(14px);color:rgb(7,17,27);
        font-weight: 700;
      }
      .text{
        line-height: p(24px);padding:0px p(8px);@include d(12px);color:rgb(77,85,93);
      }
    }
    .rating{
      padding-top: p(18px);
      .title{
        line-height: p(14px);margin-left: p(18px);@include d(14px);color:rgb(7,17,27);
        font-weight: 700;
      }
    }
    .rating-wrapper{
      padding:0px p(18px) p(20px);
      
      .rating-item{
        position: relative;
        padding:p(16px) 0px;
        border-bottom:1px solid rgba(7,17,27,0.1);
        .user{
          position: absolute;
          right:0;top:p(16px);font-size: 0;
          line-height: p(12px);
          .name{
            @include d(10px);vertical-align: top;color:rgb(147,153,159);
            margin-right:6px;
          }
          .avatar{
            border-radius: 50%;
          }
        }
        .time{
          line-height: p(12px);@include d(10px);color:rgb(147,153,159);
          margin-bottom: p(6px);
        }
        .text{
          line-height: p(16px);@include d(12px);color:rgb(7,17,27);
          .logo{
            line-height: p(16px);
            margin-right:p(6px);
            &.good{
              color:darkturquoise
            }
            &.garbage{
              color:darkred
            }
          }
        }
      }
      .no-rating{
        padding:p(16px) 0px;
        @include d(12px);
        color:rgb(147,153,159);
      }
    }
  }
</style>

