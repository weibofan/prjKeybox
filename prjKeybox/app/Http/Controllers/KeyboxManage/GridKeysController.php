<?php

namespace App\Http\Controllers\KeyboxManage;

use App\Http\Controllers\Controller;
use App\Models\Hook;
use Illuminate\Http\Request;
use App\Http\Controllers\KeyboxManage\ModuleKeyboxManageController;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

class GridKeysController extends ModuleKeyboxManageController
{
    public function __construct()
    {
        parent::__construct(203,"查看钥匙箱对应的钥匙列表");
    }
    public function action(Request $req)
    {
        //根据传入的boxid找到hooks再找到keys
        $keys = Hook::with(['key'])->where('keyboxid',$req['keyboxid'])->get();
        $res = new Collection();
        $keys->each(function($key) use (&$res){
            // $res->push($key['key']);
            $arr = $key['key'];
            if($arr){$res->put($arr['id'],[
                'hook'=>Hook::find($arr['hookid'])['name'],
                'hookid'=>$arr['hookid'],
                'admin'=>User::find($arr['adminuid'])['realname'],
                'creator'=>User::find($arr['creatoruuid'])['realname'],
                'ctime'=>date('Y-m-d H:i:s',strtotime($arr['createtime'])),
                'mtime'=>date('Y-m-d H:i:s',strtotime($arr['modifytime'])),
                'modifier'=>User::find($arr['modifieruuid'])['realname'],
                'isenable'=>$arr['isenable']=='y',
                'state'=>$arr['state'],
                'remark'=>$arr['remark'],
                'name'=>$arr['name'],
                'user'=>User::find($arr['id'])==null?'':User::find($arr['uid'])['realname'],

            ]);
         }
        });
        $len = $res->count();
        if($len==0) return parent::respond_process(201,"该钥匙箱下没有钥匙!",'error',[],[]);
        else return parent::respond_process(200,'获取数据成功!','success',$res->values(),[]);
    }
}
