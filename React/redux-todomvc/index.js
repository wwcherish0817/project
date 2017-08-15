import React, { Component } from 'react';
import {Provider,connect} from 'react-redux'
import {createStore,compose,applyMiddleware} from 'redux'
import  reduer from './reducer.js'
import LinkContainer from './todo-linkcontianer.js'

import thunk from 'redux-thunk'

//根据 reduer 创建全局的store
var store = createStore(reduer,compose(
    applyMiddleware(thunk) //判断是不是一个fun

));

var App =React.createClass({
    render(){
        return(
            <Provider store={store}>
                <LinkContainer/>
            </Provider>
        )
    }
})

export default   App;