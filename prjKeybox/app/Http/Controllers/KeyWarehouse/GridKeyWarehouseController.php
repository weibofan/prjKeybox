<?php

namespace App\Http\Controllers\KeyWarehouse;

use App\Http\Controllers\KeyWarehouse\ModuleKeyWarehouseController;
use Illuminate\Http\Request;
use App\Models\Group;
use App\Models\Groupuser;
use App\Models\Hook;
use App\Models\Key;
use App\Models\Keybox as ModelsKeybox;
use App\Models\Organization;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;

class GridKeyWarehouseController extends ModuleKeyWarehouseController
{
    public function __construct()
    {
        parent::__construct(402,"查看钥匙列表");
    }
    public function action(Request $req)
    {
        //orgid
        $uid=Auth::id();
        //钥匙助手:加载orgid下所有钥匙  钥匙管理员:加载orgid下adminuid
        //判断是否为某部门钥匙助手
        $group=Group::where('category','keybox_general_key')->where('orgid',$req['orgid'])->get();
        $groupid=$group[0]['id'];
        $flag=Groupuser::where('uid',$uid)->where('groupid',$groupid)->count();
        if($flag===1){
            //加载部门下所有钥匙
            $keys=Key::where('orgid',$req['orgid'])->get()
            ->map(function($key){
                $key['isenable']=$key['isenable']=='y';
                if($key['hookid']) $key['hook']=Hook::find($key['hookid'])['name'];
                $key['admin']=User::find($key['adminuid'])['realname'];
                if($key['uid']) $key['user']=User::find($key['uid'])['realname'];
                $key['creator']=User::find($key['creatoruuid'])['realname'];
                $key['modifier']=User::find($key['modifieruuid'])['realname'];
                $key['ctime']=date('Y-m-d H:i:s',strtotime($key['createtime']));
                $key['mtime']=date('Y-m-d H:i:s',strtotime($key['modifytime']));

                return $key;
            });
            $len=$keys->count();
            //dd($keys);
            if($len==0) return parent::respond_process(201,"该部门下没有钥匙!",'error',[],[]);
            else {
                return parent::respond_process(200,'获取数据成功!','success',$keys,[]);
            }
        }
        else{
            //加载管理的钥匙
            $keys=Key::where('orgid',$req['orgid'])->where('adminuid',$uid)->get()
            ->map(function($key){
                $key['isenable']=$key['isenable']=='y';
                if($key['hookid']) $key['hook']=Hook::find($key['hookid'])['name'];
                $key['admin']=User::find($key['adminuid'])['realname'];
                if($key['uid']) $key['user']=User::find($key['uid'])['realname'];
                $key['creator']=User::find($key['creatoruuid'])['realname'];
                $key['modifier']=User::find($key['modifieruuid'])['realname'];
                $key['ctime']=date('Y-m-d H:i:s',strtotime($key['createtime']));
                $key['mtime']=date('Y-m-d H:i:s',strtotime($key['modifytime']));

                return $key;
            });
            $len=$keys->count();
            if($len==0) return parent::respond_process(201,"该部门下没有你管理的钥匙!",'error',[],[]);
            else return parent::respond_process(200,'获取数据成功!','success',$keys,[]);
        }
    }
}
