<?php

namespace App\Http\Controllers\KeyboxManage;
use App\Http\Controllers\KeyboxManage\ModuleKeyboxManageController;
use App\Http\Controllers\Controller;
use App\Models\Group;
use App\Models\Keybox;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
class ConserveKeyboxController extends ModuleKeyboxManageController
{
    public function __construct()
    {
        parent::__construct(222,"维护钥匙箱-修改钥匙箱信息");
    }
    public function can(Request $req)
    {
        //必须是钥匙箱管理员才可以
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
        // dd($req);
        $keybox=Keybox::find($req['keyboxid']);
        $keybox->shape=$req->shape;
        $keybox->state=$req->state;
        $keybox->groupid=$req->groupid;
        $keybox->remark=$req->remark;
        $keybox->modifieruuid=Auth::id();
        $suc=$keybox->save();
        return parent::respond_process(200,'维护钥匙箱信息成功!','success',[],[]);
    }
    public function form(Request $req)
    {
        //加载可借人群体
        $groups=Group::where('category','keybox_general_borrowable')->select(['id','name as value'])->get();
        return $groups;
    }
}
