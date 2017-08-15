import React from 'react';
import Context from './Context/index.js'

const TitleBar = Context.TitleBar;
const Title = Context.Title;
const InnerBar = Context.InnerBar;
const Inner = Context.Inner;

var ContextDemo = React.createClass({
    getInitialState(){
        return{
            touchVal:1
        }
    },
    render:function(){
       return(
           <div>
                <Context touchval={this.state.touchVal}>
                    <TitleBar>
                        <Title idx={1} onClick={(e)=>this.setState({touchVal:1})}>title -- 1</Title>
                        <Title idx={2} onClick={(e)=>this.setState({touchVal:2})}>title -- 2</Title>
                        <Title idx={3} onClick={(e)=>this.setState({touchVal:3})}>title -- 3</Title>
                    </TitleBar>
                    <InnerBar>
                        <Inner idx={1}>inner -- 1</Inner>
                        <Inner idx={2}>inner -- 2</Inner>
                        <Inner idx={3}>inner -- 3</Inner>
                    </InnerBar>
                </Context>
           </div>
       )
    }
});

export default  ContextDemo;