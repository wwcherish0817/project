/**
 * Created by game on 2017/1/18.
 */
import request from 'superagent'
export function tools_active(txt){
    return{
        type:"active",
        value:txt
    }
}
export function tools_activeItem(txt){
    return{
        type:"active-item",
        text:txt
    }
}
export function tools_delete(val){
    return{
        type:"delete",
        text:val
    }
}
export function tools_add(val){
   return {
       type:"add",
       text:val
   }
}

export function tools_reset(items){

    return {
        type:'reset',
        items:items
    }

}
export function tools_get(query){
    return function (dispatch) {

        request
            .get('http://101.200.129.112:9527/react1/student/')
            .end(function (err, res) {
                dispatch(tools_reset(res.body));
            })
    }
}

export function tools_login(query){
    return function(dispatch){
        console.log(query)
        request
            .get('http://101.200.129.112:9527/deploy/login/')
            .end(function (err, res) {
                console.log(res.body)
                //dispatch(reset(res.body))
            })
    }
}