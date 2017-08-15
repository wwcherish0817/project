<template>
  <div class="goods">
    <div class="menu-war" ref="menuWrapper">
      <ul>
        <li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">
          <span class="text">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>  
    </div> 
    <div class="foods-war" ref="foodWrapper">
      <ul>
        <li v-for="item in goods" class="food-list" ref="foodListHook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="fooditem">
              <div class="icon">
                <img width="64" :src="food.icon">
              </div>
              <div class="cotent">
                <h2 class="name">{{food.name}}</h2>
                <p class="des">{{food.description}}</p>
                <div class="extra">
                  <span class="" :seelcont="food.sellCount">月销{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">¥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol">
                  <v-cartcontrol :food="food"></v-cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <v-shopcart ref="shopcart" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice" :selectFoods="selectFoods"></v-shopcart>
  </div>
   
</template>

<script type="text/ecmascript-6">
  import BScroll from "better-scroll";
  import shopcart from '../shopcart/shopcart.vue';
  import cartcontrol from '../cartcontrol/cartcontrol.vue';
  
  import { bus } from '../../bus.js'

   const AJAX_OK = 0;
   export default {
    name: 'goods',
    props:{
      seller:{
        type:Object
      }
    },
    components:{
      'v-shopcart':shopcart,
      'v-cartcontrol':cartcontrol
    },
    data(){
      return {
        goods:[],
        listHight:[],
        scrollY:0,
        
      }
    },
    mounted(){
      bus.$on("cart-add", function (_e) {
          this._drop(_e);
      }.bind(this));
    },
    computed:{
        currentIndex(){
            for(let i=0;i<this.listHight.length;i++){
               let height1 = this.listHight[i];
               let height2 = this.listHight[i+1];
               if(!height2 || this.scrollY >=height1 && this.scrollY<height2){
                  return i;
               }
            }
            return 0; 
        },
        selectFoods(){
           let foods = [];
           this.goods.forEach(function(good) {
             good.foods.forEach((food)=>{
               if(food.count){
                 foods.push(food);
               }
             })
           }, this);
           return foods;
        }
    },
    created(){
      this.classMap = ['decrease','discount','guarantee','invoice','special'];
      this.$http.get('/api/goods').then((response) => {
        if (response.data.errno === AJAX_OK) {
          this.goods = response.data.data;
          console.log("/api/goods -- \n",this.goods);
      
          this._initScroll();
        }
      }).catch((error) => {
        console.log(error);
      })

     
    },
    methods:{
      selectMenu(index,event){
          if(!event._constructed){
             return;
          }
          let foodListHook = this.$refs.foodListHook;
          let el = foodListHook[index];
          this.foodScroll.scrollToElement(el,300);
          //console.log(index,event)
      },
      _initScroll(){
        this.$nextTick(function(){
            this.menuScroll = new BScroll(this.$refs.menuWrapper,{
              click:true
            });
            this.foodScroll = new BScroll(this.$refs.foodWrapper,{
              probeType:3, click:true
            });
            this.foodScroll.on("scroll",(pos)=>{
                this.scrollY = Math.abs(Math.round(pos.y));
                //console.log(this.scrollY);
            })
            this._calculateHeight();
            
        })
      },
      _calculateHeight(){
        //计算高度
        let foodListHook = this.$refs.foodListHook;
        let height = 0;
        this.listHight.push(height);
        for(let i=0;i<foodListHook.length;i++){
          let itemheight = foodListHook[i].clientHeight;
          height += itemheight;
          this.listHight.push(height);
          //console.log(height);
        }
      },
      _drop(_e){
          let target = _e.target;
          this.$refs.shopcart.drop(target);
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
  .goods{
    display: flex;
    position: absolute;
    width: 100%;
    top:p(174px);
    bottom:p(46px);
    overflow: hidden;
    .menu-war{
        flex:0 0 p(80px);
        width: p(80px);
        background-color: #f3f5f7; 
        .menu-item{
          &.current{
            background-color: #fff;
            font-weight: 700;
            position: relative;
            margin-top: p(-1px);
            z-index: 10;
            .text{
              border:none;
            }
          }
          display: table;
          height: p(54px);
          width: p(56px);
          line-height: p(14px);
          font-size: 0;
          padding:0px p(12px);
          .icon{
              display: inline-block;
              width: p(12px);
              height: p(12px);
              margin-right: p(2px);
              background-size: p(12px)  p(12px);
              background-repeat: no-repeat;
              &.decrease{
                @include bg-img("./img/decrease_3")
              }
              &.discount{
                @include bg-img("./img/discount_3")
              }
              &.guarantee{
                @include bg-img("./img/guarantee_3")
              }
              &.invoice{
                @include bg-img("./img/invoice_3")
              }
              &.special{
                @include bg-img("./img/special_1")
              }
          }
          .text{
            display: table-cell;
            text-align: center;
            width: p(56px);
            vertical-align: middle;
            @include d(12px);
            border-bottom: 1px solid rgba(7,17,27,0.1);
          }
        }
    }
    .foods-war{
        flex:1;
        .title{
          padding-left:p(14px);
          height: p(26px);
          line-height: p(26px);
          border-left:2px solid #d9dde1;
          @include d(12px);
          color:rgb(147,153,159);
          background-color: #f3f5f7;
        }
        .fooditem{
          display: flex;
          margin:p(18px);
          padding-bottom: p(18px);
          border-bottom:1px solid rgba(7,17,27,0.1);
          &:last-child{
            border:none;
            padding-bottom: 0px;
          }
          .icon{
            flex:0 0 57px;
            margin-right: p(10px);
          }
          .cotent{
            flex:1;
            font-size: 0;
            position: relative;
            .name{
              margin:p(2px) 0px p(8px) 0px;
              height: p(14px);
              line-height: p(14px);
              @include d(14px);
              color: rgb(7,17,27);
            }
            .des,.extra{
              line-height: p(13px);
              @include d(10px);
              color:rgb(147,153,159);
            }
            .des{
              margin-bottom: p(8px);
            }
            .extra{
              
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
            .cartcontrol{
                position: absolute;right:0px;bottom:p(0px);

            }
          }
        }
    }
    
  }
</style>

