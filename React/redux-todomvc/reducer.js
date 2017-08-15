/**
 * Created by game on 2017/1/16.
 */
import {combineReducers} from 'redux'
const initState =   {
    //初始内容
    name:"todo-mvc",
    active:"all",
    items:[]
};

var todo = function(state=initState,action){
    switch(action.type){
         case "add":{
             let items = state.items;
             items.push({name:action.text,active:true});
             let obj = Object.assign({},state,{items:[...items]}) ;
             return obj;
         }break;
        case "delete":{
            let items = state.items;
            let newItem = [];
            for(let i=0;i<items.length;i++){
                if(items[i].name != action.text){
                    newItem.push(items[i]);
                }
            }
            let obj = Object.assign({},state,{items:[...newItem]}) ;
            return obj;
        }break;
        case 'active':{
            let obj = Object.assign({},state,{active:action.value });
            return obj;
        }break;
        case 'active-item':{
            let items = state.items;
            let newItem = [];
            for(let i=0;i<items.length;i++){
                if(items[i].name == action.text){
                    items[i].active = !items[i].active;
                }
                newItem.push(items[i]);
            }
            let obj = Object.assign({},state,{items:[...newItem]}) ;
            return obj;
        }break;
        case 'reset':{
            var items = action.items;
            let obj = Object.assign({},state,{items:[...items]}) ;
            return obj;
        }break;
    }
    return state;
}
var fs =  function(state,action){
    console.log(action);
    switch(action.type){

    }
    return{
        name:"fs",
        items:[{name:'a1',folder:false,ext:'.txt'},{name:'b1',folder:true,ext:'.txt'}]
    }
}
//把 Reducers结合
var reduer = combineReducers({
    todo,
    //fs
});


export default  reduer;