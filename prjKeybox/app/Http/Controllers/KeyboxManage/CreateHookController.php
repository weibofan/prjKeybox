<?php

namespace App\Http\Controllers\KeyboxManage;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\KeyboxManage\ModuleKeyboxManageController;
use App\Models\Groupuser;
use App\Models\Hook;
use App\Models\Keybox;
use App\Models\Organization;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
class CreateHookController extends ModuleKeyboxManageController
{
    public function __construct()
    {
        parent::__construct(214,"添加修改删除挂钩");
    }
    private function common_validate(Request $req)
    {
        return false;
    }
    private function action_validate(Request $req)
    {
        $res = $this->common_validate($req);
        if($res) return $res;
        //参数处理
        return false;
    }
    public function can(Request $req)
    {
        $uid=Auth::id();
        $keyboxid=$req['keyboxid'];
        $flag = Keybox::find($keyboxid)['adminuid'] == $uid;
        if($flag===false){
            return parent::respond_process(61,'您不是该钥匙箱的管理员，无法执行此操作','error',[],[]);
        }
        else{
            return parent::respond_process(200,'权限验证成功','success',[],[]);
        }
    }
    public function action(Request $req)
    {
        $hook= new Hook();
        $hook->keyboxid=$req->keyboxid;
        $hook->name=$req->name;
        $hook->x=$req->x;
        $hook->y=$req->y;
        $hook->state='unused';
        $admin=$req->admin;
        $adminuid=User::where('realname',$admin)->get();
        if($adminuid->count()==0) return parent::respond_process(60,'您填的管理员无效！','error',[],[]);
        $hook->adminuid=$adminuid[0]['id'];
        $hook->remark=$req->remark;
        $hook->creatoruuid=Auth::id();
        $hook->modifieruuid=Auth::id();
        $suc = $hook->save();
        return parent::respond_process(200,'添加挂钩成功!','success',[],[]);
    }
    public function modify(Request $req)
    {
        $hook=Hook::find($req['hookid']);
        // dd($req);
        $hook->name=$req->name;
        $hook->x=$req->x;
        $hook->y=$req->y;
        $admin=$req->admin;
        $adminuid=User::where('realname',$admin)->get();
        if($adminuid->count()==0) return parent::respond_process(60,'您填的管理员无效！','error',[],[]);
        $hook->adminuid=$adminuid[0]['id'];
        $hook->remark=$req->remark;
        $hook->modifieruuid=Auth::id();
        $suc = $hook->save();
        return parent::respond_process(200,'修改挂钩成功!','success',[],[]);
    }
    public function delete(Request $req)
    {
        $hook=Hook::find($req['hookid']);
        $flag = $hook['state']=='unused';//改->挂钩下是否有钥匙
        if($flag!==true){
            return parent::respond_process(62,'该挂钩已经使用！','error',[],[]);
        }
        else{
            $hook->delete();
            return parent::respond_process(200,'删除挂钩成功!','success',[],[]);
        }
    }
}
