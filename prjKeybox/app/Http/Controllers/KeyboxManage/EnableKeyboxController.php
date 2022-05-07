<?php

namespace App\Http\Controllers\KeyboxManage;
use App\Http\Controllers\KeyboxManage\ModuleKeyboxManageController;
use App\Http\Controllers\Controller;
use App\Models\Keybox;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
class EnableKeyboxController extends ModuleKeyboxManageController
{
    public function __construct()
    {
        parent::__construct(221,"启用/禁用钥匙箱");
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
            return false;
        }
    }
    public function action(Request $req)
    {
        $res = $this->can($req);
        if($res) return $res;
        $keybox=Keybox::find($req['keyboxid']);
        $keybox->isenable=$keybox->isenable=='y'?'n':'y';
        $keybox->modifieruuid=Auth::id();
        $suc=$keybox->save();
        if($keybox->isenable=='y') return parent::respond_process(200,'启用成功!','success',[],[]);
        else return parent::respond_process(200,'禁用成功!','success',[],[]);
    }
    
}
