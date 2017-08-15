/**
 * Created by game on 2016/12/12.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import './ItemList.css'

var ENTER_KEY = 13;
var ItemChild = React.createClass({
    getInitialState:function(){
       return{
           id:this.props.id,
           text:this.props.text,
           className:"itemChild"
       }
    },
    render:function(){
        return(
            <li className={this.state.className} >
                <span onClick={this.toucheEdit}>{this.state.text}</span>
                <input value={this.state.text} onChange={this.changeEvent}   onKeyDown={this.KeyDownEvent}/>
                <span onClick={(e)=>this.props.delectEvent(this.state.id)}>X</span>
            </li>
        )
    },
    changeEvent:function(e){
        this.setState({
            text:e.target.value
        })
    },
    toucheEdit:function(){
        this.setState({
            className:"itemChild editClass"
        })
    },
    KeyDownEvent:function(e){
        var that = this;
        if (e.keyCode != ENTER_KEY) {
            return;
        }

        e.preventDefault();
        if(this.state.value == ""){
            alert("«Î ‰»Îƒ⁄»›..");
            return;
        }
        this.setState({
            className:"itemChild"
        })
        that.props.editEvent(that.state.id,this.state.text);
    }
})

var ItemList = React.createClass({
    render:function(){
        var that = this;
        var nodes = this.props.listData.map(function (o) {
            return (
                <ItemChild id={o.id}  key={o.id} o={o}  text={o.text} delectEvent={that.props.delEvent} editEvent={that.props.editEvent}/>
            )
        });
        return(

            <ul>
                {nodes}
            </ul>
        )
    }
})

export default  ItemList;