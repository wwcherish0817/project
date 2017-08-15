/**
 * Created by game on 2016/12/15.
 */
import React from 'react';
import FormItem from './FormItem/FormItem.js'

var CustomFormItem = React.createClass({
    getInitialState:function(){
        return{
            nameVal:"请输入姓名",
            passWordVal:""
        }
    },
    render:function(){
       return(
           <div>
                <FormItem
                    label='姓名'
                    type="text"
                    errmsg='请输入正确姓名'
                    inputClass="name"
                    value={this.state.nameVal}
                    onChange={this.inputChangeEvent}
                    />
               <FormItem
                   label='密码'
                   type="password"
                   errmsg='请输入一个密码'
                   inputClass="possword"
                   value={this.state.passWordVal}
                   onChange={this.inputChangeEvent}
                   />
           </div>
       )
    },
    inputChangeEvent:function(e,inputType){
        if(inputType == "name")
        {
            this.setState({
                nameVal:e.target.value
            })
        }
        if(inputType == "possword")
        {
            this.setState({
                passWordVal:e.target.value
            })
        }

    }
})

export default CustomFormItem;