/**
 * Created by game on 2017/1/16.
 */
import React, { Component } from 'react';
import   ReactDOM from 'react-dom'

import {tools_active,tools_activeItem,tools_delete}  from './action.js'
var ReduxToDoMvc = React.createClass({
    render(){
        const {items,name,active}=this.props;
        var that = this;

        var nodeData = [];
        if(active == "all"){
            nodeData = items;
        }
        else if(active == "active"){
            for(var i=0;i<items.length;i++){
                 if(items[i].active){
                     nodeData.push(items[i]);
                 }
            }
        }
        else if(active == "complete"){
            for(var i=0;i<items.length;i++){
                if(!items[i].active){
                    nodeData.push(items[i]);
                }
            }
        }

        var nodes =  nodeData.map(function(obj,idx){
            return(
                <p key={idx}>
                    <span onClick={()=>that.props.dispatch(tools_activeItem(obj.name))} style={{textDecoration:obj.active?"":"line-through"}}>{obj.name}</span>
                    <button onClick={(e)=>that.deleteData(obj.name)}>删除</button>
                </p>
            )

        })
        return(
            <div>
                <input ref="input"/> <button onClick={this.addData}>添加</button>
                <div>{nodes}</div>
                <div>
                    <a href="javascript:void(0)" onClick={(e)=>this.props.dispatch(tools_active("all"))}>all</a>
                    <a href="javascript:void(0)" onClick={(e)=>this.props.dispatch(tools_active("active"))}>active</a>
                    <a href="javascript:void(0)" onClick={(e)=>this.props.dispatch(tools_active("complete"))}>complete</a>
                </div>
            </div>

        )
    },
    deleteData(val){
        const  {deletefun} = this.props;
        deletefun(val);
    },
    addData(){
        const  {add} = this.props;
        var val = ReactDOM.findDOMNode(this.refs.input).value;
        //dispatch(tools_add(val));
        add(val);
    },
    componentDidMount(){
        const  {getData} = this.props;
        getData();

    }
})
export default  ReduxToDoMvc;