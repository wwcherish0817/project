/**
 * Created by ww on 2016/12/10.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import EnterInput from './EnterInput/EnterInput'
import ItemList from './ItemList/ItemList'

function id() {
    return Math.random().toString().replace(/\./,'')+'-'+Math.random().toString().replace(/\./,'')
};
var ToDoMvc = React.createClass({
    getInitialState:function(){
        return{
          arrList:[]
        }
    },
    render:function(){
       return(
            <div>
                <EnterInput  addDataFun={this.addData}/>
                <ItemList listData={this.state.arrList} delEvent={this.delEvent} editEvent={this.editEvent}/>
            </div>
       );
    },

    addData:function(o){
        var pushTxt={
            text:o,
            id:id()
        }
         var tmpArrList = this.state.arrList;
        tmpArrList.push(pushTxt);
        this.setState({
            arrList:tmpArrList,
        })
    },
    delEvent:function(id){
         var tmpArrList = [];
        for(var i=0;i<this.state.arrList.length;i++)
        {
            if(this.state.arrList[i].id!=id){
                tmpArrList.push(this.state.arrList[i]);
            }
        }
        this.setState({
            arrList:tmpArrList,
        })
    },
    editEvent:function(id,text){
        var tmpArrList = this.state.arrList;
        for(var i=0;i<this.state.arrList.length;i++)
        {
            if(this.state.arrList[i].id == id){
                this.state.arrList[i].text =text;
            }
        }
        this.setState({
            arrList:tmpArrList,
        })

    }
});

export default  ToDoMvc;