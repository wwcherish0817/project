<template>
<div>
    <div class="shopcart">
        <div class="content" @click="toggleList">
        <div class="content-left">
            <div class="logo-wapper">
                <div class="logo " :class="{'hight':totalCount>0}" >
                    <span></span>
                </div>
                <div v-show="totalCount>0" class="num">{{totalCount}}</div>
            </div>
            <div class="price" :class="{'hight':totalCount>0}">{{totprice}}元</div>
            <div class="desc">另需配送费{{deliveryPrice}}元</div>
        </div>
        <div class="content-right" @click.stop.prevent="pay">
            <div class="pay" :class="payClass">
                {{payDesc}}
            </div>
        </div>
    </div>
    <transition name="fold"> 
        <div class="shopcart-list" v-show="listShow" v-bind:style="{top:setTop+'px'}">
            <div class="list-header">
                <h1 class="title">购物车</h1>
                <span class="emtry" @click="clearnSelectGoods">清空</span>
            </div>
            <div class="list-content" ref="listcount">
                <ul class="">
                    <li v-for="food in selectFoods">
                        <span class="name">{{food.name}}</span>
                        <div class="price">
                            <span>{{food.price*food.count}}元</span>
                        </div>
                        <div class="cartcontrol-wapper">
                            <v-cartcontrol :food="food"></v-cartcontrol>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </transition>
    </div>
    <div class="lis-mark" v-show="listShow" @click="hideList"></div>
</div>

  
</template>

 <script type="text/ecmascript-6">
  import cartcontrol from '../cartcontrol/cartcontrol.vue';
  import BScroll from "better-scroll";
  export default{
    data(){
        return {
            balls:[
                {
                show:false
                },
                {
                show:false
                },
                {
                show:false
                },
                {
                show:false
                },
                {
                show:false
                }
            ],
            dropBall:[],
            fold:true
        }
    },
    props:{
        selectFoods:{
            type:Array,
            default(){
                return [
                   //{price:1,count:1}
                ];
            }
        },
        deliveryPrice:{
            type:Number,
            default:0
        },
        minPrice:{
            type:Number,
            default:0
        }
    },
    computed:{
        setTop(){
            let height = this.selectFoods.length * 48;
            if(height > 217){
                height = 217;
            } 
            height += 56;
            return -height;
        },
        totprice(){
            let total = 0;
            this.selectFoods.forEach(function(element) {
                total += element.price * element.count
            }, this);
            return total;
        },
        totalCount(){
            let count = 0;
            this.selectFoods.forEach(function(element) {
                count +=  element.count
            }, this);
            return count;
        },
        payDesc(){
            if(this.totprice === 0){
                return `${this.minPrice}元起送`;
            }else if(this.totprice < this.minPrice){
                return `还差${this.minPrice-this.totprice}起送`
            }else if(this.totprice>= this.minPrice){
                return "去结算"
            }
        },
        payClass(){
            if(this.totprice < this.minPrice){
                return 'not-enough'
            }else{
                return  'enough';
            }
        },
        listShow(){
            if(!this.totalCount){
                this.fold = true;
                return false;
            }
            let  show = !this.fold;
            if(show){
                this.$nextTick(()=>{
                    if(!this.sccrol){
                        this.sccrol = new BScroll(this.$refs.listcount,{
                            click:true
                        });
                    }else{
                        this.sccrol.refresh();
                    }
                    
                })
            }
            return show;
        }
    },
    components:{
      'v-cartcontrol':cartcontrol
    },
    methods:{
        pay(){
            if(this.totprice<this.minPrice){
                return;
            }
            window.alert(`支付${this.totprice}元`);
        },
        hideList(){
            this.fold = true;
        },
        clearnSelectGoods(){
            this.selectFoods.forEach((food)=>{
                food.count = 0;
            })
        },
        toggleList(){
            if(!this.totalCount){
                return;
            }else{
                this.fold = !this.fold;
            }
        },
        
        drop(_el){
            for(let i=0;i<this.balls.length;i++){
                let ball = this.balls[i];
                if(!ball.show){
                    ball.show = true;
                    ball.el = _el;
                    this.dropBall.push(ball);
                    return;
                }
            }
        },
        
    }
  }
</script>

<style lang="scss" scoped="" type="text/css">
  @charset "UTF-8";
  @import '../../assets/scss/_base.scss';
  @import '../../assets/scss/lib/common';
  @import '../../assets/scss/lib/_view_set';
  @import '../../assets/scss/mixin.scss';
  @import './font-icon/iconfont.css';

  .shopcart{
      position: fixed;
      left:0;
      bottom:0;
      z-index: 50;
      width: 100%;
      height: p(48px);
      
      .content{
          height: 100%;
          display: flex;
          background-color: #141d27;
          font-size: 0;
          .content-left{
            flex:1;
            .logo-wapper{
                display: inline-block;
                position: relative;
                top:p(-10px);
                margin:0px p(12px);
                padding:p(6px);
                width: p(56px);
                height: p(56px);
                box-sizing: border-box;
                background-color: #141d27;
                border-radius: 50%;
                position: relative;
                .logo{
                    width: 100%;height: 100%;
                    border-radius: 50%;
                    background-color: #2b343c;
                    &.hight{
                        background-color: rgb(0,160,220);
                    }
                }
                .num{
                    position: absolute;
                    top:0;right:0;
                    width: p(24px);
                    height: p(16px);
                    line-height: p(16px);
                    text-align: center;
                    border-radius: p(16px);
                    font-size: 9px;
                    font-weight: 700;
                    color:#fff;
                    background-color: rgb(240,20,20);
                }
            }
            .price{
                display: inline-block;
                vertical-align: top;line-height: p(24px);
                margin-top:p(12px);box-sizing: border-box;
                padding-right:p(12px);
                border-right:1px solid rgba(255,255,255,0.1);
                @include d(16px);color:rgba(255,255,255,0.4);
                font-weight: 700;
                &.hight{
                    color:#fff;
                }
            }
            .desc{
                display: inline-block;
                vertical-align: top;
                line-height: p(24px);
                margin:p(12px) 0 0 p(12px);
                @include d(12px);color:rgba(255,255,255,0.4);
            }
          }
          .content-right{
            flex:0 0 p(105px);
            width: p(105px);
            .pay{
                height: p(48px);line-height: p(48px);
                text-align: center;
                @include d(12px);
                color:rgba(255,255,255,0.4);
                font-weight: 700;
                background-color: #2b333b;
                &.not-enough{
                    background-color: #2b333b;
                }
                &.enough{
                    background-color: #00b43c;
                    color:#fff;
                }
            }
          }
      }
      .ball-contarner{
          .ball{
              position: fixed;
              left:p(32px);bottom:p(22px);z-index: 200;
              
              &.drop-transition{
                  transition: all 0.4s;
                  .inner{
                        width: p(16px);height: p(16px);border-radius: 50%;
                        background-color: rgb(0,160,220);
                        transition: all 0.4s;
                    }
              }
          }
      }
      .shopcart-list{
          background: #fff;
          position: absolute;
          top:0;z-index: -1;left:0;
          width: 100%;height: auto;
          transition: all .3s ease;
          background: #fff;
        
            &.fold-enter-active {
                transition: all .3s ease;
            }
            &.fold-leave-active {
                transition: all .3s ease;
            }
            &.fold-enter, &.fold-leave-to
            /* .slide-fade-leave-active for below version 2.1.8 */ {
                transform: translateY(100%);
                opacity: 0;
            }

          .list-header{
              height: p(40px);padding:0px p(18px);
              line-height: p(40px);background: #f3f5f7;
              border-bottom: 1px solid rgba(7,17,27,0.1);
              .title{
                  float: left;
                  @include d(14px);
                  color:rgb(7,17,27);height: p(40px);line-height: p(40px);
              }
              .emtry{
                  height: p(40px);line-height: p(40px);
                  float: right;@include d(12px);
                  color:rgb(0,160,210);
              }
          }
          .list-content{
              overflow: hidden;
              padding:0px p(18px);
              max-height: p(217px);
              background: #fff;
              padding-bottom: p(15px);
              li{
                  position: relative;
                  padding:p(12px) 0px;
                  box-sizing: border-box;
                  border-bottom:1px solid rgba(7,17,27,0.1);
                  .name{
                      height: 24px;
                      line-height: p(24px);
                      @include d(14px);
                      color:rgb(7,17,27);
                  }
                  .price{
                      position: absolute;
                      padding:p(12px) 0px;
                      right:p(100px);
                      bottom:p(0px);
                      line-height: p(24px);
                      @include d(14px);
                      font-weight: 700;
                      color:rgb(240,20,20);
                  }
                  .cartcontrol-wapper{
                      padding:p(12px) 0px;
                      position: absolute;
                      right:0px;
                      bottom:p(0px);
                  }
              }
          }
            
      }
      
  }
  .lis-mark{
          position: fixed;
          top:0;left:0;width: 100%;height: 100%;
          background-color: rgba(0,0,0,0.6);
      }
</style>

