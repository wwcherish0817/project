/**
 * Created by game on 2016/12/28.
 */
import React from 'react'
import FileList from './file-list/index.js'
import {getFileList,api_reanme,api_newFolder,api_remove} from './api.js'
import 'antd/dist/antd.css'
import './index.css'
import Nav from './nav'
import Menu from './rightmenu'
import Action from './action'
import {Modal,message} from 'antd'

import {
    Router,
    Route,
    hashHistory ,
    browserHistory,
    IndexRoute,
    Redirect,
    Link,
    IndexLink
}from 'react-router';

var R = React.createClass({
    render(){
        return (
            <Router history={hashHistory}>
                <Route path='*' component={CloundFile}/>
            </Router>
        )
    }
});


var CloundFile = React.createClass({
    getInitialState(){
        return{
            path:[],
            file:[],
            loading:false,
            menu:{
                x:0,
                y:0,
                display:false
            },
            active:{},
            showAction:false,
            actionType:"",
            actionNewVal:"",
            copyitem:{}
        }
    },
    render(){

        return(
            <div className="CloundFildApp"
                 onContextMenu={(e)=>e.preventDefault()}
                 onMouseDown={this.mouseDown}
                >

                <h3 className="app-title">CloundFile</h3>
                <Nav
                    value={this.state.path}
                    //onChange={(path)=>hashHistory.push(paty)}
                    />
                <FileList
                    file={this.state.file}
                    path={this.state.path}
                    //onChange={this.getFile}
                    loading={this.state.loading}
                    copyItem={this.state.copyitem}
                    active={this.state.active}
                    onPick={(setname)=>this.setState({active:{name:setname}})}

                    //onReName={this.rename}
                    />
                <Menu
                    display={this.state.menu.display}
                    x={this.state.menu.x}
                    y={this.state.menu.y}
                    onAciont={(type)=>this.handleAciton(type)}
                    />
                <Action
                    visible={this.state.showAction}
                    type={this.state.actionType}
                    oldVale={this.state.active.name}
                    newVale={this.state.actionNewVal}
                    onChange={(value)=>this.setState({actionNewVal:value})}
                    onCancel={()=>this.setState({showAction:false,active:{}})}
                    onRename={this.ActionCbRename}
                    onNewFilder={this.ActionCbNewFilder}
                    onDelete={this.ActionCbDelete}
                    onCopy={this.ActionCbCopyItem}
                    onPaste={this.ActionCbonPaste}
                    />
            </div>
        )
    },
    ActionCbonPaste(){
        var file = this.state.file;
        var item = this.state.copyitem;
        let isHave= false;
        file.map(function(obj){
            if(obj.name == item.name){
                isHave = true;
                return;
            }
        })
        if(!isHave){
            file.push(item);
            this.setState({
                file : file,
                showAction:false,
                actionNewVal:""
            })
        }
        else{
            /*
            Modal.confirm({
                title:"操作错误",
                content:"该目录已有相同文件",
                onOk:function(){
                    console.log("On Ok");

                },
                onCancel:function(){
                    console.log("On onCancel");
                }
            })*/
            Modal.error({
                title:"操作错误",
                content:"相同目录不能复制相同文件"
            })
        }
    },
    ActionCbCopyItem(){
        var file = this.state.file;
        var that = this;
        file.map(function(obj){
            if(obj.name == that.state.active.name)
            {
                that.setState({
                    copyitem : obj,
                    active:{},
                    showAction:false,
                    actionNewVal:obj.name
                })


                message.success("已成功复制文件:"+that.state.active.name,2);
            }
        })
    },
    ActionCbDelete(){
        var path = this.state.path.join('/')+'/'+this.state.active.name;
        var that = this;
        api_remove({path:path},function(res){
            console.log("api_remove sucess",res.body);
            if(res.body.success == "delete files successful"){
                var tmpFile =[];
                var file = that.state.file;
                file.map(function(obj){
                    if(obj.name != that.state.active.name){
                        tmpFile.push(obj);
                    }
                });
                message.success("成功删除文件:"+that.state.active.name,2);
                that.setState({
                    file:tmpFile,
                    showAction:false,
                    active:{},
                    actionNewVal:""
                });
            }

        },function(err){
            console.log("api_remove err",err);
        })
    },
    ActionCbRename(){
        var name = this.state.actionNewVal;
        var path = this.state.path.join('/')+'/'+this.state.active.name;
        var that = this;
        api_reanme({name:name,path:path},function(res){
            var file = that.state.file;
            file.map(function(obj){
                if(obj.name == that.state.active.name){
                    obj.name = res.body.name;
                }
            });
            message.success("文件夹:"+that.state.active.name+"已被重命名为:"+res.body.name);
            that.setState({
                file:file,
                showAction:false,
                active:{},
                actionNewVal:""
            });
        },function(err){
            console.log("api_reanme error",err);

        })

    },
    ActionCbNewFilder(){
        var that = this;
        var path = this.state.path.join('/');
        var name = this.state.actionNewVal;
        api_newFolder({name:name,path:path},function(res){
            var file =that.state.file;
            file.push(res.body);
            message.success("成功创建文件夹:"+name,2);
            that.setState({
                file:file,
                showAction:false,
                active:{},
                actionNewVal:""
            });

        },function(err){

        })
    },
    handleAciton(type){
        //console.log(this.state.active.name);
        let initnewVal = this.state.active.name;

        if(this.state.active.name == undefined && type!="newfolder" && type!="paste"){
            this.setState({
                menu:{
                    display:false,
                },
                active:{}
            });
            Modal.error({
                title:"操作错误",
                content:"未选中对象"
            })
            return false;
        }
        if(type=="newfolder" || type=="rename"){
            initnewVal="新建文件夹";
            var file = this.state.file;
            let idx = 0;
            file.map(function(obj){
                var re =new RegExp("^" + initnewVal);
                if(re.test(obj.name)){
                    idx++;
                }
            })
            if(idx){
                initnewVal+="("+idx+")";
            }
        }
        else if(type == "paste" )
        {
            initnewVal = this.state.actionNewVal;
        }



        this.setState({
            showAction:true,
            actionNewVal:initnewVal,
            menu:{
                display:false,
            },
        });
        switch (type){
            case "newfolder":{
                //新建文件夹.
                this.setState({
                    actionType:"newfolder"
                });
            }break;
            case "rename":{
                //重命名
                this.setState({
                    actionType:"rename"
                });
            }break;
            case "delete":{
                //删除
                this.setState({
                    actionType:"delete"
                });
            }break;
            case "copy":{
                //复制
                this.setState({
                    actionType:"copy"
                });
            }break;
            case "paste":{
                //粘贴
                this.setState({
                    actionType:"paste"
                });
            }break;
        }

    },

    componentDidMount(){
        const {params} = this.props;
        const {splat} = params;
        this.getFile(splat);
    },
    componentWillReceiveProps(nextRops){

        this.getFile(nextRops.params.splat);
    },
    getFile(paty){
        //hashHistory.push(paty);
        var that = this;
        that.setState({
            loading:true
        })
        getFileList(paty,function(res){
            that.setState({
                path: res.body.path.split('/'),
                file:   res.body.file,
                loading:false
            })

        },function(error){
            console.log("error",error);
        })
    },
    mouseDown(e){
       if(e.button == 2)
       {

          this.setState({
              menu:{
                  x:e.clientX,
                  y:e.clientY,
                  display:true
              }
          })
       }
        else{
           this.setState({
               menu:{
                   x:e.clientX,
                   y:e.clientY,
                   display:false,

               },
               active:{}
           })
       }
    }
})

export default  R;

