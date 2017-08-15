/**
 * Created by ww on 2016/12/31.
 */
import React from 'react'
import './index.css'
var Menu = React.createClass({
    render(){
        return(
            <ul className="rightkey-menu"
                style={{display:this.props.display ? 'block' : 'none',
                    left:this.props.x+'px',top:this.props.y+'px'}}
                //onClick={this.handleClick}
                >

                <li className="allow" onMouseDown={(e)=>this.onMouseDown(e,"newfolder")}>新建文件夹</li>
                <li className="allow" onMouseDown={(e)=>this.onMouseDown(e,"rename")}>重命名</li>
                <li className="allow" onMouseDown={(e)=>this.onMouseDown(e,"delete")}>删除</li>
                <li className="allow" onMouseDown={(e)=>this.onMouseDown(e,"copy")}>复制</li>
                <li className="allow" onMouseDown={(e)=>this.onMouseDown(e,"paste")}>粘贴</li>
            </ul>
        )
    },
    onMouseDown(e,type){

        const {onAciont} = this.props;
        e.preventDefault();
        e.stopPropagation();
        onAciont(type);
    }
})

export default Menu;