/**
 * Created by game on 2016/12/14.
 */
import React from 'react';
import MyTable from './table/CustomTable.js'

const hand=["name","age","sex"];
const data=[
    {name:"a1",age:10,sex:1},
    {name:"a2",age:11,sex:2},
    {name:"a3",age:12,sex:1},
    {name:"a4",age:13,sex:2},
    {name:"a5",age:14,sex:1},
    {name:"a6",age:15,sex:2},
    {name:"a7",age:16,sex:1},
    {name:"a8",age:17,sex:2},
    {name:"a9",age:18,sex:1},
    {name:"a10",age:19,sex:2},
    {name:"a11",age:20,sex:1},
    {name:"a12",age:21,sex:2},
];


var CustomTable = React.createClass({
    render:function(){
        return(
            <MyTable hand={hand} data={data}></MyTable>
        )
    }
})
export default  CustomTable;