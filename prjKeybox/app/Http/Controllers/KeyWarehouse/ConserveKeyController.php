<?php

namespace App\Http\Controllers\KeyWarehouse;

use App\Http\Controllers\KeyboxManage\GridKeyboxesController;
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

class ConserveKeyController extends ModuleKeyWarehouseController
{
    public function __construct()
    {
        parent::__construct(422,"匹配挂钩-修改钥匙部分信息");
    }
    public function form(Request $req)
    {
        //加载这个系下unused状态的hook
        $hooks=ModelsKeybox::from('keyboxes as k')
        ->leftJoin('hooks as h','k.id','=','h.keyboxid')
        ->where('h.state','=','unused')
        ->where('k.orgid','=',$req['orgid'])
        ->select([
            'h.id as id',
            'h.name as value'
        ])
        ->get();
        return $hooks;
    }
    public function can(Request $req)
    {
        //必须是钥匙管理员
        $flag=Auth::id()==$req['adminuid'];
        if($flag===true){
            //必须是instock的钥匙才可以匹配
            $isinstock=Key::find($req['keyid'])['state']=='instock'?true:false;
            if($isinstock===true)
                return parent::respond_process(200,"权限验证成功!",'success',[],[]);
            else return parent::respond_process(65,"已匹配的钥匙不能执行此操作!",'error',[],[]);
        }
        else{
            return parent::respond_process(64,"您不是该钥匙管理员，无法执行此操作",'error',[],[]);
        }
    }
    public function action(Request $req)
    {
        // dd($req);
        $key=Key::find($req['keyid']);
        $key->hookid=$req['hook'];
        $key->remark=$req->remark;
        $key->modifieruuid=Auth::id();
        $suc=$key->save();
        return parent::respond_process(200,'匹配挂钩完成，等待挂钩管理员确认!','success','[],[]');
    }
    
}
