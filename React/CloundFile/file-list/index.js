
import React from 'react';
import {Icon,
    Input} from 'antd'
import './index.css'
import Loading from '../loading/index.js'
import {hashHistory} from 'react-router'

const host = 'http://101.200.129.112:9527/static/'

function getIcon(ext,isFolder){
    if(isFolder){
        return "folder";
    }
    switch (ext){
        case ".html":
            return "file-text";
        break;
        case ".css": case ".js":
            return "code";
        break;
        case ".jpg": case ".png": case ".gif":
            return "picture";
            break;
    }

    return 'credit-card'
}

var FileItem = React.createClass({
    render(){
        let  {name,onChange,path,ext,isFolder,onReName,active,onPick} = this.props;
        let type=getIcon(ext,isFolder)

        const act= (name == active.name);
        return(
            <li className={act ? "file-item active":"file-item"}  >
                <span className="file-item-icon"
                      onClick={(e)=>this.liClickEvent()}
                      onMouseDown={this.mouseDown}
                    >
                    <Icon type={type} />
                </span>
                <span  className="file-item-name">{name}</span>
            </li>
        )
    },
    clickEvent:function(e){
       console.log(e);
    },
    liClickEvent(){
        let  {name,onChange,path,ext,isFolder,onPick} = this.props;

        if(isFolder){
            hashHistory.push(path);
        }
        else{
            window.open(host+path);
        }
    },
    mouseDown(e){
        let  {name,onPick} = this.props;
        if(e.button == 2)
        {
            onPick(name);
        }
    }
})

var FileList = React.createClass({
        render(){
            const {path,file,onChange,loading,onReName,active,onPick} = this.props;
            var node = file.map(function(obj,i){
                return(
                      <FileItem
                          name={obj.name}
                          path={obj.path}
                          key={path+"-"+obj.name}
                          ext={obj.ext}
                          isFolder={obj.isFolder}
                          onChange={onChange}

                          onReName={onReName}
                          active={active}
                          onPick={onPick}
                          />

                )
            });

            return(
                <div className="file-content">
                    <ul className="file-list" style={{display:loading?"none":"block"}}>
                        {node}
                    </ul>
                    <div style={{display:loading?"block":"none"}}>
                        <Loading/>
                    </div>

                </div>
            )

        }
})
export default FileList;