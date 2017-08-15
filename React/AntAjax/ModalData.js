/**
 * Created by ww on 2016/12/25.
 */
import React from 'react';
import { Table,Button,Modal,Form,Input,Radio,message } from 'antd';
import 'antd/dist/antd.css'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

var ModalData = React.createClass({
    render:function(){
        const {visible,
            showType,
            onCancel,
            onOk,
            onChangeNameVal,
            onChangeAgeVal,
            onChangeSexVal,
            onChangeSignleVal,
            onChangeEvent} = this.props;
        var titStr ="";
        if(showType == 1){
            titStr ="增加数据"
        }
        else if(showType == 2){
            titStr ="编辑数据"
        }
        return(
            <Modal
                visible={visible}
                title={titStr}
                onCancel={onCancel}
                onOk={onOk}
                >
                <Form>
                    <FormItem
                        label="name"
                        labelCol={{span: 6}}
                        wrapperCol={{span: 14}}
                        >
                        <Input value={onChangeNameVal} onChange={(e)=>onChangeEvent("addVal_name",e)}/>
                    </FormItem>
                    <FormItem
                        label="age"
                        labelCol={{span: 6}}
                        wrapperCol={{span: 14}}
                        >
                        <Input value={onChangeAgeVal} onChange={(e)=>onChangeEvent("addVal_age",e)}/>
                    </FormItem>
                    <FormItem
                        label="sex"
                        labelCol={{span: 6}}
                        wrapperCol={{span: 14}}
                        >
                        <RadioGroup onChange={(e)=>onChangeEvent("addVal_sex",e) } value={onChangeSexVal}>
                            <Radio value={"boy"}>boy</Radio>
                            <Radio value={"girl"}>girl</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem
                        label="是否单身"
                        labelCol={{span: 6}}
                        wrapperCol={{span: 14}}
                        >
                        <RadioGroup onChange={(e)=>onChangeEvent("addVal_single",e) } value={onChangeSignleVal}>
                            <Radio value={true}>单</Radio>
                            <Radio value={false}>不单</Radio>
                        </RadioGroup>
                    </FormItem>
                </Form>
            </Modal>
        )
    }

})

export default ModalData;