import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import CustomButton from './Custom-Button/index.js'
import CustomTable from './Custom-Table'
import CustomFromItem from './Custom-FormItem/index.js'

ReactDOM.render(
    <div>
      <CustomButton/>
      <CustomTable/>
      <CustomFromItem/>

    </div>,


  document.getElementById('root')
);
