
import React from 'react';
import ReactDOM from 'react-dom';
import './CustomTable.css'
const tabeEverCount = 5;
function id() {
    return Math.random().toString().replace(/\./,'')+'-'+Math.random().toString().replace(/\./,'')
};
var CustomTable = React.createClass({
    getInitialState:function(){
       return{
           header:this.props.hand,
           data:this.props.data,
           idx:1,
           tabDom:[]
       }
    },
    createTabList:function(){

        this.state.tabDom.splice(0,this.state.tabDom.length);
        let count = Math.ceil(this.state.data.length/tabeEverCount);
        var randId = Math.random();
        this.state.tabDom.push(<span key={randId+0}  value={randId+0} onClick={(e)=>this.clickTab(e)}>&lt;&lt;</span>);
        for(var i=0;i<count;i++)
        {
            this.state.tabDom.push(<span key={randId+i+1} className={ (i+1)==this.state.idx?"select":""} value={randId+i+1}  onClick={(e)=>this.clickTab(e)}>{i+1}</span>);
        }
        this.state.tabDom.push(<span key={randId+count+1}  value={randId+count+1} onClick={(e)=>this.clickTab(e)}>&gt;&gt;</span>);
        return(
            this.state.tabDom
        )

    },
    clickTab:function(e){
        var that = this;
        var touchKey = e.target.getAttribute("value");
        this.state.tabDom.map(function(obj,i){
             if(obj.key == touchKey)
             {
                 that.toTab(i);
             }
        })
    },
    toTab:function(idx){
        let count = Math.ceil(this.state.data.length/tabeEverCount);
        let editidx = this.state.idx;
        if(parseInt(idx) == 0){
            editidx--;
            if(editidx<=1){
                editidx=1;
            }
        }
        else if(parseInt(idx) == (count+1)){

            editidx++;
            if(editidx>count){
                editidx= count;
            }
        }
        else{
            editidx = idx;
        }


        this.setState({
            idx:parseInt(editidx)
        })
    },
    render:function(){
        var handerTitArr= [];
        var showMaxCount = this.state.idx * tabeEverCount;
        var showMinCount = (this.state.idx-1)* tabeEverCount;
        var that = this;
        var handDom = this.state.header.map(function(obj,i){
             handerTitArr.push(obj);
                return(
                       <th key={i+that.state.idx}>{obj}</th>
                   )
            });

        var dataDom = this.state.data.map(function(obj,i){
             if(i>= showMinCount && i<showMaxCount){
                 let tdDom =handerTitArr.map(function(h,j){
                     return(
                         <td key={"td-"+i+obj[h]}>{obj[h]}</td>
                     )
                 })
                 return(
                     <tr key={i}>{tdDom}</tr>
                 )
             }

        });
        var tabListDom = this.createTabList();

        return(
            <div>
                <table className="CustomTable">
                    <thead>
                    <tr >{handDom}</tr>
                    </thead>
                    <tbody>
                    {dataDom}
                    </tbody>
                </table>
                <div className="tabList">
                    {tabListDom}
                </div>
            </div>

        )
    }
})

export default   CustomTable;