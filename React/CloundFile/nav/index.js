/**
 * Created by ww on 2016/12/31.
 */
import React from 'react'
import { Breadcrumb,Icon } from 'antd';
import  './index.css'
import {Link} from 'react-router'
var Nav = React.createClass({
    render(){
        const {value} = this.props;
        var to="";
        const nodes = value.map(function(o,i){
            to = to+"/"+o;
            return(
                <Breadcrumb.Item key={i}>
                    <Link to={to}><span>{o}</span></Link>
                </Breadcrumb.Item>
            )
        });
        return(
            <div className="navDiv">

                <Breadcrumb>
                    <Breadcrumb.Item href="/">
                        <Icon type="home"/>
                    </Breadcrumb.Item>
                    {nodes}
                </Breadcrumb>
            </div>
        )
    }
})

export default Nav;