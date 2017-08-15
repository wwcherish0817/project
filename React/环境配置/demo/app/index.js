/*
var indexless = require("./index.less");
var component = require("./component");
document.body.appendChild(component());
*/

/*
import './index.less';
import component from './component';
document.body.appendChild(component());
*/

import React from 'react';
import ReactDOM from 'react-dom';
 
class HelloReact extends React.Component {
  render() {
    return <h1>Hello React!</h1>
  }
}
 
ReactDOM.render(<HelloReact/>, document.body);