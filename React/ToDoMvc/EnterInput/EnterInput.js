/**
 * Created by ww on 2016/12/11.
 */
import React from 'react';
import ReactDOM from 'react-dom';

var ENTER_KEY = 13;
var EnterInput = React.createClass({
    getInitialState:function(){
       return{
           value:"点击输入..."
       }
    },
    render:function(){
        return(
            <div>
                <input
                    value={this.state.value}
                    onChange={this.onChangeEvent}
                    onFocus={this.onFocusEvent}
                    onKeyDown={this.handleNewTodoKeyDown}
                    onBlur={this.onBlurEvent}
                    />
                <span>回车确认输入内容</span>
            </div>
        )
    },
    onChangeEvent:function(e){
        this.setState({
            value:e.target.value
        })
        e.preventDefault();
    },
    handleNewTodoKeyDown:function(e){
        if (e.keyCode != ENTER_KEY) {
            return;
        }

        e.preventDefault();
        if(this.state.value == ""){
            alert("请输入内容..");
           return;
        }
        this.props.addDataFun(this.state.value);
    },
    onFocusEvent:function(){
        if(this.state.value == "点击输入..."){
            this.setState({
                value:""
            })
        }
    },
    onBlurEvent:function(){
        if(this.state.value == ""){
            this.setState({
                value:"点击输入..."
            })
        }
    }
});

export default  EnterInput;