import React from 'react';

var Context = React.createClass({
   render:function(){
       return(
           <div>
               {this.props.children}
           </div>
       )
   },
    //设置子组件的上下文
    getChildContext(){
        return {
            touchval:this.props.touchval
        }
    },
    //子组件的上下文类型
    childContextTypes:{
        touchval:React.PropTypes.number.isRequired
    }
});

var TitleBar = React.createClass({
    render:function(){
        return(
            <div>
                {this.props.children}
            </div>
        )
    }
});

var Title = React.createClass({
    contextTypes:{
        touchval:React.PropTypes.number
    },
    render:function(){
        var styleColor = this.props.idx == this.context.touchval?{"color":"red"}:{"":""};
        return(

            <div style={styleColor} onClick={this.props.onClick}>
                {this.props.children}
            </div>
        )
    },

});

var InnerBar = React.createClass({
    render:function(){
        return(
            <div>
                {this.props.children}
            </div>
        )
    }
});

var Inner = React.createClass({
    contextTypes:{
        touchval:React.PropTypes.number
    },
    render:function(){
        var styleColor = this.props.idx == this.context.touchval?{"color":"red"}:{"":""};
        return(
            <div style={styleColor}>
                {this.props.children}
            </div>
        )
    }
});

Context.TitleBar = TitleBar;
Context.Title = Title;
Context.InnerBar = InnerBar;
Context.Inner = Inner;

export default Context;