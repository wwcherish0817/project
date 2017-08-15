/**
 * Created by game on 2016/12/14.
 */
import React from 'react';
import Button from './button/CustomButton.js'

var CustomButton = React.createClass({
    render:function(){
      return(
          <Button
              loading={false}
              size="big"
              onClick={this.onclickEvent}
              >自定义按钮</Button>
      )
    },
    onclickEvent:function(){
        alert("点击自定义按钮");

    }
})
export default  CustomButton;