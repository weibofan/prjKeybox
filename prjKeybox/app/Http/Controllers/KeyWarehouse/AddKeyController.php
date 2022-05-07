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

class AddKeyController extends ModuleKeyWarehouseController
{
    public function __construct()
    {
        parent::__construct(411,"增加删除修改钥匙");
    }
    public function can(Request $req)
    {
        //必须是钥匙助手
        $uid=Auth::id();
        $group=Group::where('category','keybox_general_key')->where('orgid',$req['orgid'])->get();
        $groupid=$group[0]['id'];
        $flag=Groupuser::where('uid',$uid)->where('groupid',$groupid)->count();
        if($flag===1){
            return parent::respond_process(200,"权限验证成功!",'success',[],[]);
        }
        else{
            return parent::respond_process(63,"您不是钥匙助手，无法执行此操作",'error',[],[]);
        }
    }
    public function action(Request $req)
    {
        $key=new Key();
        $key->name=$req->name;
        $admin=$req->admin;
        $adminuid=User::where('realname',$admin)->get();
        if($adminuid->count()==0) return parent::respond_process(60,'您填的管理员无效！','error',[],[]);
        $key->adminuid=$adminuid[0]['id'];
        $key->remark=$req->remark;
        $key->state='instock';
        $key->isenable='n';
        $key->creatoruuid=Auth::id();
        $key->modifieruuid=Auth::id();
        $key->orgid=$req['orgid'];
        $suc = $key->save();
        return parent::respond_process(200,'添加钥匙成功!','success',[],[]);
    }
    public function modify(Request $req)
    {
        $key=Key::find($req['keyid']);
        $key->name=$req->name;
        $admin=$req->admin;
        $adminuid=User::where('realname',$admin)->get();
        if($adminuid->count()==0) return parent::respond_process(60,'您填的管理员无效！','error',[],[]);
        $key->adminuid=$adminuid[0]['id'];
        $key->remark=$req->remark;
        $key->modifieruuid=Auth::id();
        $suc = $key->save();
        return parent::respond_process(200,'修改钥匙成功!','success',[],[]);
    }
    public function delete(Request $req)
    {
        $key=Key::find($req['keyid']);
        $flag=$key['isenable']=='y';
        if($flag===true){
            return parent::respond_process(64,"该钥匙已经启用，请让钥匙管理员禁用后再删除!","error",[],[]);
        }
        else{
            $key->delete();
            return parent::respond_process(200,"删除钥匙成功",'success',[],[]);
        }
    }
}
