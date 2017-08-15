
import request from 'superagent'

const host = 'http://101.200.129.112:9527/';
const GET_FILE = host + 'file/get/';
const RENAME_FILE = host + 'file/rename/';
const NEW_FOLDER = host + 'file/mkdir/';
const REMOVE_FOLDER =  host + 'file/remove/';


export function getFileList(paty,res_cb,err_cb){
    request.get(GET_FILE).query({path:paty}).end(function(err,res){
        if(err){
             err_cb(err);
        }
        else
        {
             res_cb(res);
        }
    })

}

export function api_reanme(query,res_cb,err_cb){
    request.get(RENAME_FILE).query(query).end(function(err,res){
        if(err){
            err_cb(err);
        }
        else
        {
            res_cb(res);
        }
    });

}

export function api_newFolder(query,res_cb,err_cb){
    request.get(NEW_FOLDER).query(query).end(function(err,res){
        if(err){
            err_cb(err);
        }
        else
        {
            res_cb(res);
        }
    });

}
export function api_remove(query,res_cb,err_cb){
    request.get(REMOVE_FOLDER).query(query).end(function(err,res){
        if(err){
            err_cb(err);
        }
        else
        {
            res_cb(res);
        }
    });

}