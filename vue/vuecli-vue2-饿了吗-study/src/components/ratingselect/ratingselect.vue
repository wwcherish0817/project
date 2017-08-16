<template>
  <div class="ratingselect">
    <div class="rating-type">
      <span @click="select(2,$event)" class="block positive" :class="{'active':m_selecttype===2}">
        <span class="text">{{desc.all}}</span>
        <span class="count">{{ratings.length}}</span>
      </span>
      <span @click="select(0,$event)" class="block positive" :class="{'active':m_selecttype===0}">
        <span class="text">{{desc.positive}}</span>
        <span class="count">{{positives.length}}</span>
      </span>
      <span @click="select(1,$event)" class="block negative" :class="{'active':m_selecttype===1}">
        <span class="text">{{desc.negative}}</span>
        <span class="count">{{negatives.length}}</span>
      </span>
    </div>
    <div class="switch" @click="toggleContent($event)">
      <span class="onlycontent" :class="{'select':m_onlyContent}"></span>
      <span class="text">只看有内容的平价</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const POSITIVE = 0; //正向平价
  const NEGATIVE = 1; //反面平价
  const ALL = 2;  //所有评价
  import {bus} from '../../bus'
  
  export default{
    
    props:{
      ratings:{
        type:Array,
        default(){
          return [];
        }
      },
      selectType:{
         type:Number,
         default:ALL
      },
      onlyContent:{
        type:Boolean,
        default:false
      },
      desc:{
        type:Object,
        default(){
          return {
            all:'全部',
            positive:"满意",
            negative:"不满意"
          }
        }
      }
    },
    data(){
      return{
        m_selecttype:this.selectType,
        m_onlyContent:this.onlyContent
      }
    },
    computed:{
        positives(){
          return this.ratings.filter((rating)=>{
            return rating.rateType === POSITIVE
          })
        },
        negatives(){
          return this.ratings.filter((rating)=>{
            return rating.rateType === NEGATIVE
          })
        }
    },
    methods:{
       select(type,_event){
         if(!_event._constructed){
             return;
          }
          this.m_selecttype = type;
          bus.$emit('ratingselect.selecttype',this.m_selecttype);
       },
       initSelectType(val){
         this.m_selecttype = val;
       },
       initOnlyContent(val){
          this.m_onlyContent = val;
       },
       toggleContent(_event){
          if(!_event._constructed){
             return;
          }
          this.m_onlyContent = !this.m_onlyContent;
          bus.$emit('ratingselect.onlycontent',this.m_onlyContent);
       }
    },
    
  }
</script>

<style lang="scss" scoped="" type="text/css">
  .rating-type{
    padding:18px;
    margin: 0px 18px;
    border-bottom: 1px solid #ccc;
    .block{
      display: inline-block;font-size: 0;color:rgb(77,85,93);
      padding:8px 12px;border-radius: 2px;margin-right:8px;color:#fff;
      &.active{
        color:#fff;
      }
      .text{
        font-size: 12px;
      }
      .count{
        font-size:8px;margin-left:2px;line-height: 16px;
      }
      &.positive{
        background: rgba(0,160,220,0.2);
        &.active{
          background: rgb(0,160,220);
        }
      }
      &.negative{
        background: rgba(77,85,93,0.2);
        &.active{
          background: rgb(77,85,93);
        }
      }
    }

  }
  .switch{
    padding:12px 18px;line-height:24px;
    border-bottom: 1px solid rgba(7,17,27,0.1);
    color:rgb(147,153,159);
    .onlycontent{
      display: inline-block;
      width: 10px;height: 10px;
      border-radius: 50%;
      background-color: #ccc;
      &.select{
        background-color: greenyellow;
      }
    }
  }
</style>

