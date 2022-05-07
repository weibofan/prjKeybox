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

class EnableKeyController extends ModuleKeyWarehouseController
{
    public function __construct()
    {
        parent::__construct(421,"启用/禁用钥匙");
    }
    public function can(Request $req)
    {
        //必须是钥匙管理员
        $flag=Auth::id()==$req['adminuid'];
        if($flag===true){
            return false;
        }
        else{
            return parent::respond_process(64,"您不是该钥匙管理员，无法执行此操作",'error',[],[]);
        }
    }
    public function action(Request $req)
    {
        $res = $this->can($req);
        if($res) return $res;
        $key=Key::find($req['keyid']);
        if($key->state=='instock') return parent::respond_process(65,"该钥匙还未出库，不能执行此操作","error",[],[]);
        $key->isenable=$key->isenable=='y'?'n':'y';
        $key->modifieruuid=Auth::id();
        $suc=$key->save();
        if($key->isenable=='y') return parent::respond_process(200,'启用成功!','success',[],[]);
        else return parent::respond_process(200,'禁用成功!','success',[],[]);
    }
}
