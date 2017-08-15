/**
 * Created by ww on 2017/1/2.
 */
import React from 'react'
import {Modal,Input} from 'antd'
var Action = React.createClass({
    render(){
        let {visible,type,oldVale,newVale,onChange,onCancel} = this.props;
        let onOk = this.getOk();
        let disable = (type=="delete" || type=="copy"|| type=="paste")?true:false;
        return(
            <div>
                <Modal
                    visible={visible}
                    title={this.getTypeStr()}
                    onCancel={onCancel}
                    onOk={()=>onOk()}
                    >
                    <Input disabled={disable} value={newVale} onChange={(e)=>onChange(e.target.value)}/>
                </Modal>
            </div>
        )
    },
    getOk(){
        let {type,onRename,onNewFilder,onDelete,onCopy,onPaste} = this.props;
        if(type =="newfolder"){
            return onNewFilder;
        }
        else if(type =="rename"){
            return onRename;
        }
        else if(type =="delete"){
            return onDelete;
        }
        else if(type =="copy"){
            return onCopy;
        }
        else if(type =="paste"){
            return onPaste;
        }
    },
    getTypeStr(){
        let {type} = this.props;
        let titStr ="";
        switch (type){
            case "newfolder":{
                titStr = "新建文件夹";
            }break;
            case "rename":{
                titStr = "重命名";
            }break;
            case "delete":{
                titStr = "删除";
            }break;
            case "copy":{
                titStr = "复制";
            }break;
            case "paste":{
                titStr = "粘贴";
            }break;

        }
        return titStr;
    }
})

export default  Action;