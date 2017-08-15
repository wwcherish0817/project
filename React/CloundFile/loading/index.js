/**
 * Created by ww on 2016/12/28.
 */
import React from 'react'
import {Icon} from 'antd'
import './index.css'
var Loading = React.createClass({
    render(){
        return(
            <div className="loadingDiv">
                <div>
                    <Icon className="loadingDiv_icon" type="loading"/>
                </div>
                <p>
                    正在加载中...
                </p>
            </div>
        )
    }
})

export default  Loading;