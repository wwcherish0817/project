/**
 * Created by game on 2017/1/16.
 */
import ReduxToDoMvc from './todo-view.js'
import {connect} from 'react-redux'

//把数据作为属性传给组件
var fun1 = function(store){

    return{
        items:store.todo.items,
        name:store.todo.name,
        active:store.todo.active
    }
}

import  {tools_add,tools_delete,tools_get}   from './action.js'
import {bindActionCreators} from 'redux'

//把dispath作为属性传给组件
var fun2 = function(dispatch){
    return{
        dispatch:dispatch,
        add:(val)=>dispatch(tools_add(val)),
        deletefun:(val)=>dispatch(tools_delete(val)),
        getData:bindActionCreators(tools_get,dispatch) //bindActionCreators --> 把dispatch 传给 get作为参数

    }
}
//连接器 把view 和 数据结合在一起
export default connect(fun1,fun2)(ReduxToDoMvc);