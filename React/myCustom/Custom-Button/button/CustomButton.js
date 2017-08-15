/**
 * Created by game on 2016/12/14.
 */
import React from 'react';
import './CustomButton.css'

var CustomButton = React.createClass({
     render:function(){
         var loadingDisplayStyle = {"display": this.props.loading?"inline-block":"none" };
         return(
             <div>
                 <img src={require('./loading.gif')}/> <span>load图片写法</span>
                 <button className={this.props.size} onClick={this.props.onClick}>
                     <span style={loadingDisplayStyle} className="loadbgIcon"></span>
                     <span >{this.props.children}</span>
                 </button>
             </div>

        )
     }
});

export default  CustomButton;