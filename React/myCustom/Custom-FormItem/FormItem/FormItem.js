import React from 'react';
import './FormItem.css'

var FormItem =React.createClass({
    getInitialState:function(){
        return{
            inputClass:this.props.inputClass,
            errorMsg:this.props.errmsg,
            inputVal:this.props.value,
            errorShow:false,
            trueShow:false,
            placeVal:this.props.value,
        }
    },
    render:function(){

        return(
            <div className="formItem">
                <label>{this.props.label}</label>
                <input
                    type={this.props.type}
                    value={this.state.inputVal}
                    onChange={(e)=>this.inputOnChangeEvent(e)}
                    onKeyDown={(e)=>this.inputKeyDownEvent(e)}
                    />
                <span className="trueSpan" style={{"display": this.state.trueShow?"inline-block":"none" }}> <img src={require('./true.png')}/></span>
                <span className="errorSpan"  style={ {"display": this.state.errorShow?"inline-block":"none" }}>{this.state.errorMsg}</span>
            </div>
        )
    },
    inputKeyDownEvent:function(e){
        if(e.which != 13){
            return;
        }
        e.preventDefault();

        if(this.state.inputClass == "name")
        {

            if(this.state.inputVal == this.state.placeVal){
                this.setState({
                    errorMsg:"请输入用户名"
                });
                this.errorSpanIsShow(true);
                this.trueSpanIsShow(false);
                return;
            }
            else if(this.state.inputVal== ""){

                this.setState({
                    errorMsg:"用户名不能为空"
                });
                this.errorSpanIsShow(true);
                this.trueSpanIsShow(false);
                return;
            }

        }
        else if(this.state.inputClass == "possword"){
             if(this.state.inputVal== ""){

                this.setState({
                    errorMsg:"密码不能为空"
                });
                this.errorSpanIsShow(true);
                this.trueSpanIsShow(false);
                 return;
            }
        }

        this.errorSpanIsShow(false);
        this.trueSpanIsShow(true);
    },
    errorSpanIsShow:function(show){
       this.setState({
           errorShow:show
       });
    },
    trueSpanIsShow:function(show){
        this.setState({
            trueShow:show
        });
    },
    inputOnChangeEvent:function(e){
        this.setState({
            inputVal:e.target.value
        })
        this.props.onChange(e,this.state.inputClass);
    }
})

export default  FormItem;