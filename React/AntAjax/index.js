import React from 'react';
import { Table,Button,Modal,Form,Input,Radio,message } from 'antd';
import 'antd/dist/antd.css'
import request from 'superagent'
import './index.css'
import ModalData from './ModalData.js'

const header =[
    {title:"id",dataIndex:"id"},
    {title:"name",dataIndex:"name"},
    {title:"age",dataIndex:"age"},
    {title:"sex",dataIndex:"sex"},
    {
        title:"single",
        dataIndex:"single",
        render:(single,obj)=>(<div>{single?"单":"不单"}</div>)
    },
]

const ajaxData = 'http://101.200.129.112:9527/react1/student/';

var AntAjax = React.createClass({
    getInitialState(){
        return{
            loading:false,
            items:[],
            showAddVisible:false,

            addVal_name:"",
            addVal_age:"",
            addVal_sex:"boy",
            addVal_single:true,

            selectedRowKeys: [],
            modalType:1, //1-增加数据,2-编辑数据
        }
    },
    render(){
        const { loading, selectedRowKeys } = this.state;
        const  rowSelection = {
            selectedRowKeys:selectedRowKeys,
            onChange: this.onSelectChange,
        }
        var disabled = selectedRowKeys.length !==1
       return(
           <div className="tableInner">
               <h3>数据数据</h3>
               <div className="caozuoInner">
                    <Button onClick={this.addData} icon="plus" type="primary">添加</Button>
                    <Button icon="edit" type="ghost" disabled={disabled} onClick={this.editEvent}>编辑</Button>
                    <Button icon="delete" disabled={disabled} type="dashed" onClick={this.deleteEvent}>删除</Button>
               </div>
               <Table rowSelection={rowSelection} loading={this.state.loading} dataSource={this.state.items} columns={header} />

                <ModalData
                    visible={this.state.showAddVisible}
                    showType={this.state.modalType}
                    onCancel={()=>this.setState({showAddVisible:false})}
                    onOk={this.ajaxData}
                    onChangeNameVal={this.state.addVal_name}
                    onChangeAgeVal={this.state.addVal_age}
                    onChangeSexVal={this.state.addVal_sex}
                    onChangeSignleVal={this.state.addVal_single}
                    onChangeEvent={this.modalOnChangeEvent}
                    />
           </div>
       )
    },
    componentDidMount(){
        let that = this;
        that.setState({
            loading:true
        })
        request.get(ajaxData).end(function(err,res){
            if(err){
               return console.log(err);
            }
            else{
                res.body=res.body.map(function(obj){
                    obj.key = obj.id;
                    return obj;
                });
                that.setState({
                    items:res.body,
                    loading:false
                })
            }
        })
    },
    ////////////////////////////////////////////////////
    addData:function(){
        this.setState({
            addVal_name:"",
            addVal_age:"",
            addVal_sex:"boy",
            addVal_single:true,
            showAddVisible:true,
            modalType:1
        })

    },

    ajaxData:function(){
        var that = this;
        var data = {
            name:this.state.addVal_name,
            age:parseInt(this.state.addVal_age),
            sex:this.state.addVal_sex,
            single:this.state.addVal_single
        };
        that.setState({
            loading:true
        });

        if(this.state.modalType == 1)
        {
            request.post(ajaxData).send(data).end(function(err,res){
                if(err){
                    console.log(err);
                }
                else{

                    res.body.key = res.body.id;
                    that.state.items.unshift(res.body);
                    message.success("成功添加数据"+res.body.name);
                }

            })
        }
        else if(this.state.modalType == 2)
        {
            var id = this.state.selectedRowKeys[0];
            var ajaxUrl = ajaxData+id+'/';
            request.patch(ajaxUrl).send(data).end(function(err,res){
                if(err){console.log(err)}else{
                    let tmpArr = [];
                    for(let i=0;i<that.state.items.length;i++)
                    {
                        if(that.state.items[i].id == res.body.id ){
                            that.state.items[i].name = that.state.addVal_name;
                            that.state.items[i].age = that.state.addVal_age;
                            that.state.items[i].sex = that.state.addVal_sex;
                            that.state.items[i].single = that.state.addVal_single;
                        }
                        tmpArr.push(that.state.items[i]);
                    }
                    that.setState({
                        items:tmpArr
                    })
                }
            })
        }
        that.setState({
            loading:false,
            showAddVisible:false
        })

    },
    ////////////////////////////////////////////////////
    editEvent:function(){
        var id = this.state.selectedRowKeys[0];
        for(let i=0;i<this.state.items.length;i++)
        {
            if(this.state.items[i].id == id ){
                this.setState({
                    addVal_name:this.state.items[i].name,
                    addVal_age:this.state.items[i].age,
                    addVal_sex:this.state.items[i].sex,
                    addVal_single:this.state.items[i].single,
                    showAddVisible:true,
                    modalType:2
                })
            }

        }
    },
    ////////////////////////////////////////////////////
    deleteEvent:function(){
        var that= this;
        Modal.confirm({
            title:"删除学生信息",
            content:"你确定删除这条学生信息吗?",
            onOk:function(){
                if(that.state.selectedRowKeys.length>1)
                {
                    message.error("仅支持一条数据删除,暂不支持多条内容一起删除!!!",3);
                }
                else if(that.state.selectedRowKeys.length == 0){
                    message.error("全选择删除的内容!!!",3);
                }
                else{
                    var id = that.state.selectedRowKeys[0];
                    var ajaxUrl = ajaxData+id+'/';
                    request.delete(ajaxUrl).end(function(err,res){
                        if(err){
                           console.log(err);
                        }else{
                            var tmpItems = [];
                            for(let i=0;i<that.state.items.length;i++)
                            {
                                if(that.state.items[i].id == id ){
                                    continue;
                                }
                                else{
                                    tmpItems.push(that.state.items[i]);
                                }
                            }
                            that.setState({
                                items:tmpItems,
                                selectedRowKeys:[]
                            })
                        }
                    })
                }

            }
        })
    },
    ////////////////////////////////////////////////////
    onSelectChange(selectedRowKeys) {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys:selectedRowKeys });
    },
    ////////////////////////////////////////////////////
    modalOnChangeEvent:function(stateType,e){
        var obj = {}
        obj[stateType] = e.target.value;
        this.setState(obj);
    },


});

export default  AntAjax;
