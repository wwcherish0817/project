<template>
  <div class="header">
    <div class="content-wra">
      <div class="avater">
        <img width="64" height="64" :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="des">
          {{seller.description}}/{{seller.deliveryTime}}分钟
        </div>
        <div v-if="seller.supports" class="supports" >
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support_count" @click="showdetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i>></i>
      </div>
    </div>
    <div class="bullen" @click="showdetail">
      <span class="bullen_title"></span><span class="bullen_text">{{seller.bulletin}}</span><i>></i>
    </div>
    <div class="background">
      <img  :src="seller.avatar" width="100%">
    </div>
    <transition name="fade">
      <div v-show="detailshow" class="detail" >
        <div class="warpper">
          <div class="main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapp">
                <star :size="48" :score="seller.score"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul  v-if="seller.supports" class="supports">
              <li class="supports-item" v-for="(item,index) in seller.supports">
                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                <span class="text">{{seller.supports[index].description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class="ontent">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="hidedetail">X</div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from '../star/star';

  export default{
    props:{
      seller:{
        type:Object
      }
    },
    data(){
      return{
        detailshow:false
      }
    },
    methods:{
       showdetail:function(){
         this.detailshow = true;
       },
       hidedetail:function(){
         this.detailshow = false;
       }
    },
    created(){
      this.classMap = ['decrease','discount','guarantee','invoice','special'];
    },
    components:{
      star
    }
  }
</script>

<style lang="scss" scoped="" type="text/css">
  @charset "UTF-8";
  @import '../../assets/scss/_base.scss';
  @import '../../assets/scss/lib/common';
  @import '../../assets/scss/lib/_view_set';
  @import '../../assets/scss/mixin.scss';
  .header{
    color:#fff;
    overflow: hidden;
    position: relative;
    background-color: rgba(7,17,27,0.5);
    .content-wra{
      padding:p(24px) p(12px) p(18px) p(24px);
      display: flex;
      flex-direction:row;
      position: relative;
      .avater{vertical-align: top;
        img{
          border-radius: p(2px);
        }
      }
      .content{margin-left: p(14px);}
      .title{
        margin: p(2px) 0 p(0px) 0;
        display: flex;
        align-items :center;
        height: p(20px);
        .brand{
          width:p(30px);
          height: p(18px);
          margin-right:p(10px);
          display: inline-block;
          background-size: p(30px) p(18px);
          @include bg-img("./img/brand");
        }
        .name{
          @include d(16px);
          font-weight: bold;
        }
      }
      .des{
       padding:p(3px) 0px;
      }
      .supports{
        display: flex;
        height: p(15px);
        @include d(12px);
        align-items: center;
        .icon{
            display: inline-block;
            width: p(12px);
            height: p(12px);
            margin-right: p(2px);
            background-size: p(12px)  p(12px);
            background-repeat: no-repeat;
            &.decrease{
              @include bg-img("./img/decrease_1")
            }
            &.discount{
              @include bg-img("./img/discount_1")
            }
            &.guarantee{
              @include bg-img("./img/guarantee_1")
            }
            &.invoice{
              @include bg-img("./img/invoice_1")
            }
            &.special{
              @include bg-img("./img/special_1")
            }
        }
      }
      .support_count{
        position: absolute;
        right:p(12px);bottom:p(18px);
        padding:0px p(8px);
        height: p(24px);
        line-height: p(24px);
        border-radius: p(14px);
        background-color: rgba(0,0,0,0.2);
        text-align: center;
      }
    }
    .bullen{
      height: p(28px);
      line-height: p(28px);
      padding:0px p(22px) 0px p(12px);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      position: relative;
      background-color: rgba(7,17,27,0.2);
      i{
        position: absolute;
        right:p(12px);top:p(2px);
      }
      .bullen_title{
        display: inline-block;
        width: p(22px);height: p(12px);
        @include bg-img('./img/bulletin');
        background-size: p(22px) p(12px);
        
        vertical-align: top;margin-top: p(8px);
      }
      .bullen_text{
        @include d(10px);
        margin:0px p(4px);
        vertical-align: top;
      }
    }
    .background{
      position: absolute;
      top:0;left:0;width: 100%;height: 100%;
      z-index: -1;
      filter: blur(10px);
    }
    .detail{
      &.fade-enter-active, .fade-leave-active {
        transition: opacity .5s
      }
      &.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
        opacity: 0
      }
      backdrop-filter: blur(10px);
      position: fixed;
      top:0;left:0;
      width: 100%;height: 100%;
      z-index: 100;
      overflow: auto;
      background-color: rgba(7,17,27 , 0.8);

      .warpper{
        @extend %clearfix;
        min-height: 100%;
        width: 100%;
        .main{
          margin-top: p(64px);
          padding-bottom: p(64px);
          .name{
            display: block;
            @include d(16px);
            line-height: p(16px);
            text-align: center;
          }
        }
      }
      .detail-close{
        @include d(30px);
        text-align: center;
        position: relative;
        width: p(32px);
        height: p(32px);
        margin: p(-64px) auto 0px ;
        clear:both;
      }
      .star-wrapp{
        margin-top: p(18px);
        padding:p(2px) 0px;
        text-align: center;
      }
      .title{
        width: 80%;
        display: flex;
        margin: p(28px) auto p(24px) auto;
        .line{
          flex:1;
          position: relative;
          top:p(-6px);
          border-bottom: 1px solid rgba(255,255,255,0.2);
        }
        .text{
          padding:0px p(12px);
          font-weight: 700;
          @include d(14px);
        }
      }
      .supports{
        width: 80%;
        margin: 0 auto;
        .supports-item{
          padding:0px p(12px);
          margin-bottom: p(12px);
          font-size: 0;
          &:last-child{
            margin-bottom: p(0px);
          }
          .icon{
            display: inline-block;
            width: p(16px);
            height: p(16px);
            vertical-align: top;
            margin-right: p(16px);
            background-size: p(16px) p(16px);
            background-repeat: no-repeat;
            &.decrease{
              @include bg-img("./img/decrease_2")
            }
            &.discount{
              @include bg-img("./img/discount_2")
            }
            &.guarantee{
              @include bg-img("./img/guarantee_2")
            }
            &.invoice{
              @include bg-img("./img/invoice_2")
            }
            &.special{
              @include bg-img("./img/special_2")
            }
          }
          .text{
            @include d(12px);
            line-height: p(16px);
          }
        }
      }
      .bulletin{
        width: 80%;
        margin: 0 auto;
        .ontent{
          padding:0 p(12px);
          line-height: p(24px);
          @include d(12px);
        }
      }
    }
    
    
  }
</style>

