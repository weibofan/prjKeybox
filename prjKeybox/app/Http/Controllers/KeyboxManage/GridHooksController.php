<?php

namespace App\Http\Controllers\KeyboxManage;
use App\Http\Controllers\KeyboxManage\ModuleKeyboxManageController;
use App\Http\Controllers\Controller;
use App\Models\Hook;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Collection;

class GridHooksController extends ModuleKeyboxManageController
{
    public function __construct()
    {
        parent::__construct(202,"查看钥匙箱对应的挂钩列表");
    }
    private function common_validate(Request $req)
    {
        return false;
    }
    public function action(Request $req){
        //根据传入的boxid找到hooks
        $hooks = Hook::where('keyboxid',$req['keyboxid'])->select('*')->get();
        
        $res=$hooks->map(function ($hook) {
            $hook['ctime']=date('Y-m-d H:i:s',strtotime($hook['createtime']));
            $hook['mtime']=date('Y-m-d H:i:s',strtotime($hook['modifytime']));
            $hook['creator']=User::find($hook['creatoruuid'])['realname'];
            $hook['admin']=User::find($hook['adminuid'])['realname'];
            $hook['modifier']=User::find($hook['modifieruuid'])['realname'];
            return $hook;
        });
        $len = $hooks->count();
        if($len==0) return parent::respond_process(201,"该钥匙箱下没有挂钩",'error',[],[]);
        else return parent::respond_process(200,'获取数据成功!','success',$res,[]);
    }
}
